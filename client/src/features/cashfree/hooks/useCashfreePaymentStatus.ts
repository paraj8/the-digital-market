import {
  useQuery,
} from "@tanstack/react-query";

import {
  getCashfreePaymentStatus,
} from "../api/cashfreeApi";

import type {
  CashfreePaymentStatus,
} from "../types/cashfree";

/*
====================================
FINAL CASHFREE STATUSES
====================================
*/

const FINAL_STATUSES = [
  "PAID",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
];

/*
====================================
HOOK
====================================
*/

export function useCashfreePaymentStatus(
  orderId?: string,
  enabled = true
) {
  const query = useQuery<
    {
      success: boolean;
      message: string;
      data: CashfreePaymentStatus;
    },
    Error
  >({
    queryKey: [
      "cashfree-payment-status",
      orderId,
    ],

    queryFn: () =>
      getCashfreePaymentStatus(
        orderId as string
      ),

    enabled:
      Boolean(orderId) &&
      enabled,

    /*
    ====================================
    POLLING
    ====================================
    
    Continue checking while the payment
    has not reached a final state.
    */

    refetchInterval: (
      query
    ) => {
      const status =
        query.state.data?.data
          ?.order_status
          ?.toUpperCase();

      if (
        status &&
        FINAL_STATUSES.includes(
          status
        )
      ) {
        return false;
      }

      return 2000;
    },

    /*
    Don't refetch unnecessarily
    when the user switches tabs.
    */

    refetchOnWindowFocus: false,

    /*
    Payment status should always
    start from a fresh request.
    */

    staleTime: 0,
  });

  /*
  ====================================
  STATUS
  ====================================
  */

  const status =
    query.data?.data
      ?.order_status
      ?.toUpperCase() ?? null;

  /*
  ====================================
  NORMALIZED STATES
  ====================================
  */

  const isPending =
    status === "ACTIVE" ||
    status === "PENDING";

  const isPaid =
    status === "PAID";

  const isFailed =
    status === "FAILED";

  const isCancelled =
    status === "CANCELLED";

  const isExpired =
    status === "EXPIRED";

  const isCompleted =
    isPaid ||
    isFailed ||
    isCancelled ||
    isExpired;

  /*
  ====================================
  RETURN
  ====================================
  */

  return {
    /*
    Raw Cashfree status
    */

    status,

    payment:
      query.data?.data ??
      null,

    /*
    State helpers
    */

    isPending,

    isPaid,

    isFailed,

    isCancelled,

    isExpired,

    isCompleted,

    /*
    React Query state
    */

    loading:
      query.isLoading,

    fetching:
      query.isFetching,

    error:
      query.error,

    /*
    Manual status check
    */

    refetch:
      query.refetch,
  };
}