export type DiscountType = "percentage" | "fixed";
export type DiscountScope = "all" | "products" | "categories";

export interface DiscountProductReference {
  _id: string;
  title: string;
  images: Array<{ url: string }>;
  price: number;
  salePrice: number;
}

export interface DiscountCategoryReference {
  _id: string;
  name: string;
}

export interface Discount {
  _id: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  scope: DiscountScope;
  products: Array<string | DiscountProductReference | null>;
  categories: Array<string | DiscountCategoryReference | null>;
  minimumOrderAmount: number;
  maximumDiscountAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscountPayload {
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  scope: DiscountScope;
  products: string[];
  categories: string[];
  minimumOrderAmount: number;
  maximumDiscountAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
