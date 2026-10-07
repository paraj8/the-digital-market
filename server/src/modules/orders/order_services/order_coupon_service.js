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
  items = [],
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

  let eligibleSubtotal = subtotal;

  if (coupon.scope === "products") {
    eligibleSubtotal = items.reduce((total, item) => {
      const product = item.product;
      const isEligible = coupon.products.some(
        (productId) =>
          String(productId) === String(product?._id || product)
      );

      if (!isEligible) {
        return total;
      }

      const price = product.salePrice > 0
        ? product.salePrice
        : product.price;
      return total + price * item.quantity;
    }, 0);

    if (eligibleSubtotal <= 0) {
      throw new Error(
        "Coupon does not apply to any products in this order"
      );
    }
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
    eligibleSubtotal <
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
      (eligibleSubtotal *
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
    eligibleSubtotal
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