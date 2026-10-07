import type { Coupon as SharedCoupon } from "../../../../shared/types/coupon";

export type CustomerCoupon = SharedCoupon;

export interface CouponValidationRequest {
  code: string;
  orderAmount: number;
  items?: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface CouponValidationResult {
  coupon: CustomerCoupon;
  discount: number;
  finalAmount: number;
}
