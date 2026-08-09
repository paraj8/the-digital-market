const orderService = require("./order_service");

// Create Order

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
      message: error.message,
    });
  }
};

// Get User Orders
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
      message: error.message,
    });
  }
};

// Get Order by ID
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
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (
  req,
  res
) => {
  try {
    const {
      page,
      limit,
      status,
      search,
    } = req.query;

    const result =
      await orderService.getAllOrders({
        page,
        limit,
        status,
        search,
      });

    res.status(200).json({
      success: true,
      data: result.orders,
      pagination:
        result.pagination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status (Admin)
const updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await orderService.updateOrderStatus(
          req.params.id,
          req.body.orderStatus
        );

      res.status(200).json({
        success: true,
        message:
          "Order status updated",
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
  getAllOrders,
  updateOrderStatus,
};