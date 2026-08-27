const express = require("express");

const router = express.Router();

const adminProductRoutes = require(
  "../modules/products/admin/admin_product_routes"
);

const authRoutes = require("../modules/auth");
const categoryRoutes = require("../modules/categories");
const productRoutes = require("../modules/products");
const wishlistRoutes = require("../modules/wishlist");
const cartRoutes = require("../modules/carts");
const addressRoutes = require("../modules/address");
const couponRoutes = require("../modules/coupons");
const ordersRoutes = require("../modules/orders");

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/coupons", couponRoutes);
router.use("/cart", cartRoutes);
router.use("/addresses", addressRoutes);
router.use("/orders", ordersRoutes);
router.use("/admin/products", adminProductRoutes);
module.exports = router;