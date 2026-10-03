import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createReview } from "../api/reviewApi";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted successfully");

      queryClient.invalidateQueries({
        queryKey: ["reviews", "product"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews", "my"],
      });
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to submit review"
        : "Unable to submit review";

      toast.error(message);
    },
  });
};
