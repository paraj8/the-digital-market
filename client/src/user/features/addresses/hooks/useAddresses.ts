import { useQuery } from "@tanstack/react-query";

import { getAddresses } from "../api/addressApi";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};