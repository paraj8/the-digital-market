const mongoose = require("mongoose");

const cartSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      product: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      variantId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },

      variantAttributes: {
        type: Map,
        of: String,
        default: {},
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
    {
      timestamps: true,
    }
  );

// One cart line per product and selected variant
cartSchema.index(
  {
    user: 1,
    product: 1,
    variantId: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Cart",
  cartSchema
);