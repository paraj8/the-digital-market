const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },

    isVerifiedPurchase: {
      type: Boolean,
      required: true,
      default: true,
    },

    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index(
  { user: 1, product: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);
