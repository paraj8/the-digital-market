import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  createRazorpayOrder,
  getRazorpayPaymentStatus,
  markRazorpayPaymentFailed,
  verifyRazorpayPayment,
} from "../api/razorpayApi";
import type {
  CreateRazorpayOrderRequest,
  VerifyRazorpayPaymentRequest,
} from "../types/razorpay";

export function useRazorpay() {
  const createMutation = useMutation({
    mutationFn: (data: CreateRazorpayOrderRequest) =>
      createRazorpayOrder(data),
  });
  const verifyMutation = useMutation({
    mutationFn: (data: VerifyRazorpayPaymentRequest) =>
      verifyRazorpayPayment(data),
  });
  const failedMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
      markRazorpayPaymentFailed(orderId, reason),
  });

  return {
    createPaymentOrder: createMutation.mutateAsync,
    verifyPayment: verifyMutation.mutateAsync,
    markPaymentFailed:
      (orderId: string, reason?: string) =>
        failedMutation.mutateAsync({
          orderId,
          reason,
        }),
    creatingOrder: createMutation.isPending,
    verifyingPayment: verifyMutation.isPending,
    createError: createMutation.error,
    verifyError: verifyMutation.error,
  };
}

export function useRazorpayPaymentStatus(orderId?: string, enabled = true) {
  const query = useQuery({
    queryKey: ["razorpay-payment-status", orderId],
    queryFn: () => getRazorpayPaymentStatus(orderId as string),
    enabled: Boolean(orderId) && enabled,
    refetchInterval: (current) => {
      const status =
        current.state.data?.data?.application_payment_status;
      return status === "pending" ? 2000 : false;
    },
    refetchOnWindowFocus: false,
  });

  const status =
    query.data?.data?.application_payment_status ?? null;

  return {
    payment: query.data?.data ?? null,
    isPending: status === "pending",
    isPaid: status === "paid",
    isFailed: status === "failed",
    loading: query.isLoading,
    fetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
