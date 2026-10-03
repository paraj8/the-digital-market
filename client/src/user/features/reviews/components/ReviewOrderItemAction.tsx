import type { ReviewTarget } from "../types/review";

interface ReviewOrderItemActionProps {
  productId: string;
  orderId: string;
  productTitle: string;
  productImage?: string;
  paymentStatus: string;
  orderStatus: string;
  hasReviewed: boolean;
  onWriteReview: (target: ReviewTarget) => void;
}

function ReviewOrderItemAction({
  productId,
  orderId,
  productTitle,
  productImage,
  paymentStatus,
  orderStatus,
  hasReviewed,
  onWriteReview,
}: ReviewOrderItemActionProps) {
  const isEligibleForReview =
    paymentStatus === "paid" && orderStatus === "delivered";

  if (!isEligibleForReview) {
    return null;
  }

  if (hasReviewed) {
    return (
      <p className="mt-3 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
        ✓ Reviewed
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        onWriteReview({
          productId,
          orderId,
          title: productTitle,
          image: productImage,
        })
      }
      className="mt-3 rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
    >
      Write a review
    </button>
  );
}

export default ReviewOrderItemAction;
