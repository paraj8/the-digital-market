import api from "../../../../api/axios";

import type { CartResponse } from "../types/cart";

const getAuthHeader = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getCart =
  async (): Promise<CartResponse> => {
    const response =
      await api.get("/cart", {
        headers: getAuthHeader(),
      });

    return response.data.data;
  };

export const addToCart = async (
  productId: string,
  quantity = 1
) => {
  const response =
    await api.post(
      "/cart",
      {
        productId,
        quantity,
      },
      {
        headers:
          getAuthHeader(),
      }
    );

  return response.data;
};

export const updateCartItem =
  async (
    itemId: string,
    quantity: number
  ) => {
    const response =
      await api.patch(
        `/cart/${itemId}`,
        {
          quantity,
        },
        {
          headers:
            getAuthHeader(),
        }
      );

    return response.data;
  };

export const removeCartItem =
  async (itemId: string) => {
    const response =
      await api.delete(
        `/cart/${itemId}`,
        {
          headers:
            getAuthHeader(),
        }
      );

    return response.data;
  };

export const clearCart =
  async () => {
    const response =
      await api.delete("/cart", {
        headers:
          getAuthHeader(),
      });

    return response.data;
  };