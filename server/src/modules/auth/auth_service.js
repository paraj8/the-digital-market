const bcrypt = require("bcryptjs");
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
    user,
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

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  user.isVerified = true;

  await user.save();

  // Delete all OTPs for this email
  await Otp.deleteMany({ email });

  return user;
};

module.exports = {
  registerUser,
  verifyOTP,
};