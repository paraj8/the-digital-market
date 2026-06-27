const express = require("express");

const router = express.Router();

const couponController = require(
  "./coupon_controller"
);

router.post(
  "/",
  couponController.createCoupon
);

router.get(
  "/",
  couponController.getCoupons
);

router.get(
  "/:id",
  couponController.getCouponById
);

router.patch(
  "/:id",
  couponController.updateCoupon
);

router.delete(
  "/:id",
  couponController.deleteCoupon
);

router.post(
  "/validate",
  couponController.validateCoupon
);

module.exports = router;