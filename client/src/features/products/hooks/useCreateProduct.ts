import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../admin/api/adminProductApi";

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


//Check is in use or not