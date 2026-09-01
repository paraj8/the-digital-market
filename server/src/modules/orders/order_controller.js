const orderService = require("./order_service");

/*
====================================
CREATE ORDER
====================================
*/

const createOrder = async (
  req,
  res
) => {
  try {
    const order =
      await orderService.createOrder(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Order created successfully",

      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

/*
====================================
GET USER ORDERS
====================================
*/

const getOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await orderService.getOrders(
        req.user.id
      );

    res.status(200).json({
      success: true,

      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

/*
====================================
GET ORDER BY ID
====================================
*/

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await orderService.getOrderById(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,

      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};