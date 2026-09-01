import API from "../../../api/axios";

import type {
  PaymentMethod,
} from "../types/checkout";

export interface CreateCheckoutOrderRequest {
  addressId: string;
  couponCode?: string;
  paymentMethod: PaymentMethod;
}

export interface CheckoutOrder {
  _id: string;

  user: string;

  items: {
    product: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];

  shippingAddress: string;

  coupon: string | null;

  subtotal: number;
  discount: number;
  tax: number;
  shippingCharge: number;
  totalAmount: number;

  paymentMethod: PaymentMethod;

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  createdAt: string;
  updatedAt: string;
}

export interface CreateCheckoutOrderResponse {
  success: boolean;
  message: string;
  data: CheckoutOrder;
}

/*
====================================
CREATE PENDING ORDER
====================================
*/

export const createCheckoutOrder = async (
  data: CreateCheckoutOrderRequest
): Promise<CreateCheckoutOrderResponse> => {
  const response =
    await API.post<CreateCheckoutOrderResponse>(
      "/orders",
      data
    );

  return response.data;
};
