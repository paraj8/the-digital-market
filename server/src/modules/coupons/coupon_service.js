const Coupon = require("./coupon_model");

// Create Coupon

const createCoupon = async (
  data
) => {
  const existingCoupon =
    await Coupon.findOne({
      code: data.code.toUpperCase(),
    });

  if (existingCoupon) {
    throw new Error(
      "Coupon already exists"
    );
  }

  return await Coupon.create({
    ...data,
    code: data.code.toUpperCase(),
  });
};

// Get All Coupons

const getCoupons = async () => {
  return await Coupon.find().sort({
    createdAt: -1,
  });
};

// Get Coupon By ID

const getCouponById = async (
  couponId
) => {
  const coupon =
    await Coupon.findById(couponId);

  if (!coupon) {
    throw new Error(
      "Coupon not found"
    );
  }

  return coupon;
};

// Update Coupon

const updateCoupon = async (
  couponId,
  data
) => {
  const coupon =
    await Coupon.findByIdAndUpdate(
      couponId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!coupon) {
    throw new Error(
      "Coupon not found"
    );
  }

  return coupon;
};

// Delete Coupon

const deleteCoupon = async (
  couponId
) => {
  const coupon =
    await Coupon.findByIdAndDelete(
      couponId
    );

  if (!coupon) {
    throw new Error(
      "Coupon not found"
    );
  }

  return {
    message:
      "Coupon deleted successfully",
  };
};

// Validate Coupon

const validateCoupon = async (
  code,
  orderAmount
) => {
  const coupon =
    await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

  if (!coupon) {
    throw new Error(
      "Invalid coupon"
    );
  }

  const now = new Date();

  if (
    now < coupon.startDate ||
    now > coupon.endDate
  ) {
    throw new Error(
      "Coupon expired"
    );
  }

  if (
    coupon.usageLimit > 0 &&
    coupon.usedCount >=
      coupon.usageLimit
  ) {
    throw new Error(
      "Coupon usage limit reached"
    );
  }

  if (
    orderAmount <
    coupon.minimumOrderAmount
  ) {
    throw new Error(
      `Minimum order amount is ₹${coupon.minimumOrderAmount}`
    );
  }

  let discount = 0;

  if (
    coupon.discountType ===
    "percentage"
  ) {
    discount =
      (orderAmount *
        coupon.discountValue) /
      100;

    if (
      coupon.maximumDiscountAmount >
        0 &&
      discount >
        coupon.maximumDiscountAmount
    ) {
      discount =
        coupon.maximumDiscountAmount;
    }
  } else {
    discount =
      coupon.discountValue;
  }

  return {
    coupon,
    discount,
    finalAmount:
      orderAmount - discount,
  };
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
};