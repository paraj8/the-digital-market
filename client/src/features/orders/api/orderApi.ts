import api from "../../../api/axios";

import type {
  Order,
  OrderItem,
} from "../types/order";

/*
====================================
ORDER LIST TYPE
====================================
*/

export interface OrderSummary {
  _id: string;

  items: OrderItem[];

  totalAmount: number;

  checkoutMode:
    | "cart"
    | "buyNow";

  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

  paymentMethod:
    | "CashFree";

  createdAt: string;
}

/*
====================================
API RESPONSE TYPES
====================================
*/

interface OrdersResponse {
  success: boolean;

  data: OrderSummary[];
}

interface OrderResponse {
  success: boolean;

  data: Order;
}

/*
====================================
GET MY ORDERS
====================================
*/

export const getOrders =
  async (): Promise<OrderSummary[]> => {
    const response =
      await api.get<OrdersResponse>(
        "/orders"
      );

    return response.data.data;
  };

/*
====================================
GET SINGLE ORDER
====================================
*/

export const getOrderById =
  async (
    orderId: string
  ): Promise<Order> => {
    const response =
      await api.get<OrderResponse>(
        `/orders/${orderId}`
      );

    return response.data.data;
  };

/*
====================================
CREATE ORDER
====================================
*/

export const createOrder =
  async (
    checkoutData: unknown
  ): Promise<Order> => {
    const response =
      await api.post<OrderResponse>(
        "/orders",
        checkoutData
      );

    return response.data.data;
  };