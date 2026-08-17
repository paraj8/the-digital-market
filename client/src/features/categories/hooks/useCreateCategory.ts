import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCategory } from "../api/categoryApi";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      createCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};