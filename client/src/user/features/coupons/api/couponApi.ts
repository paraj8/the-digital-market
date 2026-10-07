import api from "../../../../api/axios";

import type {
  CouponValidationRequest,
  CouponValidationResult,
  CustomerCoupon,
} from "../types/coupon";

export const getAvailableCoupons = async (
  productId?: string
): Promise<CustomerCoupon[]> => {
  const response = await api.get("/coupons/available", {
    params: productId ? { productId } : undefined,
  });
  return response.data?.data ?? [];
};

export const validateCoupon = async ({
  code,
  orderAmount,
  items,
}: CouponValidationRequest): Promise<CouponValidationResult> => {
  const response = await api.post("/coupons/validate", {
    code,
    orderAmount,
    items,
  });

  return response.data.data;
};
