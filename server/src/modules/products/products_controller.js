const productService = require(
  "./products_service"
);

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

const getAllProducts = async (
  req,
  res
) => {
  try {
    const products =
      await productService.getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};