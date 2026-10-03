import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { likeReview, unlikeReview } from "../api/reviewApi";
import type { ProductReviewsResponse } from "../types/review";
import { getStoredUserId } from "../utils/reviewAuth";

interface LikeReviewVariables {
  reviewId: string;
  liked: boolean;
}

export const useLikeReview = (productId: string) => {
  const queryClient = useQueryClient();
  const viewerId = getStoredUserId() ?? "guest";

  return useMutation({
    mutationFn: ({ reviewId, liked }: LikeReviewVariables) =>
      liked ? unlikeReview(reviewId) : likeReview(reviewId),
    onSuccess: (result, variables) => {
      queryClient.setQueriesData<ProductReviewsResponse>(
        {
          queryKey: ["reviews", "product", productId],
          predicate: (query) => query.queryKey[5] === viewerId,
        },
        (current) =>
          current
            ? {
                ...current,
                data: current.data.map((review) =>
                  review._id === variables.reviewId
                    ? {
                        ...review,
                        likedByCurrentUser: result.liked,
                        likeCount: result.likeCount,
                      }
                    : review
                ),
              }
            : current
      );
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to update review like"
        : "Unable to update review like";
      toast.error(message);
    },
  });
};
