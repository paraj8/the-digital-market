import { useQuery } from "@tanstack/react-query";

import { getProductsByCategory } from "../../api/productApi";

export const useRelatedProducts = (
  categoryId: string
) => {
  return useQuery({
    queryKey: [
      "related-products",
      categoryId,
    ],

    queryFn: () =>
      getProductsByCategory(
        categoryId
      ),

    enabled: !!categoryId,
  });
};