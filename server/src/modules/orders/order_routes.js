const express = require("express");

const router = express.Router();

const orderController = require(
  "./order_controller"
);

const authMiddleware = require(
  "../../middleware/auth_middleware"
);

/*
====================================
CREATE ORDER
====================================
*/

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

/*
====================================
GET MY ORDERS
====================================
*/

router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

/*
====================================
GET SINGLE ORDER
====================================
*/

router.get(
  "/:id",
  authMiddleware,
  orderController.getOrderById
);

module.exports = router;