import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCategory,
  type UpdateCategoryData,
} from "../api/categoryApi";

interface UpdateCategoryParams {
  id: string;
  data: UpdateCategoryData;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateCategoryParams) =>
      updateCategory(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};