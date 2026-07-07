import { useQuery } from "@tanstack/react-query";

import { getProductBySlug } from "../../api/productApi";

export const useProduct = (
  slug: string
) => {
  return useQuery({
    queryKey: [
      "product",
      slug,
    ],

    queryFn: () =>
      getProductBySlug(slug),

    enabled: !!slug,
  });
};