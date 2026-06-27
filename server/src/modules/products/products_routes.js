const express = require("express");

const router = express.Router();

const productController = require(
  "./products_controller"
);

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;