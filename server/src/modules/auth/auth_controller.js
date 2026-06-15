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

module.exports = {
  register,
  verifyOTP,
};