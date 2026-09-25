export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type CheckoutMode =
  | "cart"
  | "buyNow";

export type PaymentMethod =
  | "CashFree";

export interface OrderItem {
  product: string;

  title: string;

  image: string;

  price: number;

  quantity: number;

  subtotal: number;
}

export interface ShippingAddress {
  _id?: string;

  fullName: string;

  phone: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  addressType: "home" | "office" | "other";

  isDefault?: boolean;
}

export interface Order {
  _id: string;

  user: string;

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  coupon: string | null;

  subtotal: number;

  discount: number;

  shippingCharge: number;

  tax: number;

  totalAmount: number;

  checkoutMode: CheckoutMode;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;

  orderStatus: OrderStatus;

  notes: string;

  createdAt: string;

  updatedAt: string;
}