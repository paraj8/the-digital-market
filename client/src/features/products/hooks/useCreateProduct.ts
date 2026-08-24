import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productApi";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      createProduct(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};