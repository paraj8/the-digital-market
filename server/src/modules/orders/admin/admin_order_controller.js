
const adminOrderService = require(
  "./admin_order_service"
);

/*
====================================
GET ALL ORDERS
====================================
*/

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
      await adminOrderService.getAllOrders({
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

      message:
        error.message,
    });
  }
};

/*
====================================
GET ORDER BY ID - ADMIN
====================================
*/

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await adminOrderService.getOrderById(
        req.params.id
      );

    res.status(200).json({
      success: true,

      message:
        "Order fetched successfully",

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
UPDATE ORDER STATUS
====================================
*/

const updateOrderStatus =
  async (
    req,
    res
  ) => {
    try {
      const {
        orderStatus,
      } = req.body;

      if (!orderStatus) {
        return res.status(400).json({
          success: false,
          message:
            "Order status is required",
        });
      }

      const order =
        await adminOrderService.updateOrderStatus(
          req.params.id,
          orderStatus
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
  getAllOrders,
  updateOrderStatus,
  getOrderById
};

