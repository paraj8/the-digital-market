import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import type { ReviewRating } from "../types/review";
import { updateReview } from "../api/reviewApi";

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, payload }: { reviewId: string; payload: { rating?: ReviewRating; title?: string; content?: string } }) =>
      updateReview(reviewId, payload),
    onSuccess: () => {
      toast.success("Review updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["reviews", "product"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews", "my"],
      });
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to update review"
        : "Unable to update review";

      toast.error(message);
    },
  });
};
