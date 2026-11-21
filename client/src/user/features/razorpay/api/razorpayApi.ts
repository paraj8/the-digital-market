import API from "../../../../api/axios";
import type {
  CreateRazorpayOrderRequest,
  CreateRazorpayOrderResponse,
  RazorpayPaymentStatusResponse,
  VerifyRazorpayPaymentRequest,
} from "../types/razorpay";

export const createRazorpayOrder = async (
  data: CreateRazorpayOrderRequest
): Promise<CreateRazorpayOrderResponse> => {
  const response = await API.post<CreateRazorpayOrderResponse>(
    "/razorpay/create-order",
    data
  );
  return response.data;
};

export const verifyRazorpayPayment = async (
  data: VerifyRazorpayPaymentRequest
) => {
  const response = await API.post(
    "/razorpay/verify-payment",
    data
  );
  return response.data;
};

export const markRazorpayPaymentFailed = async (
  orderId: string,
  reason?: string
) => {
  const response = await API.post(
    "/razorpay/payment-failed",
    { orderId, reason }
  );
  return response.data;
};

export const getRazorpayPaymentStatus = async (
  orderId: string
): Promise<RazorpayPaymentStatusResponse> => {
  const response = await API.get<RazorpayPaymentStatusResponse>(
    `/razorpay/payment-status/${orderId}`
  );
  return response.data;
};
