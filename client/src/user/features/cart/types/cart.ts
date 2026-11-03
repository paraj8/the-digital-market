import type {
  Product,
  ProductVariant,
} from "../../../../shared/types/product";

export interface CartItem {
  _id: string;

  quantity: number;

  subtotal: number;

  product: Product;

  variantId?: string | null;
  variantAttributes?: Record<string, string>;
  variant?: ProductVariant | null;
  variantUnavailable?: boolean;
}

export interface CartResponse {
  items: CartItem[];

  totalItems: number;

  totalAmount: number;
}