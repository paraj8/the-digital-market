import { useQuery } from "@tanstack/react-query";

import {
  getOrderById,
} from "../api/adminOrderApi";

export function useAdminOrder(
  orderId: string | null
) {
  const orderQuery = useQuery({
    queryKey: [
      "admin-order",
      orderId,
    ],

    queryFn: async () => {
      if (!orderId) {
        throw new Error(
          "Order ID is required"
        );
      }

      const response =
        await getOrderById(orderId);

      return response.data;
    },

    enabled: !!orderId,

    staleTime: 30 * 1000,
  });

  return {
    order:
      orderQuery.data ?? null,

    loading:
      orderQuery.isLoading,

    error:
      orderQuery.error,

    refetch:
      orderQuery.refetch,
  };
}