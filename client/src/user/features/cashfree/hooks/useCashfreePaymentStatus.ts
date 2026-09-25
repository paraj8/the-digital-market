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
FINAL APPLICATION STATUSES
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

    Use our application's payment status,
    not CashFree's order_status.

    CashFree order_status can remain ACTIVE
    even when an individual payment fails.
    */

    refetchInterval: (
      query
    ) => {
      const status =
        query.state.data?.data
          ?.application_payment_status
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
    ====================================
    QUERY OPTIONS
    ====================================
    */

    refetchOnWindowFocus: false,

    staleTime: 0,
  });

  /*
  ====================================
  APPLICATION PAYMENT STATUS
  ====================================
  */

  const status =
    query.data?.data
      ?.application_payment_status
      ?.toUpperCase() ?? null;

  /*
  ====================================
  NORMALIZED STATES
  ====================================
  */

  const isPending =
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
    Application payment status
    */

    status,

    /*
    Complete payment response
    */

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