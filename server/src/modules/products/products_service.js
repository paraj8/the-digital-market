const Product = require("./products_model");
const slugify = require("slugify");

const generateSKU = () => {
  return (
    "PRD-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  );
};

const createProduct = async (data) => {
  const slug = slugify(data.title, {
    lower: true,
    strict: true,
  });

  const existingProduct =
    await Product.findOne({ slug });

  if (existingProduct) {
    throw new Error(
      "Product already exists"
    );
  }

  const product = await Product.create({
    ...data,
    slug,
    sku: generateSKU(),
  });

  return product;
};

const getAllProducts = async () => {
  return await Product.find()
    .populate("category")
    .sort({
      createdAt: -1,
    });
};

const getProductById = async (id) => {
  const product =
    await Product.findById(id)
      .populate("category");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};