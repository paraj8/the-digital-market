const mongoose = require("mongoose");

const orderItemSchema =
  new mongoose.Schema(
    {
      product: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        default: "",
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      subtotal: {
        type: Number,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      items: [orderItemSchema],

      shippingAddress: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },

      coupon: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },

      subtotal: {
        type: Number,
        required: true,
      },

      discount: {
        type: Number,
        default: 0,
      },

      shippingCharge: {
        type: Number,
        default: 0,
      },

      tax: {
        type: Number,
        default: 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "cod",
          "razorpay",
          "stripe",
        ],
        default: "cod",
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
          "refunded",
        ],
        default: "pending",
      },

      orderStatus: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
        ],
        default: "pending",
      },

      notes: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Order",
  orderSchema
);