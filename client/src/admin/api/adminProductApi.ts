import api from "../../api/axios";
import type { Product } from "../../features/products/types/product";

export interface AdminProductResponse {
  success: boolean;
  message?: string;
  data: Product;
}

export const updateProduct = async (
  id: string,
  data: FormData
): Promise<Product> => {
  const response =
    await api.put<AdminProductResponse>(
      `/products/${id}`,
      data
    );

  return response.data.data;
};

export const deleteProduct = async (
  id: string
): Promise<void> => {
  await api.delete(`/products/${id}`);
};