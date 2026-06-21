const express = require("express");

const router = express.Router();

const orderController = require(
  "./order_controller"
);

const authMiddleware = require(
  "../../middleware/auth_middleware"
);

const adminMiddleware = require(
  "../../middleware/admin_middleware"
);

// Create Order

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

// Get My Orders

router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

// Get Single Order

router.get(
  "/:id",
  authMiddleware,
  orderController.getOrderById
);

// Admin - Get All Orders

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  orderController.getAllOrders
);

// Admin - Update Status

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  orderController.updateOrderStatus
);

module.exports = router;