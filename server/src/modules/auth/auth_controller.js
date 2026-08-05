const authService = require("./auth_service");

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller functions
const verifyOTP = async (req, res) => {
  try {
    const user = await authService.verifyOTP(
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller

const login = async (req, res) => {
  try {
    const result =
      await authService.loginUser(
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const result =
      await authService.forgotPassword(
        req.body
      );
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyForgotPasswordOTP = async (
  req,
  res
) => {
  try {
    const result =
      await authService.verifyForgotPasswordOTP(
        req.body
      );
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const resetPassword = async (
  req,
  res
) => {
  try {
    const result =
      await authService.resetPassword(
        req.body
      );
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  verifyOTP,
  login,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword,
};