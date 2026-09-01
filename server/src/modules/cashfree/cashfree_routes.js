
const express = require("express");

const {
  createPaymentOrder,
  getPaymentStatus,
} = require("./cashfree_controller");

const router =
  express.Router();

/*
====================================
CREATE CASHFREE PAYMENT ORDER
====================================
*/

router.post(
  "/create-order",
  createPaymentOrder
);

/*
====================================
GET CASHFREE PAYMENT STATUS
====================================
*/

router.get(
  "/payment-status/:orderId",
  getPaymentStatus
);

module.exports = router;

