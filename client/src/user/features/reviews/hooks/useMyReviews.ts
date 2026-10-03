import { useQuery } from "@tanstack/react-query";

import { getMyReviews } from "../api/reviewApi";

export const useMyReviews = () => {
  return useQuery({
    queryKey: ["reviews", "my"],
    queryFn: getMyReviews,
  });
};
