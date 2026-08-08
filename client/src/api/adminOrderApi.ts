import API from "./axios";

export interface AdminOrder {
  _id: string;

  user: {
    _id: string;
    fullName: string;
    email: string;
  };

  items: {
    product: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];

  shippingAddress: {
    _id: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    addressType:
      | "home"
      | "office"
      | "other";
  };

  coupon: {
    _id: string;
    code: string;
    discountType: string;
    discountValue: number;
  } | null;

  subtotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  totalAmount: number;

  paymentMethod:
    | "cod"
    | "razorpay"
    | "stripe";

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

  notes: string;

  createdAt: string;
  updatedAt: string;
}

interface AdminOrdersResponse {
  success: boolean;
  data: AdminOrder[];
}

interface AdminOrderResponse {
  success: boolean;
  message: string;
  data: AdminOrder;
}

export const getAllOrders =
  async (): Promise<AdminOrdersResponse> => {
    const response =
      await API.get<AdminOrdersResponse>(
        "/orders/admin/all"
      );

    return response.data;
  };

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: AdminOrder["orderStatus"]
): Promise<AdminOrderResponse> => {
  const response =
    await API.patch<AdminOrderResponse>(
      `/orders/${orderId}/status`,
      {
        orderStatus,
      }
    );

  return response.data;
};

