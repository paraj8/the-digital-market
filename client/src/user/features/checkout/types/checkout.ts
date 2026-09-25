export interface CheckoutAddress {
  _id: string;

  fullName: string;

  phone: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;

  postalCode: string;

  country: string;

  isDefault?: boolean;
}

export interface CheckoutItem {
  productId: string;

  title: string;

  slug: string;

  image: string;

  brand?: string;

  price: number;

  salePrice: number;

  quantity: number;
}

export type PaymentMethod =
  | "CashFree";

export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
}