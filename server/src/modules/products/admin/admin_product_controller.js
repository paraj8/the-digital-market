const adminProductService = require(
  "./admin_product_service"
);

/* =========================================
   GET ALL PRODUCTS
========================================= */

const getAllProducts = async (
  req,
  res
) => {
  try {
    const result =
      await adminProductService.getAllProducts(
        req.query
      );

    res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   GET PRODUCT BY ID
========================================= */

const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await adminProductService.getProductById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   CREATE PRODUCT
========================================= */

const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await adminProductService.createProduct(
        req.body,
        req.files
      );

    res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   UPDATE PRODUCT
========================================= */

const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await adminProductService.updateProduct(
        req.params.id,
        req.body,
        req.files
      );

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================
   DELETE PRODUCT
========================================= */

const deleteProduct = async (
  req,
  res
) => {
  try {
    const result =
      await adminProductService.deleteProduct(
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};