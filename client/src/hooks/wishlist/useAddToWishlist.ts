import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { addToWishlist } from "../../api/wishlistApi";

export const useAddToWishlist =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: addToWishlist,

      onSuccess: () => {
        toast.success(
          "Added to wishlist"
        );

        queryClient.invalidateQueries(
          {
            queryKey: ["wishlist"],
          }
        );
      },

      onError: () => {
        toast.error(
          "Already in wishlist"
        );
      },
    });
  };