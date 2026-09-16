const mongoose = require("mongoose")

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
      trim: true,
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
      trim: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],

    // Pricing
    costPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    salePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    gstRate: {
      type: Number,
      default: 18,
      min: 0,
      max: 100,
    },

    gstIncluded: {
      type: Boolean,
      default: true,
    },

    // Inventory
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },

    trackInventory: {
      type: Boolean,
      default: true,
    },

    allowBackorder: {
      type: Boolean,
      default: false,
    },

    // Shipping
    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    length: {
      type: Number,
      default: 0,
      min: 0,
    },

    width: {
      type: Number,
      default: 0,
      min: 0,
    },

    height: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingRequired: {
      type: Boolean,
      default: true,
    },

    shippingClass: {
      type: String,
      enum: ["light", "medium", "heavy"],
      default: "light",
    },

    // Product Type
    isDigital: {
      type: Boolean,
      default: false,
    },

    downloadUrl: {
      type: String,
      default: "",
    },

    // Tax & Compliance
    hsnCode: {
      type: String,
      default: "",
    },

    // Product Status
    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    returnable: {
      type: Boolean,
      default: false,
    },

    codAvailable: {
      type: Boolean,
      default: true,
    },

    // Tags
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Analytics
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    salesCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Ratings
    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // SEO
    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Search Index
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
});

// Useful Query Indexes
productSchema.index({
  category: 1,
});

productSchema.index({
  isFeatured: 1,
});

productSchema.index({
  isActive: 1,
});

productSchema.index({
  price: 1,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);