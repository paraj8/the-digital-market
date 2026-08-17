interface CategoryFormActionsProps {
  mode: "create" | "edit";
  isSubmitting?: boolean;
  onCancel: () => void;
}

function CategoryFormActions({
  mode,
  isSubmitting = false,
  onCancel,
}: CategoryFormActionsProps) {
  const submitLabel =
    mode === "create"
      ? "Create Category"
      : "Save Changes";

  const submittingLabel =
    mode === "create"
      ? "Creating..."
      : "Saving...";

  return (
    <div
      className="
        flex flex-col-reverse gap-3
        border-t border-white/10
        pt-5
        sm:flex-row sm:justify-end
      "
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="
          inline-flex items-center justify-center
          rounded-xl
          border border-white/10
          bg-slate-800/60
          px-5 py-2.5
          text-sm font-medium
          text-gray-300
          transition
          hover:bg-slate-800
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
          inline-flex items-center justify-center
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
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </div>
  );
}

export default CategoryFormActions;