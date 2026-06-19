const express = require("express");

const router = express.Router();

const authRoutes = require(
  "../modules/auth/auth_routes"
);

const categoryRoutes = require(
  "../modules/categories/categories_routes"
);

const productRoutes = require(
  "../modules/products/products_routes"
);

const wishlistRoutes = require(
  "../modules/wishlist/wishlist_routes"
);

const cartRoutes = require(
  "../modules/carts/cart_routes"
);

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
module.exports = router;