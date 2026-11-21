const Order = require(
  "./order_model"
);

const {
  createPendingOrder,
} = require(
  "./order_services/order_creation_service"
);

const {
  validateOrderInventory,
  reduceOrderStock,
  cleanupCartAfterOrder,
} = require(
  "./order_services/order_inventory_service"
);

const {
  incrementCouponUsage,
} = require(
  "./order_services/order_coupon_service"
);

const {
  markOrderAsFailed,
} = require(
  "./order_services/order_payment_service"
);

const {
  getOrders,
  getOrderById,
} = require(
  "./order_services/order_query_service"
);

/*
====================================
CREATE ORDER
====================================
*/

const createOrder = async (
  userId,
  checkoutData
) => {
  return await createPendingOrder(
    userId,
    checkoutData
  );
};

/*
====================================
COMPLETE PAID ORDER
====================================
====================================

Called after CashFree confirms
successful payment.
====================================
*/

const completePaidOrder =
  async (orderId, paymentDetails = {}) => {
    /*
    ====================================
    GET ORDER
    ====================================
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
    ====================================
    PREVENT DUPLICATE PROCESSING
    ====================================
    */

    if (order.paymentStatus === "paid") {
      return order;
    }

    const lockedOrder =
      await Order.findOneAndUpdate(
        {
          _id: orderId,
          paymentStatus: { $ne: "paid" },
          paymentProcessing: { $ne: true },
        },
        {
          $set: {
            paymentProcessing: true,
            ...(paymentDetails.provider
              ? { paymentProvider: paymentDetails.provider }
              : {}),
            ...(paymentDetails.transactionId
              ? { paymentTransactionId: paymentDetails.transactionId }
              : {}),
            ...(paymentDetails.razorpayOrderId
              ? { razorpayOrderId: paymentDetails.razorpayOrderId }
              : {}),
            ...(paymentDetails.razorpayPaymentId
              ? { razorpayPaymentId: paymentDetails.razorpayPaymentId }
              : {}),
            ...(paymentDetails.cashfreeOrderId
              ? { cashfreeOrderId: paymentDetails.cashfreeOrderId }
              : {}),
          },
        },
        { new: true }
      );

    if (!lockedOrder) {
      const existing =
        await Order.findById(orderId);
      return existing;
    }

    try {

    /*
    ====================================
    VALIDATE INVENTORY AGAIN
    ====================================

    Stock may have changed while
    customer was completing payment.
    */

    await validateOrderInventory(
      lockedOrder
    );

    /*
    ====================================
    REDUCE STOCK
    ====================================
    */

    await reduceOrderStock(
      lockedOrder
    );

    /*
    ====================================
    UPDATE COUPON USAGE
    ====================================
    */

    if (lockedOrder.coupon) {
      await incrementCouponUsage(
        lockedOrder.coupon
      );
    }

    /*
    ====================================
    CART CLEANUP
    ====================================
    */

    await cleanupCartAfterOrder(
      lockedOrder
    );

    /*
    ====================================
    UPDATE ORDER STATUS
    ====================================
    */

      lockedOrder.paymentStatus =
      "paid";

      lockedOrder.orderStatus =
      "confirmed";

      lockedOrder.paymentProcessing =
        false;

      await lockedOrder.save();

      return lockedOrder;
    } catch (error) {
      await Order.updateOne(
        { _id: orderId },
        { $set: { paymentProcessing: false } }
      );
      throw error;
    }
  };

/*
====================================
FAIL ORDER PAYMENT
====================================
====================================

Called when CashFree confirms
that the payment failed.

IMPORTANT:

We DO NOT:

- reduce stock
- increase sales
- update coupon usage
- clear cart
====================================
*/

const failOrder = async (
  orderId,
  reason = ""
) => {
  return await markOrderAsFailed(
    orderId,
    reason
  );
};

/*
====================================
PUBLIC ORDER API
====================================
*/

module.exports = {
  createOrder,
  completePaidOrder,
  failOrder,
  getOrders,
  getOrderById,
};