export type CouponDiscountType = "percentage" | "fixed";

export interface CouponProductReference {
  _id: string;
  title: string;
  images: Array<{ url: string }>;
  price: number;
  salePrice: number;
}

export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: CouponDiscountType;
  scope?: "all" | "products";
  products?: Array<string | CouponProductReference | null>;
  discountValue: number;
  minimumOrderAmount: number;
  maximumDiscountAmount: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
