const Category = require("./categories_model");
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

  // Delete image from Cloudinary
  if (category.image?.publicId) {
    await deleteImage(
      category.image.publicId
    );
  }

  await Category.findByIdAndDelete(id);

  return {
    message:
      "Category deleted successfully",
  };
};

// =====================================

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};