const cartService = require("./cart_service");

// Add To Cart
const addToCart = async (
  req,
  res
) => {
  try {
    const cartItem =
      await cartService.addToCart(
        req.user.id,
        req.body.productId,
        req.body.quantity
      );

    res.status(201).json({
      success: true,
      message:
        "Product added to cart",
      data: cartItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (
  req,
  res
) => {
  try {
    const cart =
      await cartService.getCart(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cart Item

const updateCartItem = async (
  req,
  res
) => {
  try {
    const item =
      await cartService.updateCartItem(
        req.user.id,
        req.params.itemId,
        req.body.quantity
      );

    res.status(200).json({
      success: true,
      message:
        "Cart updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Cart Item

const removeCartItem = async (
  req,
  res
) => {
  try {
    const result =
      await cartService.removeCartItem(
        req.user.id,
        req.params.itemId
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

// Clear Cart

const clearCart = async (
  req,
  res
) => {
  try {
    const result =
      await cartService.clearCart(
        req.user.id
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

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};