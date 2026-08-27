import api from "../../../api/axios";
import type { Product } from "../types/product";

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  featured?: boolean;
  deals?: boolean;
  inStock?: boolean;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getProducts = async (
  query: ProductQuery
): Promise<ProductResponse> => {
  const response =
    await api.get<ProductResponse>(
      "/products",
      {
        params: query,
      }
    );

  return response.data;
};

export const getProductBySlug =
  async (slug: string) => {
    const response =
      await api.get(
        `/products/slug/${slug}`
      );

    return response.data.data;
  };

export const getProductsByCategory =
  async (categoryId: string) => {
    const response =
      await api.get(
        "/products",
        {
          params: {
            category: categoryId,
            limit: 8,
          },
        }
      );

    return response.data.data;
  };