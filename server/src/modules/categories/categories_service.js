const Category = require("./categories_model");
const slugify = require("slugify");

const createCategory = async (data) => {
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
  });

  const existingCategory =
    await Category.findOne({ slug });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    ...data,
    slug,
  });
};

const getAllCategories = async () => {
  return await Category.find().sort({
    sortOrder: 1,
    createdAt: -1,
  });
};

const getCategoryById = async (id) => {
  const category =
    await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategory = async (
  id,
  data
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

  return await Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCategory = async (id) => {
  const category =
    await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  await Category.findByIdAndDelete(id);

  return {
    message:
      "Category deleted successfully",
  };
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};