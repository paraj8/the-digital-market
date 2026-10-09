import { useQuery } from "@tanstack/react-query";

import { getAvailableCoupons } from "../api/couponApi";

export const useAvailableCoupons = (productId?: string) => {
  return useQuery({
    queryKey: ["coupons", "available", productId],
    queryFn: () => getAvailableCoupons(productId),
  });
};
