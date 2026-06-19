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
  "../modules/wishlist"
);

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);

module.exports = router;