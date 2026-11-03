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

const parseArrayField = (data, fieldName) => {
  if (typeof data[fieldName] === "string") {
    try {
      data[fieldName] = JSON.parse(data[fieldName]);
    } catch {
      throw new Error(`Invalid ${fieldName} data`);
    }
  }

  if (
    data[fieldName] !== undefined &&
    !Array.isArray(data[fieldName])
  ) {
    throw new Error(`Invalid ${fieldName} data`);
  }
};

const normalizeVariantData = async (
  data,
  productSku,
  productId
) => {
  if (data.hasVariants !== undefined) {
    if (typeof data.hasVariants === "string") {
      if (!["true", "false"].includes(data.hasVariants)) {
        throw new Error("Invalid hasVariants value");
      }
      data.hasVariants = data.hasVariants === "true";
    } else if (typeof data.hasVariants !== "boolean") {
      throw new Error("Invalid hasVariants value");
    }
  }

  parseArrayField(data, "variantAttributes");
  parseArrayField(data, "variants");

  if (data.variantAttributes === undefined && data.variants === undefined) {
    if (data.hasVariants) {
      throw new Error("Variant attributes and variants are required");
    }
    return;
  }

  const attributes = data.variantAttributes ?? [];
  const variants = data.variants ?? [];
  const currentProduct = productId
    ? await Product.findById(productId).select("variants._id")
    : null;
  const currentVariantIds = new Set(
    (currentProduct?.variants ?? []).map((variant) =>
      String(variant._id)
    )
  );
  const normalizedAttributes = attributes.map((attribute) => ({
    name: String(attribute?.name ?? "").trim(),
    values: Array.isArray(attribute?.values)
      ? attribute.values.map((value) => String(value).trim()).filter(Boolean)
      : [],
  }));
  const names = normalizedAttributes.map((attribute) =>
    attribute.name.toLowerCase()
  );

  if (
    normalizedAttributes.some(
      (attribute) => !attribute.name || attribute.values.length === 0
    ) ||
    new Set(names).size !== names.length
  ) {
    throw new Error("Variant attributes must have unique names and values");
  }

  for (const attribute of normalizedAttributes) {
    const values = attribute.values.map((value) => value.toLowerCase());
    if (new Set(values).size !== values.length) {
      throw new Error(`Duplicate values for variant attribute ${attribute.name}`);
    }
  }

  if (data.hasVariants && normalizedAttributes.length === 0) {
    throw new Error("Add at least one product variant attribute");
  }
  if (data.hasVariants && variants.length === 0) {
    throw new Error("Generate at least one product variant");
  }

  const normalizedVariants = variants.map((variant, index) => {
    if (variant._id && !currentVariantIds.has(String(variant._id))) {
      throw new Error("Variant ID does not belong to this product");
    }

    const variantAttributes =
      variant?.attributes && typeof variant.attributes === "object"
        ? Object.fromEntries(
            Object.entries(variant.attributes).map(([name, value]) => [
              name.trim(),
              String(value).trim(),
            ])
          )
        : {};
    const expectedNames = normalizedAttributes.map(
      (attribute) => attribute.name
    );

    if (
      variantAttributes &&
      (Object.keys(variantAttributes).length !== expectedNames.length ||
        expectedNames.some(
          (name) =>
            !normalizedAttributes
              .find((attribute) => attribute.name === name)
              ?.values.includes(variantAttributes[name])
        ))
    ) {
      throw new Error("Every variant must use a valid value for each attribute");
    }

    const price = Number(variant.price);
    const salePrice = Number(variant.salePrice ?? 0);
    const costPrice = Number(variant.costPrice ?? 0);
    const stock = Number(variant.stock ?? 0);
    if (
      variant.isActive !== undefined &&
      typeof variant.isActive !== "boolean"
    ) {
      throw new Error("Variant active status must be a boolean");
    }
    const isActive = variant.isActive !== false;

    if (
      !Number.isFinite(price) ||
      price < 0 ||
      (data.hasVariants && isActive && price <= 0) ||
      !Number.isFinite(salePrice) ||
      salePrice < 0 ||
      (salePrice > 0 && salePrice > price) ||
      !Number.isFinite(costPrice) ||
      costPrice < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      throw new Error("Variant pricing or stock is invalid");
    }

    return {
      ...(variant._id ? { _id: variant._id } : {}),
      attributes: variantAttributes,
      sku: String(variant.sku ?? "").trim().toUpperCase() ||
        `${productSku}-V${index + 1}`,
      costPrice,
      price,
      salePrice,
      stock,
      isActive,
    };
  });

  if (
    data.hasVariants &&
    !normalizedVariants.some((variant) => variant.isActive)
  ) {
    throw new Error("At least one product variant must be active");
  }

  const combinations = normalizedVariants.map((variant) =>
    JSON.stringify(
      normalizedAttributes.map((attribute) => [
        attribute.name,
        variant.attributes[attribute.name] ?? "",
      ])
    )
  );
  const skuValues = normalizedVariants.map((variant) => variant.sku);
  if (
    new Set(combinations).size !== combinations.length ||
    new Set(skuValues).size !== skuValues.length
  ) {
    throw new Error("Variant combinations and SKUs must be unique");
  }

  const skuConflictQuery = {
    $or: [
      { sku: { $in: skuValues } },
      { "variants.sku": { $in: skuValues } },
    ],
  };
  if (productId) {
    skuConflictQuery._id = { $ne: productId };
  }
  const conflictingProduct = await Product.findOne(skuConflictQuery);
  if (
    conflictingProduct ||
    skuValues.includes(String(productSku).toUpperCase())
  ) {
    throw new Error("A product or variant already uses one of these SKUs");
  }

  if (data.variantAttributes !== undefined) {
    data.variantAttributes = normalizedAttributes;
  }
  if (data.variants !== undefined) {
    data.variants = normalizedVariants;
  }
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

  await normalizeVariantData(data, sku);

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

  await normalizeVariantData(
    data,
    product.sku,
    product._id
  );

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