import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
  createReviewComment,
  deleteReviewComment,
  setAllReviewCommentsVisibility,
  setReviewCommentVisibility,
  setSelectedReviewCommentsVisibility,
  updateReviewComment,
} from "../api/reviewApi";

type ReviewCommentAction =
  | { type: "create"; content: string }
  | { type: "update"; commentId: string; content: string }
  | { type: "delete"; commentId: string }
  | { type: "visibility"; commentId: string; isVisible: boolean }
  | { type: "selectedVisibility"; commentIds: string[]; isVisible: boolean }
  | { type: "allVisibility"; isVisible: boolean };

const actionMessage = (action: ReviewCommentAction) => {
  switch (action.type) {
    case "create":
      return "Comment posted";
    case "update":
      return "Comment updated";
    case "delete":
      return "Comment deleted";
    default:
      return action.isVisible ? "Comments are now visible" : "Comments hidden";
  }
};

export const useReviewCommentActions = (
  reviewId: string,
  productId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: ReviewCommentAction): Promise<void> => {
      switch (action.type) {
        case "create":
          await createReviewComment(reviewId, action.content);
          break;
        case "update":
          await updateReviewComment(
            reviewId,
            action.commentId,
            action.content
          );
          break;
        case "delete":
          await deleteReviewComment(reviewId, action.commentId);
          break;
        case "visibility":
          await setReviewCommentVisibility(
            reviewId,
            action.commentId,
            action.isVisible
          );
          break;
        case "selectedVisibility":
          await setSelectedReviewCommentsVisibility(
            reviewId,
            action.commentIds,
            action.isVisible
          );
          break;
        case "allVisibility":
          await setAllReviewCommentsVisibility(reviewId, action.isVisible);
          break;
      }
    },
    onSuccess: async (_result, action) => {
      toast.success(actionMessage(action));
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["reviews", "comments", reviewId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reviews", "product", productId],
        }),
      ]);
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Unable to update comments"
        : "Unable to update comments";
      toast.error(message);
    },
  });
};
