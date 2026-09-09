const express = require("express");

const router = express.Router();

const adminOrderController = require(
  "./admin_order_controller"
);

const authMiddleware = require(
  "../../../middleware/auth_middleware"
);

const adminMiddleware = require(
  "../../../middleware/admin_middleware"
);

/*
====================================
GET ALL ORDERS - ADMIN
====================================
*/

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  adminOrderController.getAllOrders
);

/*
====================================
GET ORDER BY ID - ADMIN
====================================
*/

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  adminOrderController.getOrderById
);

/*
====================================
UPDATE ORDER STATUS - ADMIN
====================================
*/

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  adminOrderController.updateOrderStatus
);

module.exports = router;