import type { Product } from "./product";

export interface CartItem {
  _id: string;

  quantity: number;

  subtotal: number;

  product: Product;
}

export interface CartResponse {
  items: CartItem[];

  totalItems: number;

  totalAmount: number;
}