
import {
  useMutation,
} from "@tanstack/react-query";

import {
  createCashfreeOrder,
} from "../api/cashfreeApi";

import {
  openCashfreeCheckout,
} from "../utils/cashfree";

import type {
  CreateCashfreeOrderRequest,
  CreateCashfreeOrderResponse,
} from "../types/cashfree";

/*
====================================
CASHFREE HOOK
====================================
*/

export function useCashfree() {
  /*
  ====================================
  CREATE PAYMENT ORDER
  ====================================
  */

  const createOrderMutation =
    useMutation<
      CreateCashfreeOrderResponse,
      Error,
      CreateCashfreeOrderRequest
    >({
      mutationFn:
        createCashfreeOrder,
    });

  /*
  ====================================
  CREATE PAYMENT ORDER
  ====================================
  */

  const createPaymentOrder =
    async (
      data: CreateCashfreeOrderRequest
    ) => {
      return await createOrderMutation.mutateAsync(
        data
      );
    };

  /*
  ====================================
  OPEN CHECKOUT
  ====================================
  */

  const openCheckout =
    async (
      paymentSessionId: string
    ) => {
      return await openCashfreeCheckout(
        paymentSessionId
      );
    };

  /*
  ====================================
  RETURN
  ====================================
  */

  return {
    createPaymentOrder,

    openCheckout,

    paymentSessionId:
      createOrderMutation.data
        ?.data
        ?.payment_session_id ??
      null,

    cashfreeOrder:
      createOrderMutation.data
        ?.data ??
      null,

    creatingOrder:
      createOrderMutation.isPending,

    createError:
      createOrderMutation.error,

    reset:
      createOrderMutation.reset,
  };
}

