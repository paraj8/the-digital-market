const express = require("express");

const router = express.Router();

const wishlistController = require(
  "./wishlist_controller"
);

const authMiddleware = require(
  "../../middleware/auth_middleware"
);

// Add Product
router.post(
  "/",
  authMiddleware,
  wishlistController.addToWishlist
);

// Get Wishlist
router.get(
  "/",
  authMiddleware,
  wishlistController.getWishlist
);

// Remove Product
router.delete(
  "/:productId",
  authMiddleware,
  wishlistController.removeFromWishlist
);

module.exports = router;