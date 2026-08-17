import type { Product } from "../../products/types/product";

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