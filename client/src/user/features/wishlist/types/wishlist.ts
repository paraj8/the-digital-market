import type { Product } from "../../../../shared/types/product";

export interface WishlistItem {
  _id: string;

  user: string;

  product: Product;

  createdAt: string;

  updatedAt: string;
}