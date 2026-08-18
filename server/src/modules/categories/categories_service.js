const Category = require("./categories_model");
const Product = require("../products/products_model");
const slugify = require("slugify");

const {
  uploadImage,
  deleteImage,
} = require("../../services/cloudinary_service");

// =====================================
// CREATE CATEGORY
// =====================================

const createCategory = async (
  data,
  imageBuffer
) => {
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });

  const existingCategory =
    await Category.findOne({ slug });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  let image = {
    url: "",
    publicId: "",
  };

  if (imageBuffer) {
    image = await uploadImage(
      imageBuffer,
      "the-digital-market/categories"
    );
  }

  return await Category.create({
    ...data,
    slug,
    image,
  });
};

// =====================================
// GET ALL CATEGORIES
// =====================================

const getAllCategories = async () => {
  return await Category.find().sort({
    sortOrder: 1,
    createdAt: -1,
  });
};

// =====================================
// GET CATEGORY BY ID
// =====================================

const getCategoryById = async (id) => {
  const category =
    await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// =====================================
// UPDATE CATEGORY
// =====================================

const updateCategory = async (
  id,
  data,
  imageBuffer
) => {
  const category =
    await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (data.name) {
    data.slug = slugify(data.name, {
      lower: true,
      strict: true,
    });
  }

  // Replace image if a new image was uploaded
  if (imageBuffer) {
    const newImage = await uploadImage(
      imageBuffer,
      "the-digital-market/categories"
    );

    // Delete old image from Cloudinary
    if (category.image?.publicId) {
      await deleteImage(
        category.image.publicId
      );
    }

    data.image = newImage;
  }

  return await Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// =====================================
// DELETE CATEGORY
// =====================================

const deleteCategory = async (id) => {
  const category =
    await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  // Check whether any products are using this category
  const productExists =
    await Product.exists({
      category: category._id,
    });

  if (productExists) {
    throw new Error(
      "Cannot delete this category because products are associated with it"
    );
  }

  // Delete category from MongoDB first
  await Category.findByIdAndDelete(id);

  // Delete category image from Cloudinary
  if (category.image?.publicId) {
    try {
      await deleteImage(
        category.image.publicId
      );
    } catch (error) {
      // Category is already deleted from MongoDB.
      // Log the Cloudinary cleanup failure so it can be handled later.
      console.error(
        "Failed to delete category image from Cloudinary:",
        error
      );
    }
  }

  return {
    message:
      "Category deleted successfully",
  };
};

// =====================================
// EXPORT SERVICES
// =====================================

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};