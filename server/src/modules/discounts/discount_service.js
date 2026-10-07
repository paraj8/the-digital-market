const mongoose = require("mongoose");

const Discount = require("./discount_model");
const Product = require("../products/products_model");
const Category = require("../categories/categories_model");

const populateTargets = (query) =>
  query
    .populate("products", "title images price salePrice")
    .populate("categories", "name");

const normalizeDiscount = (data, existing = {}) => {
  const value = { ...existing, ...data };
  const scope = value.scope ?? "all";
  const discountType = value.discountType;
  const discountValue = Number(value.discountValue);
  const minimumOrderAmount = Number(value.minimumOrderAmount ?? 0);
  const maximumDiscountAmount = Number(value.maximumDiscountAmount ?? 0);
  const startDate = new Date(value.startDate);
  const endDate = new Date(value.endDate);
  const products = value.products ?? [];
  const categories = value.categories ?? [];
  const isActive = value.isActive ?? true;

  if (!String(value.name ?? "").trim()) {
    throw new Error("Discount name is required");
  }

  if (!["percentage", "fixed"].includes(discountType)) {
    throw new Error("Discount type must be percentage or fixed");
  }

  if (!Number.isFinite(discountValue) || discountValue <= 0) {
    throw new Error("Discount value must be greater than 0");
  }

  if (discountType === "percentage" && discountValue > 100) {
    throw new Error("Percentage discount cannot exceed 100%");
  }

  if (!["all", "products", "categories"].includes(scope)) {
    throw new Error("Discount scope must be all, products, or categories");
  }

  if (!Number.isFinite(minimumOrderAmount) || minimumOrderAmount < 0) {
    throw new Error("Minimum order amount cannot be negative");
  }

  if (!Number.isFinite(maximumDiscountAmount) || maximumDiscountAmount < 0) {
    throw new Error("Maximum discount amount cannot be negative");
  }

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error("Valid start and end dates are required");
  }

  if (endDate < startDate) {
    throw new Error("End date must be on or after the start date");
  }

  if (scope === "products" && (!Array.isArray(products) || products.length === 0)) {
    throw new Error("Select at least one product for this discount");
  }

  if (scope === "categories" && (!Array.isArray(categories) || categories.length === 0)) {
    throw new Error("Select at least one category for this discount");
  }

  if (!Array.isArray(products) || products.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    throw new Error("Discount contains an invalid product ID");
  }

  if (!Array.isArray(categories) || categories.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
    throw new Error("Discount contains an invalid category ID");
  }

  if (typeof isActive !== "boolean") {
    throw new Error("Discount active status must be a boolean");
  }

  return {
    name: String(value.name).trim(),
    description: String(value.description ?? "").trim(),
    discountType,
    discountValue,
    scope,
    products: scope === "products" ? [...new Set(products.map(String))] : [],
    categories: scope === "categories" ? [...new Set(categories.map(String))] : [],
    minimumOrderAmount,
    maximumDiscountAmount,
    startDate,
    endDate,
    isActive,
  };
};

const validateTargetIds = async ({ products, categories }) => {
  if (products.length) {
    const count = await Product.countDocuments({ _id: { $in: products } });
    if (count !== products.length) {
      throw new Error("One or more selected products do not exist");
    }
  }

  if (categories.length) {
    const count = await Category.countDocuments({ _id: { $in: categories } });
    if (count !== categories.length) {
      throw new Error("One or more selected categories do not exist");
    }
  }
};

const createDiscount = async (data) => {
  const normalized = normalizeDiscount(data);
  await validateTargetIds(normalized);
  return Discount.create(normalized);
};

const getDiscounts = async () =>
  populateTargets(Discount.find().sort({ createdAt: -1 }));

const getAvailableDiscounts = async () => {
  const now = new Date();
  return populateTargets(
    Discount.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ createdAt: 1, _id: 1 })
  );
};

const getDiscountById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid discount ID");
  }

  const discount = await populateTargets(Discount.findById(id));
  if (!discount) {
    throw new Error("Discount not found");
  }
  return discount;
};

const updateDiscount = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid discount ID");
  }

  const existing = await Discount.findById(id);
  if (!existing) {
    throw new Error("Discount not found");
  }

  const normalized = normalizeDiscount(data, existing.toObject());
  await validateTargetIds(normalized);
  await Discount.findByIdAndUpdate(id, normalized, {
    new: true,
    runValidators: true,
  });
  return populateTargets(Discount.findById(id));
};

const deleteDiscount = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid discount ID");
  }
  const deleted = await Discount.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error("Discount not found");
  }
  return { message: "Discount deleted successfully" };
};

const calculateDiscountAmount = (discount, eligibleSubtotal) => {
  if (eligibleSubtotal < discount.minimumOrderAmount) {
    return 0;
  }

  let amount = discount.discountType === "percentage"
    ? eligibleSubtotal * discount.discountValue / 100
    : discount.discountValue;

  if (
    discount.discountType === "percentage" &&
    discount.maximumDiscountAmount > 0
  ) {
    amount = Math.min(amount, discount.maximumDiscountAmount);
  }

  return Math.min(amount, eligibleSubtotal);
};

const calculateApplicableDiscount = async (items) => {
  const now = new Date();
  const discounts = await Discount.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).sort({ createdAt: 1, _id: 1 });

  let best = { discount: null, amount: 0 };

  for (const rule of discounts) {
    let eligibleSubtotal = 0;

    for (const item of items) {
      const product = item.product;
      if (!product) {
        continue;
      }

      const productId = String(product._id || product);
      const categoryId = product.category
        ? String(product.category._id || product.category)
        : "";
      const eligible = rule.scope === "all"
        || (rule.scope === "products" && rule.products.some((id) => String(id) === productId))
        || (rule.scope === "categories" && rule.categories.some((id) => String(id) === categoryId));

      if (eligible) {
        const unitPrice = product.salePrice > 0 ? product.salePrice : product.price;
        eligibleSubtotal += unitPrice * item.quantity;
      }
    }

    const amount = calculateDiscountAmount(rule, eligibleSubtotal);
    if (amount > best.amount) {
      best = { discount: rule, amount };
    }
  }

  return {
    discount: best.discount,
    amount: best.amount,
  };
};

module.exports = {
  createDiscount,
  getDiscounts,
  getAvailableDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
  calculateApplicableDiscount,
};
