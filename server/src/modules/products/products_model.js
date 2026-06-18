const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    brand: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    salePrice: {
      type: Number,
      default: 0,
    },

    gstRate: {
      type: Number,
      default: 18,
    },

    stock: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: 0,
    },

    length: {
      type: Number,
      default: 0,
    },

    width: {
      type: Number,
      default: 0,
    },

    height: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    salesCount: {
      type: Number,
      default: 0,
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    isDigital: {
      type: Boolean,
      default: false,
    },

    downloadUrl: {
      type: String,
      default: "",
    },

    hsnCode: {
  type: String,
  default: "",
},

shippingClass: {
  type: String,
  enum: [
    "light",
    "medium",
    "heavy",
  ],
  default: "light",
},

returnable: {
  type: Boolean,
  default: false,
},

codAvailable: {
  type: Boolean,
  default: true,
},

lowStockThreshold: {
  type: Number,
  default: 5,
},

ratingsAverage: {
  type: Number,
  default: 0,
},

ratingsCount: {
  type: Number,
  default: 0,
},

shippingRequired: {
  type: Boolean,
  default: true,
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);