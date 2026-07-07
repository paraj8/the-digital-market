import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { removeFromWishlist } from "../../api/wishlistApi";

export const useRemoveFromWishlist =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        removeFromWishlist,

      onSuccess: () => {
        toast.success(
          "Removed from wishlist"
        );

        queryClient.invalidateQueries(
          {
            queryKey: ["wishlist"],
          }
        );
      },

      onError: () => {
        toast.error(
          "Something went wrong"
        );
      },
    });
  };