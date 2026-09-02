import API from "../../../api/axios";

import type {
  PaymentMethod,
} from "../types/checkout";

/*
====================================
CREATE CHECKOUT ORDER REQUEST
====================================
*/

export interface CreateCheckoutOrderRequest {
  addressId: string;

  couponCode?: string;

  paymentMethod: PaymentMethod;

  mode: "cart" | "buyNow";

  /*
  Required only for Buy Now
  */

  productId?: string;

  quantity?: number;
}

/*
====================================
CHECKOUT ORDER
====================================
*/

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

  checkoutMode:
    | "cart"
    | "buyNow";

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

/*
====================================
CREATE CHECKOUT ORDER RESPONSE
====================================
*/

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

export const createCheckoutOrder =
  async (
    data: CreateCheckoutOrderRequest
  ): Promise<CreateCheckoutOrderResponse> => {
    const response =
      await API.post<CreateCheckoutOrderResponse>(
        "/orders",
        data
      );

    return response.data;
  };