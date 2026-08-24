const categoryService = require("./categories_service");

// =====================================
// CREATE CATEGORY
// =====================================

const createCategory = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.createCategory(
        req.body,
        req.file?.buffer
      );

    res.status(201).json({
      success: true,
      message:
        "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET CATEGORY BY ID
// =====================================

const getCategoryById = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.getCategoryById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL CATEGORIES
// =====================================

const getAllCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await categoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// UPDATE CATEGORY
// =====================================

const updateCategory = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.updateCategory(
        req.params.id,
        req.body,
        req.file?.buffer
      );

    res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// DELETE CATEGORY
// =====================================

const deleteCategory = async (
  req,
  res
) => {
  try {
    const result =
      await categoryService.deleteCategory(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// EXPORT CONTROLLERS
// =====================================

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};