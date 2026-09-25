import {
  FiAlertTriangle,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import type { Product } from "../../../../../shared/types/product";

interface ProductDeleteModalProps {
  isOpen: boolean;
  product: Product | null;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ProductDeleteModal({
  isOpen,
  product,
  isDeleting = false,
  onClose,
  onConfirm,
}: ProductDeleteModalProps) {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
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
        <div
          className="
            flex items-center justify-between
            border-b border-white/10
            px-6 py-4
          "
        >
          <h2 className="text-lg font-semibold text-white">
            Delete Product
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            {/* Warning Icon */}
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-full
                bg-red-500/10
                text-red-400
              "
            >
              <FiAlertTriangle size={28} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Delete this product?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-200">
                "{product.title}"
              </span>
              ?
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              This action cannot be undone. The product
              and its associated images will be permanently
              removed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            flex flex-col-reverse
            gap-3
            border-t border-white/10
            bg-white/[0.02]
            px-6 py-4
            sm:flex-row sm:justify-end
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              rounded-xl
              border border-white/10
              px-5 py-2.5
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
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-600
              px-5 py-2.5
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
                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={16} />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDeleteModal;