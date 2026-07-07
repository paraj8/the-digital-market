import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
  type ProductQuery,
} from "../../api/productApi";

export const useProducts = (
  query: ProductQuery
) => {
  return useQuery({
    queryKey: [
      "products",
      query,
    ],

    queryFn: () =>
      getProducts(query),
  });
};