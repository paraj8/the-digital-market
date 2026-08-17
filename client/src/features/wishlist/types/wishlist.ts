import type { Product } from "../../products/types/product";

export interface WishlistItem {
  _id: string;

  user: string;

  product: Product;

  createdAt: string;

  updatedAt: string;
}