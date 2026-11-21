const crypto = require("crypto");
const Razorpay = require("razorpay");

const Order = require("../orders/order_model");
const orderService = require("../orders/order_service");

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const createRazorpayOrder = async ({
  orderId,
  userId,
}) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }
  if (order.paymentMethod !== "Razorpay") {
    throw new Error("This order does not use Razorpay");
  }
  if (order.paymentStatus === "paid") {
    throw new Error("This order is already paid");
  }
  if (!Number.isFinite(order.totalAmount) || order.totalAmount <= 0) {
    throw new Error("Invalid order amount");
  }

  if (order.razorpayOrderId) {
    const existing = await getRazorpay().orders.fetch(order.razorpayOrderId);
    if (
      existing &&
      existing.status !== "paid" &&
      Number(existing.amount) === Math.round(order.totalAmount * 100)
    ) {
      return {
        keyId: process.env.RAZORPAY_KEY_ID,
        razorpayOrderId: existing.id,
        amount: existing.amount,
        currency: existing.currency || "INR",
      };
    }
  }

  const razorpayOrder = await getRazorpay().orders.create({
    amount: Math.round(order.totalAmount * 100),
    currency: "INR",
    receipt: String(order._id),
    notes: {
      application_order_id: String(order._id),
      user_id: String(order.user),
    },
  });

  order.razorpayOrderId = razorpayOrder.id;
  order.paymentProvider = "Razorpay";
  await order.save();

  return {
    keyId: process.env.RAZORPAY_KEY_ID,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  };
};

const secureEqual = (left, right) => {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
};

const verifyPaymentSignature = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new Error("Incomplete Razorpay payment response");
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  if (!secureEqual(expected, razorpaySignature)) {
    throw new Error("Invalid Razorpay payment signature");
  }
};

const verifyRazorpayPayment = async ({
  orderId,
  userId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.razorpayOrderId !== razorpayOrderId) {
    throw new Error("Razorpay order does not belong to this checkout");
  }

  verifyPaymentSignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  const razorpay = getRazorpay();
  const [razorpayOrder, payment] = await Promise.all([
    razorpay.orders.fetch(razorpayOrderId),
    razorpay.payments.fetch(razorpayPaymentId),
  ]);

  if (payment.order_id !== razorpayOrderId) {
    throw new Error("Razorpay payment does not belong to this order");
  }
  if (
    Number(razorpayOrder.amount) !==
    Math.round(order.totalAmount * 100)
  ) {
    throw new Error("Razorpay payment amount does not match the order");
  }
  if (
    Number(payment.amount) !==
    Math.round(order.totalAmount * 100)
  ) {
    throw new Error("Razorpay payment amount does not match the order");
  }
  if (razorpayOrder.currency !== "INR" || payment.currency !== "INR") {
    throw new Error("Invalid Razorpay payment currency");
  }
  if (!["captured", "authorized"].includes(payment.status)) {
    throw new Error("Razorpay payment is not successful");
  }

  const completed = await orderService.completePaidOrder(orderId, {
    provider: "Razorpay",
    transactionId: razorpayPaymentId,
    razorpayOrderId,
    razorpayPaymentId,
  });

  return completed;
};

const verifyWebhookSignature = (rawBody, signature) => {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    throw new Error("Razorpay webhook secret is not configured");
  }
  if (!signature) {
    throw new Error("Missing Razorpay webhook signature");
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (!secureEqual(expected, signature)) {
    throw new Error("Invalid Razorpay webhook signature");
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment,
  verifyWebhookSignature,
};
