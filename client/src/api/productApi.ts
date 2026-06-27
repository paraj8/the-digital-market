import api from "./axios";
import type { Product } from "../types/product";

interface ProductResponse {
  success: boolean;
  data: Product[];
}

export const getProducts =
  async (): Promise<Product[]> => {
    const response =
      await api.get<ProductResponse>(
        "/products"
      );

    return response.data.data;
  };



  export const getProductBySlug = async (
  slug: string
) => {
  const response = await api.get(
    `/products/slug/${slug}`
  );

  return response.data.data;
};


export const getProductsByCategory = async (
  categoryId: string
) => {
  const response = await api.get(
    `/products?category=${categoryId}&limit=8`
  );

  return response.data.data;
};