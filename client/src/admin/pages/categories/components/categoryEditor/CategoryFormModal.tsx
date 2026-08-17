import { FiX } from "react-icons/fi";

import type { Category } from "../../../../../features/categories/types/category";

import CategoryForm from "./CategoryForm";

interface CategoryFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  category?: Category | null;
  onClose: () => void;
  onSuccess: (category: Category) => void;
}

function CategoryFormModal({
  isOpen,
  mode,
  category = null,
  onClose,
  onSuccess,
}: CategoryFormModalProps) {
  if (!isOpen) {
    return null;
  }

  const title =
    mode === "create"
      ? "Create Category"
      : "Edit Category";

  const description =
    mode === "create"
      ? "Create a new product category."
      : "Update the category details.";

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-form-title"
    >
      {/* Modal */}
      <div
        className="
          relative
          flex w-full max-w-2xl
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-slate-950
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex shrink-0
            items-start justify-between
            border-b border-white/10
            px-6 py-5
          "
        >
          <div>
            <h2
              id="category-form-title"
              className="text-xl font-bold text-white"
            >
              {title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
            "
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto px-6 py-6">
          <CategoryForm
            key={`${mode}-${category?._id ?? "new"}`}
            mode={mode}
            category={category}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryFormModal;