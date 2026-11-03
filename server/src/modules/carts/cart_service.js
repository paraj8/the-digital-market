const Cart = require("./cart_model");
const Product = require("../products/products_model");

const getVariant = (product, variantId) =>
  variantId
    ? product.variants.id(variantId)
    : null;

const validateQuantity = (quantity) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive whole number");
  }
};

const validateAvailability = (product, variant, quantity) => {
  if (!product.isActive) {
    throw new Error("Product is not available");
  }
  if (product.hasVariants && !variant) {
    throw new Error("Select a valid product variant");
  }
  if (variant && !product.hasVariants) {
    throw new Error("This product does not offer that variant");
  }
  if (variant && !variant.isActive) {
    throw new Error("This product variant is not available");
  }

  const stock = variant ? variant.stock : product.stock;
  if (
    product.trackInventory &&
    !product.allowBackorder &&
    (stock <= 0 || quantity > stock)
  ) {
    throw new Error("Requested quantity is not available in stock");
  }
};

const addToCart = async (
  userId,
  productId,
  quantity = 1,
  variantId = null
) => {
  validateQuantity(quantity);
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const variant = getVariant(product, variantId);
  if (variantId && !variant) {
    throw new Error("Product variant not found");
  }
  validateAvailability(product, variant, quantity);

  const identity = {
    user: userId,
    product: productId,
    variantId: variant?._id ?? null,
  };
  const existingItem = await Cart.findOne(identity);
  validateAvailability(
    product,
    variant,
    quantity + (existingItem?.quantity ?? 0)
  );
  const cartItem = await Cart.findOneAndUpdate(
    identity,
    {
      $inc: { quantity },
      $setOnInsert: {
        user: userId,
        product: productId,
        variantId: variant?._id ?? null,
        variantAttributes: variant?.attributes ?? {},
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );
  return cartItem;
};

const getCart = async (userId) => {
  const items = await Cart.find({ user: userId }).populate("product");
  let totalItems = 0;
  let totalAmount = 0;
  const validItems = [];

  for (const item of items) {
    if (!item.product) {
      await Cart.findByIdAndDelete(item._id);
      continue;
    }

    const variant = item.variantId
      ? item.product.variants.id(item.variantId)
      : null;
    const variantUnavailable =
      !item.product.isActive ||
      (item.product.hasVariants && !variant) ||
      (Boolean(item.variantId) &&
        (!variant || !variant.isActive || !item.product.hasVariants));
    const priceSource = variant ?? item.product;
    const price =
      priceSource.salePrice > 0
        ? priceSource.salePrice
        : priceSource.price;
    const subtotal = variantUnavailable
      ? 0
      : price * item.quantity;

    totalItems += item.quantity;
    totalAmount += subtotal;
    validItems.push({
      ...item.toObject(),
      variantAttributes: Object.fromEntries(
        item.variantAttributes ?? []
      ),
      variant: variant
        ? {
            _id: String(variant._id),
            attributes: Object.fromEntries(variant.attributes),
            sku: variant.sku,
            price: variant.price,
            salePrice: variant.salePrice,
            stock: variant.stock,
            isActive: variant.isActive,
          }
        : null,
      variantUnavailable,
      subtotal,
    });
  }

  return { items: validItems, totalItems, totalAmount };
};

const updateCartItem = async (userId, itemId, quantity) => {
  validateQuantity(quantity);
  const cartItem = await Cart.findOne({
    _id: itemId,
    user: userId,
  }).populate("product");

  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  if (!cartItem.product) {
    throw new Error("Product is no longer available");
  }

  const variant = cartItem.variantId
    ? cartItem.product.variants.id(cartItem.variantId)
    : null;
  if (cartItem.variantId && !variant) {
    throw new Error("Product variant is no longer available");
  }
  validateAvailability(cartItem.product, variant, quantity);

  cartItem.quantity = quantity;
  await cartItem.save();
  return cartItem;
};

const removeCartItem = async (userId, itemId) => {
  const cartItem = await Cart.findOneAndDelete({
    _id: itemId,
    user: userId,
  });
  if (!cartItem) {
    throw new Error("Cart item not found");
  }
  return { message: "Item removed from cart" };
};

const clearCart = async (userId) => {
  await Cart.deleteMany({ user: userId });
  return { message: "Cart cleared" };
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
