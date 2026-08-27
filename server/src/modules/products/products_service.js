const Product = require("./products_model");

/* =========================================
   GET ALL ACTIVE PRODUCTS
========================================= */

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

  if (search) {
    filters.$text = {
      $search: search,
    };
  }

  if (category) {
    filters.category = category;
  }

  if (brand) {
    filters.brand = brand;
  }

  if (featured === "true") {
    filters.isFeatured = true;
  }

  if (deals === "true") {
    filters.salePrice = {
      $gt: 0,
    };
  }

  if (inStock === "true") {
    filters.stock = {
      $gt: 0,
    };
  }

  if (returnable === "true") {
    filters.returnable = true;
  }

  if (cod === "true") {
    filters.codAvailable = true;
  }

  if (digital === "true") {
    filters.isDigital = true;
  }

  if (rating) {
    filters.ratingsAverage = {
      $gte: Number(rating),
    };
  }

  if (minPrice || maxPrice) {
    filters.price = {};

    if (minPrice) {
      filters.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filters.price.$lte = Number(maxPrice);
    }
  }

  let sortOption = {
    createdAt: -1,
  };

  switch (sort) {
    case "priceLow":
      sortOption = { price: 1 };
      break;

    case "priceHigh":
      sortOption = { price: -1 };
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

  const currentPage = Math.max(
    Number(page) || 1,
    1
  );

  const pageLimit = Math.min(
    Math.max(Number(limit) || 12, 1),
    100
  );

  const total =
    await Product.countDocuments(filters);

  const products =
    await Product.find(filters)
      .populate("category")
      .sort(sortOption)
      .skip(
        (currentPage - 1) *
          pageLimit
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

/* =========================================
   GET ACTIVE PRODUCT BY ID
========================================= */

const getProductById = async (id) => {
  const product =
    await Product.findOne({
      _id: id,
      isActive: true,
    }).populate("category");

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  return product;
};

/* =========================================
   GET ACTIVE PRODUCT BY SLUG
========================================= */

const getProductBySlug = async (
  slug
) => {
  const product =
    await Product.findOne({
      slug,
      isActive: true,
    }).populate("category");

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  return product;
};

/* =========================================
   GET FILTER OPTIONS
========================================= */

const getFilterOptions = async () => {
  const brands =
    await Product.distinct(
      "brand",
      {
        isActive: true,
        brand: {
          $ne: "",
        },
      }
    );

  const categories =
    await Product.distinct(
      "category",
      {
        isActive: true,
      }
    );

  const Category = require(
    "../categories/categories_model"
  );

  const categoryList =
    await Category.find({
      _id: {
        $in: categories,
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
            max: Math.min(
              price[0].max,
              150000
            ),
          }
        : {
            min: 100,
            max: 150000,
          },

    ratings: [4, 3, 2, 1],

    sortOptions: [
      {
        label: "Newest",
        value: "newest",
      },
      {
        label:
          "Price: Low to High",
        value: "priceLow",
      },
      {
        label:
          "Price: High to Low",
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
  getAllProducts,
  getProductById,
  getProductBySlug,
  getFilterOptions,
};