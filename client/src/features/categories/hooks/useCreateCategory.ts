import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  type CreateCategoryData,
} from "../api/categoryApi";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryData) =>
      createCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};