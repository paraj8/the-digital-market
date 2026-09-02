const Order = require(
  "../order_model"
);

/*
====================================
MARK ORDER AS PAID
====================================

Used when CashFree confirms
successful payment.
====================================
*/

const markOrderAsPaid =
  async (
    orderId
  ) => {
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
    --------------------------------
    DON'T PROCESS PAID ORDER AGAIN
    --------------------------------
    */

    if (
      order.paymentStatus ===
      "paid"
    ) {
      return order;
    }

    order.paymentStatus =
      "paid";

    order.orderStatus =
      "confirmed";

    await order.save();

    return order;
  };

/*
====================================
MARK ORDER AS FAILED
====================================

Used when CashFree confirms
that the payment failed.

IMPORTANT:

We DO NOT:

- reduce stock
- increase sales
- update coupon usage
- clear cart
====================================
*/

const markOrderAsFailed =
  async (
    orderId,
    reason = ""
  ) => {


    /*
    --------------------------------
    GET ORDER
    --------------------------------
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
    --------------------------------
    DON'T CHANGE A PAID ORDER
    --------------------------------
    */

    if (
      order.paymentStatus ===
      "paid"
    ) {


      return order;
    }

    /*
    --------------------------------
    UPDATE PAYMENT STATUS
    --------------------------------
    */

    order.paymentStatus =
      "failed";

    order.orderStatus =
      "pending";

    /*
    --------------------------------
    SAVE FAILURE REASON
    --------------------------------
    */

    if (reason) {
      order.notes = reason;
    }



    /*
    --------------------------------
    SAVE ORDER
    --------------------------------
    */

    await order.save();



    return order;
  };

/*
====================================
EXPORT PAYMENT SERVICES
====================================
*/

module.exports = {
  markOrderAsPaid,
  markOrderAsFailed,
};