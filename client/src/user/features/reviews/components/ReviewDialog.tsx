import { X } from "lucide-react";
import { createPortal } from "react-dom";

import type { ReviewTarget } from "../types/review";
import ReviewForm from "./ReviewForm";

interface ReviewDialogProps {
  target: ReviewTarget | null;
  onClose: () => void;
  onSuccess?: () => void;
}

function ReviewDialog({ target, onClose, onSuccess }: ReviewDialogProps) {
  if (!target) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              Review product
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {target.title}
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close review form"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <ReviewForm
            productId={target.productId}
            orderId={target.orderId}
            productTitle={target.title}
            productImage={target.image}
            onSuccess={() => {
              onClose();
              onSuccess?.();
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ReviewDialog;
