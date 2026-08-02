const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../users/users_model");
const Otp = require("./otp_model");
const sendEmail = require("../../services/email_service");
const generateOTP = require("../../utils/generateOTP");

// Register User
const registerUser = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }
console.log("Request Body:",{
  fullName,
  email,
  password,
});
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const otp = generateOTP();

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });

  // Send verification email
  await sendEmail({
    to: email,
    subject: "Verify Your Account",
    html: `
      <h2>The Digital Market</h2>
      <p>Your verification OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  };
};

// Verify OTP
const verifyOTP = async ({ email, otp }) => {
  const otpDoc = await Otp.findOne({
    email,
    otp,
  });

  if (!otpDoc) {
    throw new Error("Invalid OTP");
  }

  if (otpDoc.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  user.isVerified = true;

  await user.save();

  await Otp.deleteMany({ email });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  };
};

// Login User
const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new Error(
      "Please verify your account first"
    );
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};


// Forgot Password
const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = generateOTP();

  // Remove any previous OTP for this email
  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(
      Date.now() + 10 * 60 * 1000
    ),
  });

  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>The Digital Market</h2>
      <p>Your password reset OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
    `,
  });

  return {
    message: "OTP sent successfully",
  };
};


// Verify Forgot Password OTP
const verifyForgotPasswordOTP = async ({
  email,
  otp,
}) => {
  const otpDoc = await Otp.findOne({
    email,
    otp,
  });

  if (!otpDoc) {
    throw new Error("Invalid OTP");
  }

  if (otpDoc.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  return {
    message: "OTP verified successfully",
  };
};


// Reset Password
const resetPassword = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  user.password = hashedPassword;

  await user.save();

  // Delete OTP after successful password reset
  await Otp.deleteMany({ email });

  return {
    message: "Password reset successfully",
  };
};

module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
};