export interface CreateRazorpayOrderRequest {
  orderId: string;
}

export interface CreateRazorpayOrderResponse {
  success: boolean;
  message: string;
  data: {
    keyId: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
  };
}

export interface VerifyRazorpayPaymentRequest {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentStatusResponse {
  success: boolean;
  data: {
    application_order_status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
    application_payment_status: "pending" | "paid" | "failed" | "refunded";
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
  };
}
