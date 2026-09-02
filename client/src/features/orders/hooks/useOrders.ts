import {
  useQuery,
} from "@tanstack/react-query";

import {
  getOrders,
} from "../api/orderApi";

export const useOrders =
  () => {
    return useQuery({
      queryKey: ["orders"],
      queryFn: getOrders,
    });
  };