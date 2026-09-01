const express = require("express");

const router = express.Router();

// Admin Routes

const adminProductRoutes = require(
  "../modules/products/admin/admin_product_routes"
);

const adminOrderRoutes = require(
  "../modules/orders/admin/admin_order_routes"
);


// User Routes
const authRoutes = require("../modules/auth");
const categoryRoutes = require("../modules/categories");
const productRoutes = require("../modules/products");
const wishlistRoutes = require("../modules/wishlist");
const cartRoutes = require("../modules/carts");
const addressRoutes = require("../modules/address");
const cashfreeRoutes = require("../modules/cashfree");
const couponRoutes = require("../modules/coupons");
const ordersRoutes = require("../modules/orders");

// User Routes
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/cashfree", cashfreeRoutes);
router.use("/products", productRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/coupons", couponRoutes);
router.use("/cart", cartRoutes);
router.use("/addresses", addressRoutes);
router.use("/orders", ordersRoutes);

// Admin Routes
router.use("/admin/products", adminProductRoutes);
router.use("/admin/orders", adminOrderRoutes);
module.exports = router;