import API from "../../api/axios";
import type { Coupon } from "../../shared/types/coupon";

export interface AdminCouponsResponse {
  success: boolean;
  data: Coupon[];
}

export interface AdminCouponResponse {
  success: boolean;
  message?: string;
  data: Coupon;
}

export interface CouponPayload {
  code?: string;
  description?: string;
  discountType?: "percentage" | "fixed";
  scope?: "all" | "products";
  products?: string[];
  discountValue?: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await API.get<AdminCouponsResponse>("/coupons");

  return response.data.data;
};

export const getCouponById = async (
  id: string
): Promise<Coupon> => {
  const response = await API.get<AdminCouponResponse>(`/coupons/${id}`);

  return response.data.data;
};

export const createCoupon = async (
  data: CouponPayload
): Promise<Coupon> => {
  const response = await API.post<AdminCouponResponse>("/coupons", data);

  return response.data.data;
};

export const updateCoupon = async (
  id: string,
  data: CouponPayload
): Promise<Coupon> => {
  const response = await API.patch<AdminCouponResponse>(`/coupons/${id}`, data);

  return response.data.data;
};

export const deleteCoupon = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await API.delete<{ success: boolean; message: string }>(`/coupons/${id}`);

  return response.data;
};
