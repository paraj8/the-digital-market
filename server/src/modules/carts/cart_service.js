const Cart = require("./cart_model");
const Product = require("../products/products_model");

// Add Product To Cart

const addToCart = async (
  userId,
  productId,
  quantity = 1
) => {
  const product =
    await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cartItem =
    await Cart.findOne({
      user: userId,
      product: productId,
    });

  if (cartItem) {
    cartItem.quantity += quantity;

    await cartItem.save();

    return cartItem;
  }

  cartItem =
    await Cart.create({
      user: userId,
      product: productId,
      quantity,
    });

  return cartItem;
};

// Get Cart Items

const getCart = async (userId) => {
  const items = await Cart.find({
    user: userId,
  }).populate("product");

  let totalItems = 0;
  let totalAmount = 0;

  const validItems = [];

  for (const item of items) {
    // Product no longer exists
    if (!item.product) {
      await Cart.findByIdAndDelete(item._id);
      continue;
    }

    const price =
      item.product.salePrice > 0
        ? item.product.salePrice
        : item.product.price;

    const subtotal =
      price * item.quantity;

    totalItems += item.quantity;
    totalAmount += subtotal;

    validItems.push({
      ...item.toObject(),
      subtotal,
    });
  }

  return {
    items: validItems,
    totalItems,
    totalAmount,
  };
};

// Update Cart Item

const updateCartItem = async (
  userId,
  itemId,
  quantity
) => {
  const cartItem =
    await Cart.findOne({
      _id: itemId,
      user: userId,
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found"
    );
  }

  cartItem.quantity = quantity;

  await cartItem.save();

  return cartItem;
};

// Remove Cart Item

const removeCartItem = async (
  userId,
  itemId
) => {
  const cartItem =
    await Cart.findOneAndDelete({
      _id: itemId,
      user: userId,
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found"
    );
  }

  return {
    message:
      "Item removed from cart",
  };
};

// Clear Cart

const clearCart = async (
  userId
) => {
  await Cart.deleteMany({
    user: userId,
  });

  return {
    message: "Cart cleared",
  };
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};