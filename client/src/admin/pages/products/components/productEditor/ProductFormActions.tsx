interface ProductFormActionsProps {
  onClose: () => void;
  isSubmitting: boolean;
  mode: "create" | "edit";
}

function ProductFormActions({
  onClose,
  isSubmitting,
  mode,
}: ProductFormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="
          rounded-xl
          border border-white/10
          bg-white/5
          px-5 py-2.5
          text-sm font-medium
          text-gray-300
          transition
          hover:bg-white/10
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          inline-flex
          min-w-[140px]
          items-center
          justify-center
          rounded-xl
          bg-violet-600
          px-5 py-2.5
          text-sm font-semibold
          text-white
          transition
          hover:bg-violet-500
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isSubmitting
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
            ? "Create Product"
            : "Update Product"}
      </button>
    </div>
  );
}

export default ProductFormActions;