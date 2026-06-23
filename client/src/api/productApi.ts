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