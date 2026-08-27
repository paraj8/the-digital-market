import api from "../../api/axios";
import type { Product } from "../../features/products/types/product";

export interface AdminProductResponse {
  success: boolean;
  message?: string;
  data: Product;
}

export interface AdminDeleteProductResponse {
  success: boolean;
  message: string;
}

export const getAdminProductById = async (
  id: string
): Promise<Product> => {
  const response =
    await api.get<AdminProductResponse>(
      `/admin/products/${id}`
    );

  return response.data.data;
};

export const createProduct = async (
  data: FormData
): Promise<Product> => {
  const response =
    await api.post<AdminProductResponse>(
      "/admin/products",
      data
    );

  return response.data.data;
};

export const updateProduct = async (
  id: string,
  data: FormData
): Promise<Product> => {
  const response =
    await api.put<AdminProductResponse>(
      `/admin/products/${id}`,
      data
    );

  return response.data.data;
};

export const deleteProduct = async (
  id: string
): Promise<AdminDeleteProductResponse> => {
  const response =
    await api.delete<AdminDeleteProductResponse>(
      `/admin/products/${id}`
    );

  return response.data;
};