import { useQuery } from "@tanstack/react-query";

import { getFilterOptions } from "../api/filterApi";

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: getFilterOptions,
    staleTime: 1000 * 60 * 10,
  });
};