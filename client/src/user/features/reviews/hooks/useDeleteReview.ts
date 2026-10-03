import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteReview } from "../api/reviewApi";

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["reviews", "product"],
      });

      queryClient.invalidateQueries({
        queryKey: ["reviews", "my"],
      });
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to delete review"
        : "Unable to delete review";

      toast.error(message);
    },
  });
};
