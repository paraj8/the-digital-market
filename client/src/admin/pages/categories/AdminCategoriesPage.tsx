import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

import type { Category } from "../../../features/categories/types/category";
import { useCategories } from "../../../features/categories/hooks/useCategories";
import { useDeleteCategory } from "../../../features/categories/hooks/useDeleteCategory";

import CategoryFilters from "./components/CategoryFilters";
import CategoryStats from "./components/CategoryStats";
import CategoriesTable from "./components/CategoriesTable";
import CategoryFormModal from "./components/categoryEditor/CategoryFormModal";
import CategoryDeleteModal from "./components/categoryDelete/CategoryDeleteModal";

function AdminCategoriesPage() {
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useCategories();

  const deleteCategoryMutation =
    useDeleteCategory();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  /*
   * Category editor state
   */
  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [formMode, setFormMode] = useState<
    "create" | "edit"
  >("create");

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  /*
   * Category delete state
   */
  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [categoryToDelete, setCategoryToDelete] =
    useState<Category | null>(null);

  /*
   * Filter categories
   */
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        (status === "active" &&
          category.isActive) ||
        (status === "inactive" &&
          !category.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  /*
   * Open create modal
   */
  const handleAddCategory = () => {
    setFormMode("create");
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  /*
   * Open edit modal
   */
  const handleEditCategory = (
    category: Category
  ) => {
    setFormMode("edit");
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  /*
   * Close editor modal
   */
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  /*
   * Called after successful create/edit
   */
  const handleFormSuccess = async () => {
    handleCloseForm();

    await refetch();
  };

  /*
   * Open delete confirmation
   */
  const handleDeleteCategory = (
    category: Category
  ) => {
    setCategoryToDelete(category);
    setIsDeleteOpen(true);
  };

  /*
   * Close delete confirmation
   */
  const handleCloseDelete = () => {
    if (deleteCategoryMutation.isPending) {
      return;
    }

    setIsDeleteOpen(false);
    setCategoryToDelete(null);
  };

  /*
   * Delete category
   */
  const handleConfirmDelete = async () => {
    if (
      !categoryToDelete ||
      deleteCategoryMutation.isPending
    ) {
      return;
    }

    try {
      await deleteCategoryMutation.mutateAsync(
        categoryToDelete._id
      );

      toast.success(
        "Category deleted successfully"
      );

      setIsDeleteOpen(false);
      setCategoryToDelete(null);
    } catch (error: unknown) {
      const message = isAxiosError(error)
        ? error.response?.data?.message ||
          "Failed to delete category."
        : "Failed to delete category.";

      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="
          flex flex-col gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1 className="text-2xl font-bold text-white">
            Categories
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage product categories and organization.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCategory}
          className="
            inline-flex items-center justify-center
            gap-2 rounded-xl
            bg-violet-600 px-5 py-3
            text-sm font-semibold text-white
            transition
            hover:bg-violet-500
          "
        >
          <FiPlus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <CategoryStats categories={categories} />

      {/* Error */}
      {isError && (
        <div
          className="
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            p-4
            text-sm text-red-400
          "
        >
          Failed to load categories.
        </div>
      )}

      {/* Filters */}
      <CategoryFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      {/* Table */}
      <CategoriesTable
        categories={filteredCategories}
        isLoading={isLoading}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isFormOpen}
        mode={formMode}
        category={selectedCategory}
        onClose={handleCloseForm}
        onSuccess={handleFormSuccess}
      />

      {/* Category Delete Modal */}
      <CategoryDeleteModal
        isOpen={isDeleteOpen}
        category={categoryToDelete}
        isDeleting={
          deleteCategoryMutation.isPending
        }
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AdminCategoriesPage;