/*
====================================
CASHFREE CUSTOMER
====================================
*/

export interface CashfreeCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

/*
====================================
CREATE CASHFREE ORDER
====================================
*/

export interface CreateCashfreeOrderRequest {
  orderId: string;
  amount: number;
  customer: CashfreeCustomer;
  returnUrl?: string;
  notifyUrl?: string;
}

/*
====================================
CASHFREE ORDER DATA
====================================
*/

export interface CashfreeOrderData {
  cf_order_id: string;
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  payment_session_id: string;
}

/*
====================================
CREATE ORDER RESPONSE
====================================
*/

export interface CreateCashfreeOrderResponse {
  success: boolean;
  message: string;
  data: CashfreeOrderData;
}

/*
====================================
CASHFREE PAYMENT
====================================
*/

export interface CashfreePayment {
  cf_payment_id?: string;

  cf_order_id?: string;

  order_id?: string;

  payment_status?: string;

  payment_amount?: number;

  payment_currency?: string;

  payment_message?: string;

  payment_time?: string;

  payment_method?: unknown;
}

/*
====================================
PAYMENT STATUS
====================================
*/

export interface CashfreePaymentStatus {
  cf_order_id?: string;

  order_id: string;

  order_amount: number;

  order_currency: string;

  order_status?: string;

  order_expiry_time?: string;

  /*
  --------------------------------
  APPLICATION STATUS
  --------------------------------
  */

  application_order_status?:
    | string
    | null;

  application_payment_status?:
    | string
    | null;

  /*
  --------------------------------
  CASHFREE PAYMENTS
  --------------------------------
  */

  payments?: CashfreePayment[];
}

/*
====================================
PAYMENT STATUS RESPONSE
====================================
*/

export interface CashfreePaymentStatusResponse {
  success: boolean;

  message: string;

  data: CashfreePaymentStatus;
}