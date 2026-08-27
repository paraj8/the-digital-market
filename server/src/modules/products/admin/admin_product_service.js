const Product = require(
  "../products_model"
);

const slugify = require(
  "slugify"
);

const {
  uploadImage,
  deleteImage,
} = require(
  "../../../services/cloudinary_service"
);

/* =========================================
   GENERATE SKU
========================================= */

const generateSKU = async () => {
  let sku;
  let exists = true;

  while (exists) {
    sku =
      "PRD-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    exists = await Product.exists({
      sku,
    });
  }

  return sku;
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
    await Product.findOne({
      slug,
    });

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

    images =
      uploadedImages.map(
        (image) => ({
          url: image.url,
          publicId: image.publicId,
        })
      );
  }

  const sku =
    await generateSKU();

  const product =
    await Product.create({
      ...data,
      slug,
      sku,
      images,
    });

  return product;
};

/* =========================================
   GET ALL PRODUCTS - ADMIN
========================================= */

const getAllProducts = async (
  query
) => {
  const {
    search,
    category,
    brand,
    status,
    stockStatus,
    page = 1,
    limit = 50,
  } = query;

  const filters = {};

  /* -----------------------------------------
     SEARCH
  ----------------------------------------- */

  if (search) {
    filters.$text = {
      $search: search,
    };
  }

  /* -----------------------------------------
     CATEGORY
  ----------------------------------------- */

  if (category) {
    filters.category = category;
  }

  /* -----------------------------------------
     BRAND
  ----------------------------------------- */

  if (brand) {
    filters.brand = brand;
  }

  /* -----------------------------------------
     STATUS
  ----------------------------------------- */

  if (status === "active") {
    filters.isActive = true;
  }

  if (status === "inactive") {
    filters.isActive = false;
  }

  /* -----------------------------------------
     STOCK STATUS
  ----------------------------------------- */

  if (stockStatus === "out-of-stock") {
    filters.stock = 0;
  }

  if (stockStatus === "low-stock") {
    filters.$expr = {
      $and: [
        {
          $gt: ["$stock", 0],
        },
        {
          $lte: [
            "$stock",
            {
              $ifNull: [
                "$lowStockThreshold",
                5,
              ],
            },
          ],
        },
      ],
    };
  }

  /* -----------------------------------------
     PAGINATION
  ----------------------------------------- */

  const currentPage = Math.max(
    Number(page) || 1,
    1
  );

  const pageLimit = Math.min(
    Math.max(Number(limit) || 50, 1),
    100
  );

  /* -----------------------------------------
     QUERY
  ----------------------------------------- */

  const total =
    await Product.countDocuments(
      filters
    );

  const products =
    await Product.find(filters)
      .populate("category")
      .sort({
        createdAt: -1,
      })
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
   GET PRODUCT BY ID - ADMIN
========================================= */

const getProductById = async (
  id
) => {
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
    const newSlug =
      slugify(data.title, {
        lower: true,
        strict: true,
      });

    const existingProduct =
      await Product.findOne({
        slug: newSlug,
        _id: {
          $ne: id,
        },
      });

    if (existingProduct) {
      throw new Error(
        "Another product already uses this title"
      );
    }

    data.slug = newSlug;
  }

  /* =======================================
     CATEGORY
  ======================================= */

  if (
    data.category &&
    typeof data.category ===
      "object"
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

  let existingImages =
    product.images || [];

  if (
    data.existingImages !==
    undefined
  ) {
    try {
      let parsedImages =
        data.existingImages;

      if (
        typeof parsedImages ===
        "string"
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
                    _id:
                      image._id,
                  }
                : {}),
              url: image.url,
              publicId:
                image.publicId,
            }));
      }
    } catch {
      throw new Error(
        "Invalid existingImages data"
      );
    }

    delete data.existingImages;
  }

  /* =======================================
     DELETE REMOVED IMAGES
  ======================================= */

  const keptPublicIds =
    new Set(
      existingImages
        .map(
          (image) =>
            image.publicId
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
     FINAL IMAGES
  ======================================= */

  data.images = [
    ...existingImages,
    ...newImages,
  ];

  /* =======================================
     PROTECTED FIELDS
  ======================================= */

  delete data._id;
  delete data.sku;
  delete data.views;
  delete data.salesCount;
  delete data.ratingsAverage;
  delete data.ratingsCount;
  delete data.createdAt;
  delete data.updatedAt;

  /* =======================================
     UPDATE
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

const deleteProduct = async (
  id
) => {
  const product =
    await Product.findById(id);

  if (!product) {
    throw new Error(
      "Product not found"
    );
  }

  /* -----------------------------------------
     DELETE CLOUDINARY IMAGES
  ----------------------------------------- */

  if (
    product.images &&
    product.images.length > 0
  ) {
    await Promise.all(
      product.images.map(
        async (image) => {
          if (!image.publicId) {
            return;
          }

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
      )
    );
  }

  /* -----------------------------------------
     DELETE PRODUCT
  ----------------------------------------- */

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
  updateProduct,
  deleteProduct,
};