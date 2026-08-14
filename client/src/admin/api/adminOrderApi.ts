import API from "../../api/axios";

export type AdminOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

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
    addressType: "home" | "office" | "other";
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

  paymentMethod: "cod" | "razorpay" | "stripe";

  paymentStatus:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

  orderStatus: AdminOrderStatus;

  notes: string;

  createdAt: string;
  updatedAt: string;
}

export interface AdminOrderPagination {
  currentPage: number;
  limit: number;
  totalOrders: number;
  totalPages: number;
}

export interface AdminOrdersResponse {
  success: boolean;
  data: AdminOrder[];
  pagination: AdminOrderPagination;
}

export interface AdminOrderResponse {
  success: boolean;
  message: string;
  data: AdminOrder;
}

export interface GetAllOrdersParams {
  page?: number;
  limit?: number;
  status?: AdminOrderStatus | "all";
  search?: string;
}

export const getAllOrders = async ({
  page = 1,
  limit = 20,
  status = "all",
  search = "",
}: GetAllOrdersParams = {}): Promise<AdminOrdersResponse> => {
  const response = await API.get<AdminOrdersResponse>(
    "/orders/admin/all",
    {
      params: {
        page,
        limit,
        status: status === "all" ? undefined : status,
        search: search.trim() || undefined,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: AdminOrderStatus
): Promise<AdminOrderResponse> => {
  const response = await API.patch<AdminOrderResponse>(
    `/orders/${orderId}/status`,
    {
      orderStatus,
    }
  );

  return response.data;
};