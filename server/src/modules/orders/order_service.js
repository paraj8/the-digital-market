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
  async (orderId) => {
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

    if (
      order.paymentStatus ===
      "paid"
    ) {
      return order;
    }

    /*
    ====================================
    VALIDATE INVENTORY AGAIN
    ====================================

    Stock may have changed while
    customer was completing payment.
    */

    await validateOrderInventory(
      order
    );

    /*
    ====================================
    REDUCE STOCK
    ====================================
    */

    await reduceOrderStock(
      order
    );

    /*
    ====================================
    UPDATE COUPON USAGE
    ====================================
    */

    if (order.coupon) {
      await incrementCouponUsage(
        order.coupon
      );
    }

    /*
    ====================================
    CART CLEANUP
    ====================================
    */

    await cleanupCartAfterOrder(
      order
    );

    /*
    ====================================
    UPDATE ORDER STATUS
    ====================================
    */

    order.paymentStatus =
      "paid";

    order.orderStatus =
      "confirmed";

    await order.save();

    return order;
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