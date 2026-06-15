const express = require("express");
const router = express.Router();

const authController = require("./auth_controller");

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;