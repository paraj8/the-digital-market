import type { Coupon } from "../../../../shared/types/coupon";

interface DeleteCouponModalProps {
  isOpen: boolean;
  coupon: Coupon | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteCouponModal({
  isOpen,
  coupon,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteCouponModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-slate-900 shadow-2xl shadow-red-950/20">
        <div className="px-6 py-5">
          <h2 className="text-xl font-bold text-white">Delete Coupon</h2>
          <p className="mt-3 text-sm text-gray-400">
            Are you sure you want to delete coupon <span className="font-semibold text-white">{coupon?.code ?? "this coupon"}</span>? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete Coupon"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCouponModal;
