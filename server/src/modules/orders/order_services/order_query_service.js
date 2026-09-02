const Order = require(
  "../order_model"
);

/*
====================================
GET USER ORDERS
====================================
*/

const getOrders = async (
  userId
) => {
  return await Order.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .select(
      "items totalAmount checkoutMode orderStatus paymentStatus paymentMethod createdAt"
    );
};

/*
====================================
GET ORDER BY ID
====================================
*/

const getOrderById = async (
  userId,
  orderId
) => {
  const order =
    await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .populate(
        "shippingAddress"
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
  getOrders,
  getOrderById,
};