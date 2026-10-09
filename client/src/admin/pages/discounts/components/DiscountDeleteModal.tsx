import type { Discount } from "../../../../shared/types/discount";
import { FiX } from "react-icons/fi";

interface DiscountDeleteModalProps {
  discount: Discount | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DiscountDeleteModal({ discount, isDeleting, onClose, onConfirm }: DiscountDeleteModalProps) {
  if (!discount) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Delete Discount</h2>
            <p className="mt-2 text-sm text-gray-400">
              Delete <span className="font-semibold text-white">{discount.name}</span>? This cannot be undone.
            </p>
          </div>
          <button type="button" onClick={onClose} disabled={isDeleting} aria-label="Close"
            className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white">
            <FiX size={16} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isDeleting}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscountDeleteModal;
