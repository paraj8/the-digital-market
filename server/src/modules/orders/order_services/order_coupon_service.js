const Coupon = require(
  "../../coupons/coupon_model"
);

/*
====================================
VALIDATE & CALCULATE COUPON
====================================
*/

const validateCoupon = async ({
  couponCode,
  subtotal,
}) => {
  /*
  No coupon supplied.
  */

  if (!couponCode) {
    return {
      coupon: null,
      discount: 0,
    };
  }

  /*
  Find active coupon.
  */

  const coupon =
    await Coupon.findOne({
      code:
        couponCode.toUpperCase(),
      isActive: true,
    });

  if (!coupon) {
    throw new Error(
      "Invalid coupon"
    );
  }

  /*
  Validate coupon dates.
  */

  const now = new Date();

  if (
    now < coupon.startDate ||
    now > coupon.endDate
  ) {
    throw new Error(
      "Coupon expired"
    );
  }

  /*
  Validate minimum order amount.
  */

  if (
    subtotal <
    coupon.minimumOrderAmount
  ) {
    throw new Error(
      `Minimum order amount is ₹${coupon.minimumOrderAmount}`
    );
  }

  let discount = 0;

  /*
  Percentage discount.
  */

  if (
    coupon.discountType ===
    "percentage"
  ) {
    discount =
      (subtotal *
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
  }

  /*
  Fixed discount.
  */

  else {
    discount =
      coupon.discountValue;
  }

  /*
  Prevent discount from
  exceeding subtotal.
  */

  discount = Math.min(
    discount,
    subtotal
  );

  return {
    coupon,
    discount,
  };
};

/*
====================================
INCREASE COUPON USAGE
====================================
*/

const incrementCouponUsage =
  async (couponId) => {
    if (!couponId) {
      return;
    }

    await Coupon.findByIdAndUpdate(
      couponId,
      {
        $inc: {
          usedCount: 1,
        },
      }
    );
  };

module.exports = {
  validateCoupon,
  incrementCouponUsage,
};