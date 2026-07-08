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

const getAllProducts = async (query) => {
  const {
    search,
    category,
    brand,
    featured,
    deals,
    inStock,
    returnable,
    cod,
    digital,
    rating,
    sort,
    minPrice,
    maxPrice,
    page = 1,
    limit = 12,
  } = query;

  const filters = {
    isActive: true,
  };

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

  // Brand
  if (brand) {
    filters.brand = brand;
  }

  // Featured
  if (featured === "true") {
    filters.isFeatured = true;
  }

  // Deals
  if (deals === "true") {
    filters.salePrice = {
      $gt: 0,
    };
  }

  // In Stock
  if (inStock === "true") {
    filters.stock = {
      $gt: 0,
    };
  }

  // Returnable
  if (returnable === "true") {
    filters.returnable = true;
  }

  // Cash on Delivery
  if (cod === "true") {
    filters.codAvailable = true;
  }

  // Digital Product
  if (digital === "true") {
    filters.isDigital = true;
  }

  // Rating
  if (rating) {
    filters.ratingsAverage = {
      $gte: Number(rating),
    };
  }

  // Price
  if (minPrice || maxPrice) {
    filters.price = {};

    if (minPrice) {
      filters.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filters.price.$lte = Number(maxPrice);
    }
  }

  // Sorting
  let sortOption = {
    createdAt: -1,
  };

  switch (sort) {
    case "priceLow":
      sortOption = {
        price: 1,
      };
      break;

    case "priceHigh":
      sortOption = {
        price: -1,
      };
      break;

    case "featured":
      sortOption = {
        isFeatured: -1,
        createdAt: -1,
      };
      break;

    case "rating":
      sortOption = {
        ratingsAverage: -1,
      };
      break;

    case "bestSelling":
      sortOption = {
        salesCount: -1,
      };
      break;

    case "newest":
      sortOption = {
        createdAt: -1,
      };
      break;

    case "oldest":
      sortOption = {
        createdAt: 1,
      };
      break;

    case "name":
      sortOption = {
        title: 1,
      };
      break;

    default:
      sortOption = {
        createdAt: -1,
      };
  }

  const currentPage = Number(page);
  const pageLimit = Number(limit);

  const total =
    await Product.countDocuments(filters);

  const products =
    await Product.find(filters)
      .populate("category")
      .sort(sortOption)
      .skip((currentPage - 1) * pageLimit)
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

// New function to get filter options for products
const getFilterOptions = async () => {
  const brands = await Product.distinct("brand", {
    isActive: true,
    brand: {
      $ne: "",
    },
  });

  const categories = await Product.distinct(
    "category",
    {
      isActive: true,
    }
  );

  const categoryDetails =
    await Product.find({
      category: {
        $in: categories,
      },
    }).distinct("category");

  const Category = require("../categories/categories_model");

  const categoryList =
    await Category.find({
      _id: {
        $in: categoryDetails,
      },
      isActive: true,
    })
      .select("name slug")
      .sort({
        sortOrder: 1,
        name: 1,
      });

  const price =
    await Product.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $group: {
          _id: null,
          min: {
            $min: "$price",
          },
          max: {
            $max: "$price",
          },
        },
      },
    ]);

  return {
    brands: brands.sort(),

    categories: categoryList,

    priceRange:
      price.length > 0
        ? {
            min: 100,
            max: Math.min(price[0].max,50000),
          }
        : {
            min: 100,
            max: 50000,
          },

    ratings: [4, 3, 2, 1],

    sortOptions: [
      {
        label: "Newest",
        value: "newest",
      },
      {
        label: "Price: Low to High",
        value: "priceLow",
      },
      {
        label: "Price: High to Low",
        value: "priceHigh",
      },
      {
        label: "Highest Rated",
        value: "rating",
      },
      {
        label: "Best Selling",
        value: "bestSelling",
      },
      {
        label: "Featured",
        value: "featured",
      },
    ],
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFilterOptions,
};