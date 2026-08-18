import { FiAlertTriangle, FiLoader, FiTrash2, FiX } from "react-icons/fi";

import type { Category } from "../../../../../features/categories/types/category";

interface CategoryDeleteModalProps {
  isOpen: boolean;
  category: Category | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function CategoryDeleteModal({
  isOpen,
  category,
  isDeleting,
  onClose,
  onConfirm,
}: CategoryDeleteModalProps) {
  if (!isOpen || !category) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-md
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-slate-900
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
              "
            >
              <FiAlertTriangle size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Delete Category
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              rounded-lg p-2
              text-gray-500
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm leading-6 text-gray-400">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">
              {category.name}
            </span>
            ?
          </p>

          <div
            className="
              mt-5
              rounded-xl
              border border-red-500/10
              bg-red-500/5
              p-4
            "
          >
            <p className="text-xs leading-5 text-gray-500">
              If this category has products associated with it,
              the deletion will be blocked to protect your
              product data.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            flex items-center justify-end gap-3
            border-t border-white/10
            bg-slate-950/30
            px-6 py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              rounded-xl
              border border-white/10
              px-4 py-2.5
              text-sm font-medium
              text-gray-300
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              inline-flex items-center justify-center
              gap-2
              rounded-xl
              bg-red-600
              px-4 py-2.5
              text-sm font-semibold
              text-white
              transition
              hover:bg-red-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isDeleting ? (
              <>
                <FiLoader
                  size={16}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={16} />
                Delete Category
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryDeleteModal;