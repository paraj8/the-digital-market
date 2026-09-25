import type { Product } from "../../../../../shared/types/product";
import type { AdminProduct } from "./types";
import ProductForm from "./ProductForm";

interface ProductFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  product?: Product | null;
  isSubmitting?: boolean;

  categories?: {
    _id: string;
    name: string;
  }[];

  onClose: () => void;

  onSubmit: (
    data: Partial<AdminProduct>,
    files: File[],
    remainingExistingImages: Product["images"]
  ) => void;
}

function ProductFormModal({
  isOpen,
  mode,
  product,
  isSubmitting = false,
  categories = [],
  onClose,
  onSubmit,
}: ProductFormModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              {mode === "create"
                ? "Add Product"
                : "Edit Product"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              {mode === "create"
                ? "Create a new product for your store."
                : "Update the product information."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              text-gray-400
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto px-6 py-6">
          <ProductForm
            key={`${mode}-${product?._id ?? "new"}`}
            product={product}
            mode={mode}
            isSubmitting={isSubmitting}
            categories={categories}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductFormModal;