import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCategory,
  type CategoryFormData,
} from "../api/categoryApi";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CategoryFormData
    ) => createCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};