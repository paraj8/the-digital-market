const express = require("express");
const router = express.Router();

const authController = require("./auth_controller");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);


router.post(
  "/forgot-password",
  authController.forgotPassword
);
router.post(
  "/verify-forgot-password-otp",
  authController.verifyForgotPasswordOTP
);
router.post(
  "/reset-password",
  authController.resetPassword
);

module.exports = router;