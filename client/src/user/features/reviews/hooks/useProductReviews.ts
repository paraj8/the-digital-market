import { useQuery } from "@tanstack/react-query";

import { getProductReviews } from "../api/reviewApi";
import { getStoredUserId } from "../utils/reviewAuth";

export const useProductReviews = (
  productId: string,
  page = 1,
  limit = 10
) => {
  const viewerId = getStoredUserId() ?? "guest";

  return useQuery({
    queryKey: ["reviews", "product", productId, page, limit, viewerId],
    queryFn: () => getProductReviews(productId, page, limit),
    enabled: Boolean(productId),
  });
};
