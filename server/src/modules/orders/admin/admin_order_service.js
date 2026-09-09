
const Order = require("../order_model");
const User = require("../../users/users_model");

/*
====================================
GET ALL ORDERS - ADMIN
====================================
*/

const getAllOrders = async ({
  page = 1,
  limit = 20,
  status,
  search,
}) => {
  const currentPage = Math.max(
    Number(page) || 1,
    1
  );

  const perPage = Math.min(
    Math.max(
      Number(limit) || 20,
      1
    ),
    100
  );

  const skip =
    (currentPage - 1) *
    perPage;

  const filter = {};

  /*
  ====================================
  STATUS FILTER
  ====================================
  */

  if (status) {
    filter.orderStatus = status;
  }

  /*
  ====================================
  SEARCH FILTER
  ====================================
  */

  if (search) {
    // Escape special RegExp characters
    const escapedSearch =
      search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const searchRegex =
      new RegExp(
        escapedSearch,
        "i"
      );

    const users =
      await User.find({
        $or: [
          {
            fullName:
              searchRegex,
          },
          {
            email:
              searchRegex,
          },
        ],
      }).select("_id");

    filter.user = {
      $in: users.map(
        (user) => user._id
      ),
    };
  }

  /*
  ====================================
  GET ORDERS
  ====================================
  */

  const [
    orders,
    totalOrders,
  ] = await Promise.all([
    Order.find(filter)
      .populate(
        "user",
        "fullName email"
      )
      .populate(
        "shippingAddress",
        "fullName phone addressLine1 addressLine2 landmark city state country postalCode addressType"
      )
      .populate(
        "coupon",
        "code discountType discountValue"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage),

    Order.countDocuments(
      filter
    ),
  ]);

  /*
  ====================================
  RETURN
  ====================================
  */

  return {
    orders,

    pagination: {
      currentPage,

      limit: perPage,

      totalOrders,

      totalPages:
        Math.ceil(
          totalOrders /
            perPage
        ),
    },
  };
};

/*
====================================
UPDATE ORDER STATUS - ADMIN
====================================
*/

const updateOrderStatus =
  async (
    orderId,
    orderStatus
  ) => {
    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    /*
    Validate status
    */

    if (
      !allowedStatuses.includes(
        orderStatus
      )
    ) {
      throw new Error(
        "Invalid order status"
      );
    }

    /*
    Find order
    */

    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    /*
    Update status
    */

    order.orderStatus =
      orderStatus;

    /*
    IMPORTANT:
    Payment status is NOT changed
    here.

    CashFree verification is the
    source of truth for payment.
    */

    await order.save();

    return order;
  };

  /*
====================================
GET ORDER BY ID - ADMIN
====================================
*/

const getOrderById = async (
  orderId
) => {
  const order =
    await Order.findById(orderId)
      .populate(
        "user",
        "fullName email"
      )
      .populate(
        "shippingAddress",
        "fullName phone addressLine1 addressLine2 landmark city state country postalCode addressType"
      )
      .populate(
        "coupon",
        "code discountType discountValue"
      );

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

  return order;
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};

