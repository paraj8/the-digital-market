const Product = require("./products_model");
const slugify = require("slugify");

const {
  uploadImage,
  deleteImage,
} = require("../../services/cloudinary_service");

const generateSKU = () => {
  return (
    "PRD-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  );
};

/* =========================================
   CREATE PRODUCT
========================================= */

const createProduct = async (
  data,
  files = []
) => {
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

  let images = [];

  if (files.length > 0) {
    const uploadedImages =
      await Promise.all(
        files.map((file) =>
          uploadImage(
            file.buffer,
            "the-digital-market/products"
          )
        )
      );

    /*
     * IMPORTANT:
     * Product schema expects:
     *
     * {
     *   url: "...",
     *   publicId: "..."
     * }
     */

    images = uploadedImages.map(
      (image) => ({
        url: image.url,
        publicId: image.publicId,
      })
    );
  }

  const product = await Product.create({
    ...data,
    slug,
    sku: generateSKU(),
    images,
  });

  return product;
};

/* =========================================
   GET ALL PRODUCTS
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
      filters.price.$gte =
        Number(minPrice);
    }

    if (maxPrice) {
      filters.price.$lte =
        Number(maxPrice);
    }
  }

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
   GET PRODUCT BY ID
========================================= */

const getProductById = async (id) => {
  const product =
    await Product.findById(id)
      .populate("category");

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  return product;
};

/* =========================================
   GET PRODUCT BY SLUG
========================================= */

const getProductBySlug = async (
  slug
) => {
  const product =
    await Product.findOne({
      slug,
    }).populate("category");

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  return product;
};

/* =========================================
   UPDATE PRODUCT
========================================= */

const updateProduct = async (
  id,
  data,
  files = []
) => {
  const product =
    await Product.findById(id);

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  /*
   * Generate slug when title changes
   */
  if (data.title) {
    data.slug = slugify(
      data.title,
      {
        lower: true,
        strict: true,
      }
    );
  }

  /*
   * =====================================
   * CATEGORY
   * =====================================
   *
   * Because products are populated before
   * reaching the frontend, category can
   * sometimes come back as:
   *
   * {
   *   _id: "...",
   *   name: "Electronics"
   * }
   *
   * Never send that object to MongoDB.
   */

  if (
    data.category &&
    typeof data.category === "object"
  ) {
    if (data.category._id) {
      data.category =
        data.category._id;
    } else {
      delete data.category;
    }
  }

  /*
   * =====================================
   * IMAGES
   * =====================================
   *
   * If new files are uploaded:
   *
   * 1. Upload new images
   * 2. Delete old Cloudinary images
   * 3. Save new image objects
   *
   * If no new files are uploaded,
   * keep existing images.
   */

  if (files.length > 0) {
    const uploadedImages =
      await Promise.all(
        files.map((file) =>
          uploadImage(
            file.buffer,
            "the-digital-market/products"
          )
        )
      );

    const newImages =
      uploadedImages.map(
        (image) => ({
          url: image.url,
          publicId: image.publicId,
        })
      );

    /*
     * Delete old Cloudinary images
     */
    if (
      product.images &&
      product.images.length > 0
    ) {
      await Promise.all(
        product.images.map(
          async (image) => {
            if (image.publicId) {
              try {
                await deleteImage(
                  image.publicId
                );
              } catch (error) {
                console.error(
                  "Failed to delete old Cloudinary image:",
                  error.message
                );
              }
            }
          }
        )
      );
    }

    data.images = newImages;
  }

  /*
   * Never allow the frontend to send
   * a raw image string.
   */
  if (
    typeof data.images === "string"
  ) {
    delete data.images;
  }

  const updatedProduct =
    await Product.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category");

  return updatedProduct;
};

/* =========================================
   DELETE PRODUCT
========================================= */

const deleteProduct = async (id) => {
  const product =
    await Product.findById(id);

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  /*
   * Delete product images from
   * Cloudinary before deleting product.
   */
  if (
    product.images &&
    product.images.length > 0
  ) {
    await Promise.all(
      product.images.map(
        async (image) => {
          if (image.publicId) {
            try {
              await deleteImage(
                image.publicId
              );
            } catch (error) {
              console.error(
                "Failed to delete Cloudinary image:",
                error.message
              );
            }
          }
        }
      )
    );
  }

  await Product.findByIdAndDelete(id);

  return {
    message:
      "Product deleted successfully",
  };
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

  const categoryDetails =
    await Product.find({
      category: {
        $in: categories,
      },
    }).distinct("category");

  const Category = require(
    "../categories/categories_model"
  );

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
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFilterOptions,
};