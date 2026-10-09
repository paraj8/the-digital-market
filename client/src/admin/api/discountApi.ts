import api from "../../api/axios";
import type { Discount, DiscountPayload } from "../../shared/types/discount";

interface DiscountsResponse {
  success: boolean;
  data: Discount[];
}

interface DiscountResponse {
  success: boolean;
  message?: string;
  data: Discount;
}

export const getDiscounts = async (): Promise<Discount[]> => {
  const response = await api.get<DiscountsResponse>("/discounts");
  return response.data.data;
};

export const getDiscountById = async (id: string): Promise<Discount> => {
  const response = await api.get<DiscountResponse>(`/discounts/${id}`);
  return response.data.data;
};

export const createDiscount = async (payload: DiscountPayload): Promise<Discount> => {
  const response = await api.post<DiscountResponse>("/discounts", payload);
  return response.data.data;
};

export const updateDiscount = async (
  id: string,
  payload: Partial<DiscountPayload>
): Promise<Discount> => {
  const response = await api.patch<DiscountResponse>(`/discounts/${id}`, payload);
  return response.data.data;
};

export const deleteDiscount = async (id: string): Promise<void> => {
  await api.delete(`/discounts/${id}`);
};
