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
      /*
      ====================================
      USER
      ====================================
      */

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      /*
      ====================================
      ORDER ITEMS
      ====================================
      */

      items: [orderItemSchema],

      /*
      ====================================
      SHIPPING ADDRESS
      ====================================
      */

      shippingAddress: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },

      /*
      ====================================
      COUPON
      ====================================
      */

      coupon: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },

      /*
      ====================================
      AMOUNTS
      ====================================
      */

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

      /*
      ====================================
      CHECKOUT MODE
      ====================================

      cart:
      Customer checked out the
      entire shopping cart.

      buyNow:
      Customer purchased a specific
      product directly.
      */

      checkoutMode: {
        type: String,
        enum: [
          "cart",
          "buyNow",
        ],
        default: "cart",
      },

      /*
      ====================================
      PAYMENT METHOD
      ====================================
      */

      paymentMethod: {
        type: String,
        enum: ["CashFree"],
        default: "CashFree",
      },

      /*
      ====================================
      PAYMENT STATUS
      ====================================
      */

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

      /*
      ====================================
      ORDER STATUS
      ====================================
      */

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

      /*
      ====================================
      NOTES
      ====================================
      */

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