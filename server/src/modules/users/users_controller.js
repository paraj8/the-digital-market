const usersService = require("./users_service");

const respondWithError = (res, error) => {
  const statusCode = error.statusCode || (error.code === 11000 ? 409 : 500);
  const message = error.statusCode
    ? error.message
    : error.code === 11000
      ? "A unique account value is already in use"
      : "Account request failed";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

const handle = (operation) => async (req, res) => {
  try {
    await operation(req, res);
  } catch (error) {
    respondWithError(res, error);
  }
};

const getCurrentUser = handle(async (req, res) => {
  res.status(200).json({
    success: true,
    data: usersService.getCurrentUser(req.user),
  });
});

const updateProfile = handle(async (req, res) => {
  const user = await usersService.updateProfile(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, data: user });
});

const changePassword = handle(async (req, res) => {
  const result = await usersService.changePassword(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, ...result });
});

const updatePhone = handle(async (req, res) => {
  const user = await usersService.updatePhone(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, data: user });
});

const sendPhoneOtp = handle(async (req, res) => {
  const result = await usersService.sendPhoneOtp(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, ...result });
});

const verifyPhoneOtp = handle(async (req, res) => {
  const user = await usersService.verifyPhoneOtp(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, data: user });
});

const sendEmailChangeOtp = handle(async (req, res) => {
  const result = await usersService.sendEmailChangeOtp(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, ...result });
});

const verifyEmailChangeOtp = handle(async (req, res) => {
  const user = await usersService.verifyEmailChangeOtp(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, data: user });
});

const deleteAccount = handle(async (req, res) => {
  const result = await usersService.deleteAccount(
    req.user.id,
    req.validatedBody
  );
  res.status(200).json({ success: true, ...result });
});

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
