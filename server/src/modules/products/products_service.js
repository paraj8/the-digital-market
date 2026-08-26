const Product = require("./products_model");
const slugify = require("slugify");

const {
  uploadImage,
  deleteImage,
} = require("../../services/cloudinary_service");

/* =========================================
   GENERATE SKU
========================================= */

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

  /*
   * Upload product images to Cloudinary.
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

    images = uploadedImages.map(
      (image) => ({
        url: image.url,
        publicId: image.publicId,
      })
    );
  }

  /*
   * Create product.
   */
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

  /* =======================================
     SLUG
  ======================================= */

  if (data.title) {
    data.slug = slugify(
      data.title,
      {
        lower: true,
        strict: true,
      }
    );
  }

  /* =======================================
     CATEGORY
  ======================================= */

  /*
   * Multipart/form-data normally sends
   * category as a string.
   *
   * But this also safely handles a
   * populated category object.
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

  /* =======================================
     EXISTING IMAGES
  ======================================= */

  let existingImages = product.images || [];

  /*
   * The frontend sends:
   *
   * existingImages:
   * [
   *   {
   *     _id,
   *     url,
   *     publicId
   *   }
   * ]
   *
   * These are the images the user wants
   * to KEEP.
   */

  if (
    data.existingImages !== undefined
  ) {
    try {
      let parsedImages =
        data.existingImages;

      /*
       * Multer/body-parser normally gives
       * us a string because this is
       * multipart/form-data.
       */
      if (
        typeof parsedImages === "string"
      ) {
        parsedImages =
          JSON.parse(parsedImages);
      }

      if (
        Array.isArray(parsedImages)
      ) {
        existingImages =
          parsedImages
            .filter(
              (image) =>
                image &&
                image.url &&
                image.publicId
            )
            .map((image) => ({
              ...(image._id
                ? {
                    _id: image._id,
                  }
                : {}),
              url: image.url,
              publicId:
                image.publicId,
            }));
      }
    } catch (error) {
      throw new Error(
        "Invalid existingImages data"
      );
    }

    /*
     * Remove this temporary field so
     * Mongoose does not try to save it.
     */
    delete data.existingImages;
  }

  /* =======================================
     DELETE REMOVED CLOUDINARY IMAGES
  ======================================= */

  /*
   * Compare database images with the
   * images the frontend wants to keep.
   *
   * Anything missing from existingImages
   * was removed by the user.
   */

  const keptPublicIds = new Set(
    existingImages
      .map(
        (image) => image.publicId
      )
      .filter(Boolean)
  );

  const removedImages =
    (product.images || []).filter(
      (image) =>
        image.publicId &&
        !keptPublicIds.has(
          image.publicId
        )
    );

  if (removedImages.length > 0) {
    await Promise.all(
      removedImages.map(
        async (image) => {
          try {
            await deleteImage(
              image.publicId
            );
          } catch (error) {
            /*
             * Do not fail the entire
             * product update if Cloudinary
             * deletion fails.
             */
            console.error(
              "Failed to delete removed Cloudinary image:",
              error.message
            );
          }
        }
      )
    );
  }

  /* =======================================
     UPLOAD NEW IMAGES
  ======================================= */

  let newImages = [];

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

    newImages =
      uploadedImages.map(
        (image) => ({
          url: image.url,
          publicId:
            image.publicId,
        })
      );
  }

  /* =======================================
     FINAL IMAGE ARRAY
  ======================================= */

  /*
   * Keep the existing images that the
   * user did not remove, then append
   * newly uploaded images.
   */

  data.images = [
    ...existingImages,
    ...newImages,
  ];

  /* =======================================
     SECURITY CLEANUP
  ======================================= */

  /*
   * Never allow the frontend to directly
   * overwrite these server-controlled
   * fields.
   */

  delete data._id;
  delete data.sku;
  delete data.views;
  delete data.salesCount;
  delete data.ratingsAverage;
  delete data.ratingsCount;
  delete data.createdAt;
  delete data.updatedAt;

  /* =======================================
     UPDATE DATABASE
  ======================================= */

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
   * Cloudinary before deleting
   * the product.
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

/* =========================================
   EXPORTS
========================================= */

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getFilterOptions,
};
