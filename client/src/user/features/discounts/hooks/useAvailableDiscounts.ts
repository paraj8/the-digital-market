import { useQuery } from "@tanstack/react-query";

import { getAvailableDiscounts } from "../api/discountApi";

export const useAvailableDiscounts = () =>
  useQuery({
    queryKey: ["discounts", "available"],
    queryFn: getAvailableDiscounts,
  });
