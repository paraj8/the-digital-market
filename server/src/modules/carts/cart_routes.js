const express = require("express");

const router = express.Router();

const cartController = require(
  "./cart_controller"
);

const authMiddleware = require(
  "../../middleware/auth_middleware"
);

// Add To Cart
router.post(
  "/",
  authMiddleware,
  cartController.addToCart
);

// Get Cart
router.get(
  "/",
  authMiddleware,
  cartController.getCart
);

router.patch(
  "/:itemId",
  authMiddleware,
  cartController.updateCartItem
);

router.delete(
  "/:itemId",
  authMiddleware,
  cartController.removeCartItem
);

router.delete(
  "/",
  authMiddleware,
  cartController.clearCart
);

module.exports = router;