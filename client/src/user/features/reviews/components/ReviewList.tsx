import { useState } from "react";

import { useProductReviews } from "../hooks/useProductReviews";
import RatingStars from "./RatingStars";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  productId: string;
}

function ReviewList({ productId }: ReviewListProps) {
  const [pagination, setPagination] = useState({ productId, page: 1 });
  const page = pagination.productId === productId ? pagination.page : 1;
  const { data, isLoading, isFetching, isError, refetch } = useProductReviews(
    productId,
    page
  );

  if (isLoading) {
    return (
      <section
        aria-label="Customer reviews"
        aria-busy="true"
        className="mt-12 rounded-2xl border border-white/10 bg-[#111827] p-5 sm:p-8"
      >
        <div className="h-6 w-44 animate-pulse rounded bg-slate-700" />
        <div className="mt-5 grid gap-6 border-b border-white/10 pb-6 sm:grid-cols-2">
          <div className="h-20 animate-pulse rounded-xl bg-slate-800" />
          <div className="h-28 animate-pulse rounded-xl bg-slate-800" />
        </div>
        <div className="mt-6 space-y-4">
          <div className="h-32 animate-pulse rounded-xl bg-slate-800" />
          <div className="h-32 animate-pulse rounded-xl bg-slate-800" />
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="mt-12 rounded-2xl border border-white/10 bg-[#111827] p-5 sm:p-8">
        <h2 className="text-xl font-semibold text-white">Customer Reviews</h2>
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-300">Unable to load reviews.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="mt-2 text-sm font-medium text-red-200 underline decoration-red-300/50 underline-offset-4 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Trying again..." : "Try again"}
          </button>
        </div>
      </section>
    );
  }

  const reviews = data.data ?? [];
  const { averageRating, totalReviews, ratingDistribution } = data;
  const hasReviews = totalReviews > 0;

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-[#111827] p-5 sm:p-8">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">
        Customer Reviews
      </h2>

      {hasReviews ? (
        <div className="mt-5 grid gap-6 border-b border-white/10 pb-6 sm:grid-cols-2 sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-3xl font-bold text-white">
                {averageRating.toFixed(1)}
              </span>
              <RatingStars rating={Math.round(averageRating)} size="md" />
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Based on {totalReviews} review{totalReviews === 1 ? "" : "s"}
            </p>
          </div>

          <div
            aria-label="Rating distribution"
            className="flex flex-col gap-1"
          >
            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                ratingDistribution[
                  String(star) as keyof typeof ratingDistribution
                ] ?? 0;

              return (
                <div key={star} className="flex min-w-0 items-center gap-3">
                  <span className="sr-only">{star} star</span>
                  <RatingStars rating={star} />
                  <div
                    className="h-2.5 min-w-0 max-w-40 flex-1 overflow-hidden rounded-full bg-slate-800"
                    role="img"
                    aria-label={`${count} reviews`}
                  >
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${(count / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-sm text-slate-400">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {hasReviews ? (
        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              productId={productId}
            />
          ))}

          {data.pagination.pages > 1 ? (
            <nav
              aria-label="Review pages"
              className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm"
            >
              <button
                type="button"
                onClick={() =>
                  setPagination({ productId, page: page - 1 })
                }
                disabled={page <= 1 || isFetching}
                className="rounded-lg border border-white/10 px-3 py-2 text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-slate-400">
                Page {data.pagination.page} of {data.pagination.pages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPagination({ productId, page: page + 1 })
                }
                disabled={page >= data.pagination.pages || isFetching}
                className="rounded-lg border border-white/10 px-3 py-2 text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0B1220] p-6 text-center">
          <p className="font-medium text-slate-200">No reviews yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            Be the first to share your experience.
          </p>
        </div>
      )}
    </section>
  );
}

export default ReviewList;
