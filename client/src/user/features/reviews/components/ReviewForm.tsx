import { useMemo, useState, type FormEvent } from "react";

import type { ReviewRating } from "../types/review";
import { useCreateReview } from "../hooks/useCreateReview";
import RatingStars from "./RatingStars";

interface ReviewFormProps {
  productId: string;
  orderId: string;
  productTitle?: string;
  productImage?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ReviewForm({
  productId,
  orderId,
  productTitle,
  productImage,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const createReview = useCreateReview();
  const [rating, setRating] = useState<ReviewRating>(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const verifiedBadgeVisible = useMemo(
    () => Boolean(createReview.data?.isVerifiedPurchase),
    [createReview.data]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();
    const trimmedTitle = title.trim();

    if (!rating || trimmedContent.length === 0) {
      return;
    }

    createReview.mutate(
      {
        productId,
        orderId,
        rating,
        title: trimmedTitle,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setRating(5);
          setTitle("");
          setContent("");
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#111827] p-5"
    >
      <div className="mb-4 flex items-center gap-3">
        {productImage ? (
          <img
            src={productImage}
            alt={productTitle || "Product"}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-300">
            IMG
          </div>
        )}

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Reviewing</p>
          <h3 className="text-base font-semibold text-white">
            {productTitle || "Product"}
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Your rating
          </label>
          <RatingStars
            rating={rating}
            size="md"
            interactive
            onChange={setRating}
            disabled={createReview.isPending}
          />
        </div>

        <div>
          <label htmlFor="review-title" className="mb-2 block text-sm font-medium text-slate-200">
            Review title
          </label>
          <input
            id="review-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            placeholder="Excellent product"
            disabled={createReview.isPending}
            className="w-full rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="review-content" className="mb-2 block text-sm font-medium text-slate-200">
            Your review
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="Tell others about the quality, fit, and value."
            disabled={createReview.isPending}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-violet-400 focus:outline-none"
          />
        </div>
      </div>

      {verifiedBadgeVisible && (
        <div className="mt-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          ✓ Verified Purchase
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={createReview.isPending || !content.trim() || !rating}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createReview.isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
