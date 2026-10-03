import { useQuery } from "@tanstack/react-query";

import { getReviewComments } from "../api/reviewApi";
import { getStoredUserId } from "../utils/reviewAuth";

export const useReviewComments = (
  reviewId: string,
  enabled: boolean,
  page = 1,
  limit = 10
) => {
  const viewerId = getStoredUserId() ?? "guest";

  return useQuery({
    queryKey: ["reviews", "comments", reviewId, page, limit, viewerId],
    queryFn: () => getReviewComments(reviewId, page, limit),
    enabled: Boolean(reviewId) && enabled,
  });
};
