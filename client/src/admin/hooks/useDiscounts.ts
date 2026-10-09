import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createDiscount,
  deleteDiscount,
  getDiscountById,
  getDiscounts,
  updateDiscount,
} from "../api/discountApi";
import type { DiscountPayload } from "../../shared/types/discount";

export const discountQueryKey = ["admin", "discounts"] as const;
const availableDiscountQueryKey = ["discounts", "available"] as const;

export const useDiscounts = () =>
  useQuery({
    queryKey: discountQueryKey,
    queryFn: getDiscounts,
  });

export const useDiscount = (id: string | null) =>
  useQuery({
    queryKey: [...discountQueryKey, id],
    queryFn: () => getDiscountById(id as string),
    enabled: Boolean(id),
  });

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: DiscountPayload) => createDiscount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountQueryKey });
      queryClient.invalidateQueries({ queryKey: availableDiscountQueryKey });
    },
  });
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DiscountPayload> }) =>
      updateDiscount(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: discountQueryKey });
      queryClient.invalidateQueries({ queryKey: [...discountQueryKey, id] });
      queryClient.invalidateQueries({ queryKey: availableDiscountQueryKey });
    },
  });
};

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discountQueryKey });
      queryClient.invalidateQueries({ queryKey: availableDiscountQueryKey });
    },
  });
};
