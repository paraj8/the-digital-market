import { useQuery } from "@tanstack/react-query";

import { getOrderById } from "../api/orderApi";

export const useOrder = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId!),
    enabled: Boolean(orderId),
  });
};