
import API from "../../../api/axios";

import type {
  CreateCashfreeOrderRequest,
  CreateCashfreeOrderResponse,
  CashfreePaymentStatusResponse,
} from "../types/cashfree";

/*
====================================
CREATE CASHFREE PAYMENT ORDER
====================================
*/

export const createCashfreeOrder =
  async (
    data: CreateCashfreeOrderRequest
  ): Promise<CreateCashfreeOrderResponse> => {
    const response =
      await API.post<CreateCashfreeOrderResponse>(
        "/cashfree/create-order",
        data
      );

    return response.data;
  };

/*
====================================
GET CASHFREE PAYMENT STATUS
====================================
*/

export const getCashfreePaymentStatus =
  async (
    orderId: string
  ): Promise<CashfreePaymentStatusResponse> => {
    const response =
      await API.get<CashfreePaymentStatusResponse>(
        `/cashfree/payment-status/${orderId}`
      );

    return response.data;
  };
