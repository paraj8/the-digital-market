const Coupon = require("./coupon_model");
const mongoose = require("mongoose");
const Product = require("../products/products_model");

const normalizeCouponCode = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim().toUpperCase();
};

const sanitizeCouponForCustomer = (coupon) => {
  if (!coupon) {
    return null;
  }

  const data = coupon.toObject ? coupon.toObject() : coupon;

  return {
    _id: data._id,
    code: data.code,
    description: data.description || "",
    discountType: data.discountType,
    scope: data.scope || "all",
    products: (data.products || []).map((product) =>
      String(product?._id || product)
    ),
    discountValue: data.discountValue,
    minimumOrderAmount: data.minimumOrderAmount || 0,
    maximumDiscountAmount: data.maximumDiscountAmount || 0,
    startDate: data.startDate,
    endDate: data.endDate,
  };
};

const normalizeCouponScope = (data, existingCoupon = null) => {
  const scope = data.scope ?? existingCoupon?.scope ?? "all";
  const products = data.products ?? existingCoupon?.products ?? [];

  if (!["all", "products"].includes(scope)) {
    throw new Error("Coupon scope must be all or products");
  }

  if (!Array.isArray(products)) {
    throw new Error("Coupon products must be an array");
  }

  if (scope === "products" && products.length === 0) {
    throw new Error("Select at least one product for this coupon");
  }

  if (products.some((product) => !mongoose.Types.ObjectId.isValid(product?._id || product))) {
    throw new Error("Coupon contains an invalid product ID");
  }

  return {
    scope,
    products: scope === "products"
      ? [...new Set(products.map((product) => String(product?._id || product)))]
      : [],
  };
};

// Create Coupon

const createCoupon = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Coupon data is required");
  }

  const normalizedCode = normalizeCouponCode(data.code);

  if (!normalizedCode) {
    throw new Error("Coupon code is required");
  }

  const existingCoupon = await Coupon.findOne({
    code: normalizedCode,
  });

  if (existingCoupon) {
    throw new Error("Coupon already exists");
  }

  const scopeData = normalizeCouponScope(data);

  return await Coupon.create({
    ...data,
    code: normalizedCode,
    ...scopeData,
  });
};

// Get All Coupons

const getCoupons = async () => {
  return await Coupon.find()
    .populate("products", "title images price salePrice")
    .sort({ createdAt: -1 });
};

const getAvailableCoupons = async (productId) => {
  const now = new Date();
  if (productId && !mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const scopeFilter = productId
    ? {
        $or: [
          { scope: { $ne: "products" } },
          { scope: "products", products: productId },
        ],
      }
    : { scope: { $ne: "products" } };

  const coupons = await Coupon.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
    $and: [
      {
        $or: [
          { usageLimit: 0 },
          { $expr: { $lt: ["$usedCount", "$usageLimit"] } },
        ],
      },
      scopeFilter,
    ],
  }).sort({
    createdAt: -1,
  }).lean();

  return coupons.map(sanitizeCouponForCustomer).filter(Boolean);
};

const getCouponByCode = async (code) => {
  const normalizedCode = normalizeCouponCode(code);

  if (!normalizedCode) {
    throw new Error("Coupon code is required");
  }

  const coupon = await Coupon.findOne({
    code: normalizedCode,
  });

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
};

// Get Coupon By ID

const getCouponById = async (
  couponId
) => {
  const coupon =
    await Coupon.findById(couponId).populate("products", "title images price salePrice");

  if (!coupon) {
    throw new Error(
      "Coupon not found"
    );
  }

  return coupon;
};

// Update Coupon

const updateCoupon = async (couponId, data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Coupon data is required");
  }

  const updatePayload = { ...data };
  const existingCoupon = await Coupon.findById(couponId);

  if (!existingCoupon) {
    throw new Error("Coupon not found");
  }

  const scopeData = normalizeCouponScope(updatePayload, existingCoupon);

  if (updatePayload.code !== undefined) {
    updatePayload.code = normalizeCouponCode(updatePayload.code);

    if (!updatePayload.code) {
      throw new Error("Coupon code is required");
    }

    const existingCoupon = await Coupon.findOne({
      code: updatePayload.code,
      _id: { $ne: couponId },
    });

    if (existingCoupon) {
      throw new Error("Coupon already exists");
    }
  }

  const coupon = await Coupon.findByIdAndUpdate(couponId, {
    ...updatePayload,
    ...scopeData,
  }, {
    new: true,
    runValidators: true,
  });

  if (!coupon) {
    throw new Error("Coupon not found");
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

const validateCoupon = async (code, orderAmount, items = []) => {
  const normalizedCode = normalizeCouponCode(code);

  if (!normalizedCode) {
    throw new Error("Coupon code is required");
  }

  if (typeof orderAmount !== "number" || Number.isNaN(orderAmount) || orderAmount < 0) {
    throw new Error("Valid order amount is required");
  }

  if (!Array.isArray(items)) {
    throw new Error("Checkout items must be an array");
  }

  const coupon = await Coupon.findOne({
    code: normalizedCode,
    isActive: true,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
    $or: [
      { usageLimit: 0 },
      { $expr: { $lt: ["$usedCount", "$usageLimit"] } },
    ],
  });

  if (!coupon) {
    throw new Error("Invalid coupon");
  }

  let checkoutSubtotal = orderAmount;
  let eligibleSubtotal = orderAmount;

  if (items.length > 0) {
    const normalizedItems = items.map(({ productId, quantity }) => {
      if (
        !mongoose.Types.ObjectId.isValid(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        throw new Error("Invalid checkout item");
      }

      return { productId: String(productId), quantity };
    });
    const products = await Product.find({
      _id: { $in: normalizedItems.map((item) => item.productId) },
      isActive: true,
    });
    const productsById = new Map(
      products.map((product) => [String(product._id), product])
    );

    if (productsById.size !== new Set(normalizedItems.map((item) => item.productId)).size) {
      throw new Error("One or more checkout products are unavailable");
    }

    checkoutSubtotal = normalizedItems.reduce((total, item) => {
      const product = productsById.get(item.productId);
      const price = product.salePrice > 0 ? product.salePrice : product.price;
      return total + price * item.quantity;
    }, 0);

    eligibleSubtotal = coupon.scope === "products"
      ? normalizedItems.reduce((total, item) => {
          const isEligible = coupon.products.some(
            (productId) => String(productId) === item.productId
          );
          if (!isEligible) {
            return total;
          }

          const product = productsById.get(item.productId);
          const price = product.salePrice > 0 ? product.salePrice : product.price;
          return total + price * item.quantity;
        }, 0)
      : checkoutSubtotal;
  } else if (coupon.scope === "products") {
    throw new Error("Checkout items are required for this product-specific coupon");
  }

  if (coupon.scope === "products" && eligibleSubtotal <= 0) {
    throw new Error("Coupon does not apply to any products in this order");
  }

  const now = new Date();

  if (now < coupon.startDate || now > coupon.endDate) {
    throw new Error("Coupon expired");
  }

  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    throw new Error("Coupon usage limit reached");
  }

  if (eligibleSubtotal < coupon.minimumOrderAmount) {
    throw new Error(`Minimum order amount is ₹${coupon.minimumOrderAmount}`);
  }

  let discount = 0;

  if (coupon.discountType === "percentage") {
    discount = (eligibleSubtotal * coupon.discountValue) / 100;

    if (coupon.maximumDiscountAmount > 0 && discount > coupon.maximumDiscountAmount) {
      discount = coupon.maximumDiscountAmount;
    }
  } else {
    discount = coupon.discountValue;
  }

  const appliedDiscount = Math.min(discount, eligibleSubtotal);

  return {
    coupon: sanitizeCouponForCustomer(coupon),
    discount: appliedDiscount,
    finalAmount: checkoutSubtotal - appliedDiscount,
  };
};

module.exports = {
  createCoupon,
  getCoupons,
  getAvailableCoupons,
  getCouponById,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
};