
const {
  createCashfreeOrder,
  getCashfreePaymentStatus,
} = require("./cashfree_service");

/*
====================================
CREATE CASHFREE PAYMENT ORDER
====================================
*/

const createPaymentOrder = async (
  req,
  res
) => {
  try {
    const {
      orderId,
      amount,
      customer,
      returnUrl,
      notifyUrl,
    } = req.body;

    if (
      !orderId ||
      !amount ||
      !customer
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order ID, amount and customer details are required",
      });
    }

    if (
      !customer.id ||
      !customer.name ||
      !customer.email ||
      !customer.phone
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Complete customer details are required",
      });
    }

    const orderAmount =
      Number(amount);

    if (
      !Number.isFinite(orderAmount) ||
      orderAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order amount",
      });
    }

    const cashfreeOrder =
      await createCashfreeOrder({
        orderId,
        amount: orderAmount,
        customer,
        returnUrl,
        notifyUrl,
      });

    return res.status(201).json({
      success: true,
      message:
        "Cashfree payment order created successfully",
      data: cashfreeOrder,
    });
  } catch (error) {
    console.error(
      "Create Cashfree payment order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create Cashfree payment order",
    });
  }
};

/*
====================================
GET CASHFREE PAYMENT STATUS
====================================
*/

const getPaymentStatus = async (
  req,
  res
) => {
  try {
    const { orderId } =
      req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message:
          "Order ID is required",
      });
    }

    const paymentStatus =
      await getCashfreePaymentStatus(
        orderId
      );

    return res.status(200).json({
      success: true,
      message:
        "Cashfree payment status fetched successfully",
      data: paymentStatus,
    });
  } catch (error) {
    console.error(
      "Get Cashfree payment status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to get Cashfree payment status",
    });
  }
};

module.exports = {
  createPaymentOrder,
  getPaymentStatus,
};

