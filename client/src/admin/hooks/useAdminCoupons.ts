import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCoupon,
  deleteCoupon,
  getCouponById,
  getCoupons,
  updateCoupon,
  type CouponPayload,
} from "../api/adminCouponApi";

export const useAdminCoupons = () => {
  return useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: getCoupons,
  });
};

export const useAdminCoupon = (id: string | null) => {
  return useQuery({
    queryKey: ["admin", "coupons", id],
    queryFn: () => getCouponById(id as string),
    enabled: Boolean(id),
  });
};

export const useCreateAdminCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CouponPayload) => createCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "coupons"],
      });
    },
  });
};

export const useUpdateAdminCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CouponPayload }) =>
      updateCoupon(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "coupons"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin", "coupons", variables.id],
      });
    },
  });
};

export const useDeleteAdminCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "coupons"],
      });
    },
  });
};

export const useCoupons = useAdminCoupons;
export const useCoupon = useAdminCoupon;
export const useCreateCoupon = useCreateAdminCoupon;
export const useUpdateCoupon = useUpdateAdminCoupon;
export const useDeleteCoupon = useDeleteAdminCoupon;