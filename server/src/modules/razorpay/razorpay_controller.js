const Order = require("../orders/order_model");
const orderService = require("../orders/order_service");
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  verifyWebhookSignature,
} = require("./razorpay_service");

const createOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }
    const data = await createRazorpayOrder({
      orderId,
      userId: req.user.id,
    });
    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const order = await verifyRazorpayPayment({
      orderId: req.body.orderId,
      userId: req.user.id,
      razorpayOrderId: req.body.razorpay_order_id,
      razorpayPaymentId: req.body.razorpay_payment_id,
      razorpaySignature: req.body.razorpay_signature,
    });
    return res.status(200).json({
      success: true,
      message: "Razorpay payment verified successfully",
      data: {
        application_order_status: order.orderStatus,
        application_payment_status: order.paymentStatus,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Razorpay payment verification failed",
    });
  }
};

const markFailed = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.body.orderId,
      user: req.user.id,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (order.paymentStatus !== "paid") {
      await orderService.failOrder(
        order._id,
        req.body.reason || "Razorpay payment failed or was cancelled"
      );
    }
    return res.status(200).json({
      success: true,
      message: "Payment failure recorded",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to record payment status",
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user.id,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        application_order_status: order.orderStatus,
        application_payment_status: order.paymentStatus,
        razorpay_order_id: order.razorpayOrderId,
        razorpay_payment_id: order.razorpayPaymentId,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to get payment status",
    });
  }
};

const webhook = async (req, res) => {
  try {
    verifyWebhookSignature(req.rawBody, req.headers["x-razorpay-signature"]);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid webhook signature",
    });
  }

  const event = req.body?.event;
  const entity = req.body?.payload?.payment?.entity;
  if (!entity) {
    return res.status(200).json({ success: true });
  }

  try {
    const applicationOrderId =
      entity.notes?.application_order_id ||
      null;
    const order = applicationOrderId
      ? await Order.findById(applicationOrderId)
      : await Order.findOne({ razorpayOrderId: entity.order_id });

    if (!order) {
      return res.status(200).json({ success: true });
    }

    if (event === "payment.captured") {
      if (
        entity.currency !== "INR" ||
        Number(entity.amount) !==
          Math.round(order.totalAmount * 100)
      ) {
        throw new Error(
          "Webhook payment amount or currency does not match the order"
        );
      }
      await orderService.completePaidOrder(order._id, {
        provider: "Razorpay",
        transactionId: entity.id,
        razorpayOrderId: entity.order_id,
        razorpayPaymentId: entity.id,
      });
    }

    if (event === "payment.failed") {
      if (order.paymentStatus !== "paid") {
        await orderService.failOrder(
          order._id,
          entity.error_description || "Razorpay payment failed"
        );
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay webhook processing error:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  markFailed,
  getStatus,
  webhook,
};
