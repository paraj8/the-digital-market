const express = require("express");

const router = express.Router();

const adminProductController = require(
  "./admin_product_controller"
);

const upload = require(
  "../../../middleware/upload_middleware"
);

// =========================================
// ADMIN PRODUCT ROUTES
// =========================================

// Get all products
router.get(
  "/",
  adminProductController.getAllProducts
);

// Get product by ID
router.get(
  "/:id",
  adminProductController.getProductById
);

// Create product
router.post(
  "/",
  upload.array("images", 8),
  adminProductController.createProduct
);

// Update product
router.put(
  "/:id",
  upload.array("images", 8),
  adminProductController.updateProduct
);

// Delete product
router.delete(
  "/:id",
  adminProductController.deleteProduct
);

module.exports = router;