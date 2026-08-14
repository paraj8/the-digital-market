import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllOrders,
  updateOrderStatus,
  type AdminOrderStatus,
} from "../api/adminOrderApi";

export function useAdminOrders() {
  const queryClient = useQueryClient();

  // =====================================
  // FILTER / PAGINATION STATE
  // =====================================

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(20);

  const [status, setStatus] =
    useState<AdminOrderStatus | "all">("all");

  const [search, setSearch] = useState("");

  // =====================================
  // GET ORDERS
  // =====================================

  const ordersQuery = useQuery({
    queryKey: [
      "admin-orders",
      page,
      limit,
      status,
      search,
    ],

    queryFn: () =>
      getAllOrders({
        page,
        limit,
        status,
        search,
      }),
  });

  // =====================================
  // UPDATE ORDER STATUS
  // =====================================

  const updateStatusMutation = useMutation({
    mutationFn: ({
      orderId,
      orderStatus,
    }: {
      orderId: string;
      orderStatus: AdminOrderStatus;
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

  // =====================================
  // RETURN
  // =====================================

  return {
    orders:
      ordersQuery.data?.data ?? [],

    pagination:
      ordersQuery.data?.pagination ?? {
        currentPage: 1,
        limit,
        totalOrders: 0,
        totalPages: 0,
      },

    loading: ordersQuery.isLoading,

    error: ordersQuery.error,

    // Pagination
    page,
    setPage,

    limit,
    setLimit,

    // Filters
    status,
    setStatus,

    search,
    setSearch,

    // Update status
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