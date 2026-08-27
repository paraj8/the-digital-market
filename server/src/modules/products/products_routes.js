const express = require("express");

const router = express.Router();

const productController = require(
  "./products_controller"
);

// =========================================
// CUSTOMER / STOREFRONT ROUTES
// =========================================

// Filter options
router.get(
  "/filter/options",
  productController.getFilterOptions
);

// Product by slug
router.get(
  "/slug/:slug",
  productController.getProductBySlug
);

// Get active products
router.get(
  "/",
  productController.getAllProducts
);

// Get product by ID
router.get(
  "/:id",
  productController.getProductById
);

module.exports = router;