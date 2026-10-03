import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import toast from "react-hot-toast";

import { useLikeReview } from "../hooks/useLikeReview";
import type { Review } from "../types/review";

import RatingStars from "./RatingStars";
import ReviewComments from "./ReviewComments";

interface ReviewCardProps {
  review: Review;
  productId: string;
}

function ReviewCard({ review, productId }: ReviewCardProps) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const likeMutation = useLikeReview(productId);
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  const userName =
    typeof review.user === "object" ? review.user.fullName : "Customer";
  const liked = review.likedByCurrentUser === true;

  const toggleLike = () => {
    if (!isAuthenticated) {
      toast("Please login to like reviews 🔐");
      return;
    }

    likeMutation.mutate({ reviewId: review._id, liked });
  };

  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-[#0F172A] p-4 sm:p-5">
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <p className="break-words text-base font-semibold text-white">
              {userName}
            </p>
            {review.isVerifiedPurchase === true && (
              <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                ✓ Verified Purchase
              </span>
            )}
          </div>

          {review.title ? (
            <h3 className="mt-3 break-words text-base font-semibold text-slate-100 [overflow-wrap:anywhere]">
              {review.title}
            </h3>
          ) : null}

          <p className="mt-2 text-sm text-slate-400">
            {new Date(review.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <RatingStars rating={review.rating} size="sm" />
          <span className="text-sm font-medium text-slate-200">{review.rating}/5</span>
        </div>
      </div>

      {review.content && (
        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
          {review.content}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={toggleLike}
          disabled={likeMutation.isPending}
          aria-pressed={liked}
          className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm transition hover:bg-white/5 disabled:cursor-wait disabled:opacity-60 ${
            liked ? "text-pink-400" : "text-slate-300 hover:text-pink-300"
          }`}
        >
          {liked ? (
            <FaHeart aria-hidden="true" />
          ) : (
            <FiHeart aria-hidden="true" />
          )}
          {liked ? "Liked" : "Like"} {review.likeCount ?? 0}
        </button>
        <button
          type="button"
          onClick={() => setCommentsOpen((open) => !open)}
          aria-expanded={commentsOpen}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-violet-200"
        >
          <FiMessageCircle aria-hidden="true" />
          {review.commentCount ?? 0}{" "}
          {review.commentCount === 1 ? "Comment" : "Comments"}
          {review.hiddenCommentCount
            ? ` · ${review.hiddenCommentCount} hidden`
            : ""}
        </button>
      </div>

      {commentsOpen ? (
        <ReviewComments reviewId={review._id} productId={productId} />
      ) : null}
    </article>
  );
}

export default ReviewCard;
