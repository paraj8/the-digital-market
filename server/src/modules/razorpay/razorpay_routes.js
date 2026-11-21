const express = require("express");
const authMiddleware = require("../../middleware/auth_middleware");
const {
  createOrder,
  verifyPayment,
  markFailed,
  getStatus,
  webhook,
} = require("./razorpay_controller");

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify-payment", authMiddleware, verifyPayment);
router.post("/payment-failed", authMiddleware, markFailed);
router.get("/payment-status/:orderId", authMiddleware, getStatus);
router.post("/webhook", webhook);

module.exports = router;
