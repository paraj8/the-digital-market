const express = require("express");

const router = express.Router();

const categoryController = require(
  "./categories_controller"
);

const upload = require(
  "../../middleware/upload_middleware"
);

// =====================================
// CREATE CATEGORY
// =====================================

router.post(
  "/",
  upload.single("image"),
  categoryController.createCategory
);

// =====================================
// GET ALL CATEGORIES
// =====================================

router.get(
  "/",
  categoryController.getAllCategories
);

// =====================================
// GET CATEGORY BY ID
// =====================================

router.get(
  "/:id",
  categoryController.getCategoryById
);

// =====================================
// UPDATE CATEGORY
// =====================================

router.put(
  "/:id",
  upload.single("image"),
  categoryController.updateCategory
);

// =====================================
// DELETE CATEGORY
// =====================================

router.delete(
  "/:id",
  categoryController.deleteCategory
);

module.exports = router;