const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("./users_model");
const AccountOtp = require("./account_otp_model");
const AuthOtp = require("../auth/otp_model");
const Address = require("../address/address_model");
const Cart = require("../carts/cart_model");
const Wishlist = require("../wishlist/wishlist_model");
const Order = require("../orders/order_model");
const ProductPresence = require("../analytics/product_presence_model");
const sendEmail = require("../../services/email_service");
const generateOTP = require("../../utils/generateOTP");

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const hashAccountOtp = (otp) => {
  const secret = process.env.OTP_HASH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw createError("OTP hashing is not configured", 503);
  }

  return crypto
    .createHmac("sha256", secret)
    .update(`tdm-account-otp:v1:${otp}`)
    .digest("hex");
};

const toSafeUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
  phone: user.phone || "",
  emailVerified: Boolean(user.isVerified),
  phoneVerified: Boolean(user.phoneVerified),
  accountStatus: user.deletedAt
    ? "deleted"
    : user.isBlocked
      ? "blocked"
      : "active",
});

const getCurrentUser = (user) => toSafeUser(user);

const updateProfile = async (userId, { fullName }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  user.fullName = fullName;
  await user.save();
  return toSafeUser(user);
};

const changePassword = async (
  userId,
  { currentPassword, newPassword }
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw createError("Current password is incorrect", 400);
  }

  if (await bcrypt.compare(newPassword, user.password)) {
    throw createError("New password must be different from the current password", 400);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully" };
};

const updatePhone = async (userId, { phone, currentPassword }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw createError("Current password is incorrect", 400);
  }

  const existingUser = await User.findOne({
    phone,
    _id: { $ne: userId },
  }).select("_id");
  if (existingUser) {
    throw createError("Phone number is already in use", 409);
  }

  user.phone = phone;
  user.phoneVerified = false;
  await user.save();
  return toSafeUser(user);
};

const saveAccountOtp = async ({ userId, purpose, target, otp }) => {
  let record = await AccountOtp.findOne({
    user: userId,
    purpose,
  }).select("+otpHash");

  if (
    record &&
    Date.now() - new Date(record.updatedAt).getTime() < OTP_COOLDOWN_MS
  ) {
    throw createError("Please wait before requesting another verification code", 429);
  }

  const otpHash = hashAccountOtp(otp);
  if (!record) {
    record = new AccountOtp({
      user: userId,
      purpose,
      target,
      otpHash,
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
      attempts: 0,
    });
  } else {
    record.target = target;
    record.otpHash = otpHash;
    record.expiresAt = new Date(Date.now() + OTP_TTL_MS);
    record.attempts = 0;
  }

  await record.save();
  return record;
};

const verifyAccountOtp = async ({ userId, purpose, target, otp }) => {
  const record = await AccountOtp.findOne({
    user: userId,
    purpose,
    target,
  }).select("+otpHash");

  if (!record) {
    throw createError("Invalid or expired verification code", 400);
  }

  if (record.expiresAt <= new Date()) {
    await AccountOtp.deleteOne({ _id: record._id });
    throw createError("Verification code expired", 400);
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    await AccountOtp.deleteOne({ _id: record._id });
    throw createError("Too many invalid attempts. Request a new code", 429);
  }

  const submittedHash = Buffer.from(hashAccountOtp(otp), "hex");
  const storedHash = Buffer.from(record.otpHash, "hex");
  const otpMatches =
    submittedHash.length === storedHash.length &&
    crypto.timingSafeEqual(submittedHash, storedHash);

  if (!otpMatches) {
    record.attempts += 1;
    if (record.attempts >= OTP_MAX_ATTEMPTS) {
      await AccountOtp.deleteOne({ _id: record._id });
      throw createError("Too many invalid attempts. Request a new code", 429);
    }
    await record.save();
    throw createError("Invalid verification code", 400);
  }

  return record;
};

const sendEmailChangeOtp = async (
  userId,
  { newEmail, currentPassword }
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw createError("Current password is incorrect", 400);
  }

  if (newEmail === user.email) {
    throw createError("New email must be different from the current email", 400);
  }

  const existingUser = await User.findOne({ email: newEmail }).select("_id");
  if (existingUser) {
    throw createError("Email address is already in use", 409);
  }

  const otp = generateOTP();
  const record = await saveAccountOtp({
    userId,
    purpose: "email-change",
    target: newEmail,
    otp,
  });

  try {
    await sendEmail({
      to: newEmail,
      subject: "Verify your new email address",
      html: `
        <h2>The Digital Market</h2>
        <p>Your email-change verification code is:</p>
        <h1>${otp}</h1>
        <p>Valid for 10 minutes. If you did not request this change, ignore this email.</p>
      `,
    });
  } catch {
    await AccountOtp.deleteOne({ _id: record._id });
    throw createError("Unable to send verification email. Please try again", 502);
  }

  return { message: "Verification code sent successfully" };
};

const verifyEmailChangeOtp = async (userId, { newEmail, otp }) => {
  const record = await verifyAccountOtp({
    userId,
    purpose: "email-change",
    target: newEmail,
    otp,
  });

  const existingUser = await User.findOne({
    email: newEmail,
    _id: { $ne: userId },
  }).select("_id");
  if (existingUser) {
    await AccountOtp.deleteOne({ _id: record._id });
    throw createError("Email address is already in use", 409);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  user.email = newEmail;
  user.isVerified = true;
  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      await AccountOtp.deleteOne({ _id: record._id });
      throw createError("Email address is already in use", 409);
    }
    throw error;
  }

  await AccountOtp.deleteOne({ _id: record._id });
  return toSafeUser(user);
};

const sendPhoneOtp = async (userId, { phone }) => {
  const existingUser = await User.findOne({
    phone,
    phoneVerified: true,
    _id: { $ne: userId },
  }).select("_id");

  if (existingUser) {
    throw createError("Phone number is already in use", 409);
  }

  throw createError(
    "Phone verification is unavailable because no SMS provider is configured",
    503
  );
};

const verifyPhoneOtp = async () => {
  throw createError(
    "Phone verification is unavailable because no SMS provider is configured",
    503
  );
};

const deleteAccount = async (
  userId,
  { currentPassword }
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw createError("Current password is incorrect", 400);
  }

  const orderAddressIds = await Order.distinct("shippingAddress", {
    user: userId,
    shippingAddress: { $ne: null },
  });

  // Preserve orders and their addresses for fulfillment and accounting history.
  await Promise.all([
    Cart.deleteMany({ user: userId }),
    Wishlist.deleteMany({ user: userId }),
    ProductPresence.deleteMany({ user: userId }),
    Address.deleteMany({
      user: userId,
      _id: { $nin: orderAddressIds },
    }),
    AccountOtp.deleteMany({ user: userId }),
    AuthOtp.deleteMany({ email: user.email }),
  ]);

  user.fullName = "Deleted account";
  user.email = `deleted+${user._id}@deleted.invalid`;
  user.phone = "";
  user.phoneVerified = false;
  user.password = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10);
  user.profileImage = "";
  user.isVerified = false;
  user.isBlocked = true;
  user.deletedAt = new Date();
  await user.save();

  return {
    message: "Account deactivated and profile fields anonymized. Order records and linked shipping addresses are retained for fulfillment and accounting.",
  };
};

module.exports = {
  getCurrentUser,
  updateProfile,
  changePassword,
  updatePhone,
  sendPhoneOtp,
  verifyPhoneOtp,
  sendEmailChangeOtp,
  verifyEmailChangeOtp,
  deleteAccount,
};
