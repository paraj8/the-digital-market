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

    return res.status(201).json({
      success: true,

      message:
        "Order created successfully",

      data: order,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    return res.status(400).json({
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

    return res.status(200).json({
      success: true,

      data: orders,
    });
  } catch (error) {
    console.error(
      "Get orders error:",
      error
    );

    return res.status(400).json({
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

    return res.status(200).json({
      success: true,

      data: order,
    });
  } catch (error) {
    console.error(
      "Get order by ID error:",
      error
    );

    return res.status(400).json({
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