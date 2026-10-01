const express = require("express");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../../middleware/auth_middleware");
const usersController = require("./users_controller");
const usersValidation = require("./users_validation");

const router = express.Router();

const accountOtpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many verification-code requests. Try again later.",
    });
  },
});

router.use(authMiddleware);

router.get("/me", usersController.getCurrentUser);
router.patch("/me", usersValidation.validateProfileUpdate, usersController.updateProfile);
router.patch(
  "/me/password",
  usersValidation.validatePasswordChange,
  usersController.changePassword
);
router.patch(
  "/me/phone",
  usersValidation.validatePhoneUpdate,
  usersController.updatePhone
);
router.post(
  "/me/phone/otp",
  accountOtpLimiter,
  usersValidation.validatePhoneOtpRequest,
  usersController.sendPhoneOtp
);
router.post(
  "/me/phone/verify",
  usersValidation.validatePhoneOtpVerification,
  usersController.verifyPhoneOtp
);
router.post(
  "/me/email/change/otp",
  accountOtpLimiter,
  usersValidation.validateEmailOtpRequest,
  usersController.sendEmailChangeOtp
);
router.post(
  "/me/email/change/verify",
  usersValidation.validateEmailOtpVerification,
  usersController.verifyEmailChangeOtp
);
router.delete(
  "/me",
  usersValidation.validateAccountDeletion,
  usersController.deleteAccount
);

module.exports = router;
