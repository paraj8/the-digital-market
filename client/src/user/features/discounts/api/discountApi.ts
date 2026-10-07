import api from "../../../../api/axios";
import type { Discount } from "../../../../shared/types/discount";

interface DiscountsResponse {
  success: boolean;
  data: Discount[];
}

export const getAvailableDiscounts = async (): Promise<Discount[]> => {
  const response = await api.get<DiscountsResponse>("/discounts/available");
  return response.data.data;
};
