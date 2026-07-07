const productService = require(
  "./products_service"
);

// Controller functions
const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await productService.createProduct(
        req.body
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

// New function to get all products with pagination and filtering
const getAllProducts = async (
  req,
  res
) => {
  try {
    const result =
      await productService.getAllProducts(
        req.query
      );

    res.status(200).json({
      success: true,
      data: result.products,
      pagination:
        result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// New function to get a product by ID
const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await productService.getProductById(
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

// New functions for update and delete

const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
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

// New function for deleting a product

const deleteProduct = async (
  req,
  res
) => {
  try {
    const result =
      await productService.deleteProduct(
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

// New function to get a product by slug

const getProductBySlug = async (
  req,
  res
) => {
  try {
    const product =
      await productService.getProductBySlug(
        req.params.slug
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

// New function to get filter options for products
const getFilterOptions = async (
  req,
  res
) => {
  try {
    const options =
      await productService.getFilterOptions();

    res.status(200).json({
      success: true,
      data: options,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getFilterOptions,
  updateProduct,
  deleteProduct,
  getProductBySlug,
};