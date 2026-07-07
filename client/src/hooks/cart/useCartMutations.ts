import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/cartApi";

export const useAddToCart =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
      }) =>
        addToCart(
          productId,
          quantity
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: ["cart"],
          }
        );
      },
    });
  };

export const useUpdateCartItem =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        itemId,
        quantity,
      }: {
        itemId: string;
        quantity: number;
      }) =>
        updateCartItem(
          itemId,
          quantity
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: ["cart"],
          }
        );
      },
    });
  };

export const useRemoveCartItem =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        removeCartItem,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: ["cart"],
          }
        );
      },
    });
  };

export const useClearCart =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: clearCart,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: ["cart"],
          }
        );
      },
    });
  };