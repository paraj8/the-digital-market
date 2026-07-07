const express = require("express");

const router = express.Router();

const productController = require(
  "./products_controller"
);

// Special routes
router.get("/filter/options", productController.getFilterOptions);
router.get("/slug/:slug", productController.getProductBySlug);

// CRUD
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;