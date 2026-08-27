import { useQuery } from "@tanstack/react-query";

import { getAdminProductById } from "../api/adminProductApi";

export const useAdminProduct = (
  id: string | null
) => {
  return useQuery({
    queryKey: ["admin-product", id],
    queryFn: () =>
      getAdminProductById(id as string),
    enabled: Boolean(id),
  });
};