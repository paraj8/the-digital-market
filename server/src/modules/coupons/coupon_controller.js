const couponService = require(
  "./coupon_service"
);

const createCoupon = async (
  req,
  res
) => {
  try {
    const coupon =
      await couponService.createCoupon(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCoupons = async (
  req,
  res
) => {
  try {
    const coupons =
      await couponService.getCoupons();

    res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCouponById = async (
  req,
  res
) => {
  try {
    const coupon =
      await couponService.getCouponById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCoupon = async (
  req,
  res
) => {
  try {
    const coupon =
      await couponService.updateCoupon(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCoupon = async (
  req,
  res
) => {
  try {
    const result =
      await couponService.deleteCoupon(
        req.params.id
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

const validateCoupon = async (
  req,
  res
) => {
  try {
    const result =
      await couponService.validateCoupon(
        req.body.code,
        req.body.orderAmount
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
};