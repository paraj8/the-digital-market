import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateCategory,
  type CategoryFormData,
} from "../api/categoryApi";

interface UpdateCategoryParams {
  id: string;
  data: CategoryFormData;
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