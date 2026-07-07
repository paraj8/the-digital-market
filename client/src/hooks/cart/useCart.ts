import { useQuery } from "@tanstack/react-query";

import { getCart } from "../../api/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],

    queryFn: getCart,
  });
};