import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllOrders,
  updateOrderStatus,
  type AdminOrder,
} from "../../api/adminOrderApi";

export function useAdminOrders() {
  const queryClient =
    useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  const updateStatusMutation =
    useMutation({
      mutationFn: ({
        orderId,
        orderStatus,
      }: {
        orderId: string;
        orderStatus: AdminOrder["orderStatus"];
      }) =>
        updateOrderStatus(
          orderId,
          orderStatus
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["admin-orders"],
        });
      },
    });

  return {
    orders:
      ordersQuery.data?.data ?? [],

    loading:
      ordersQuery.isLoading,

    error:
      ordersQuery.error,

    updateStatus:
      updateStatusMutation.mutateAsync,

    updating:
      updateStatusMutation.isPending,

    updateError:
      updateStatusMutation.error,

    refetch:
      ordersQuery.refetch,
  };
}