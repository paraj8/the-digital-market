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

// New function to get all products with pagination and filtering

const getAllProducts = async (query) => {
  const {
    search,
    category,
    featured,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = query;

  const filters = {};

  // Search
  if (search) {
    filters.$text = {
      $search: search,
    };
  }

  // Category
  if (category) {
    filters.category = category;
  }

  // Featured
  if (featured === "true") {
    filters.isFeatured = true;
  }

  // Price Filter
  if (minPrice || maxPrice) {
    filters.price = {};

    if (minPrice) {
      filters.price.$gte =
        Number(minPrice);
    }

    if (maxPrice) {
      filters.price.$lte =
        Number(maxPrice);
    }
  }

  const currentPage = Number(page);
  const pageLimit = Number(limit);

  const total =
    await Product.countDocuments(
      filters
    );

  const products = await Product.find(
    filters
  )
    .populate("category")
    .sort({
      createdAt: -1,
    })
    .skip(
      (currentPage - 1) * pageLimit
    )
    .limit(pageLimit);

  return {
    products,
    pagination: {
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(
        total / pageLimit
      ),
    },
  };
};

// New function to get a product by ID

const getProductById = async (id) => {
  const product =
    await Product.findById(id)
      .populate("category");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// New function to get a product by slug

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    slug,
  }).populate("category");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// New function to update a product

const updateProduct = async (
  id,
  data
) => {
  const product =
    await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (data.title) {
    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });
  }

  return await Product.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).populate("category");
};

// New function to delete a product

const deleteProduct = async (id) => {
  const product =
    await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);

  return {
    message:
      "Product deleted successfully",
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};