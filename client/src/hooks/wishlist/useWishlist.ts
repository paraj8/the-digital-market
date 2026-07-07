import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "../../api/wishlistApi";
import { useAddToWishlist } from "./useAddToWishlist";
import { useRemoveFromWishlist } from "./useRemoveFromWishlist";

export const useWishlist = (
  productId?: string
) => {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const addMutation =
    useAddToWishlist();

  const removeMutation =
    useRemoveFromWishlist();

  const wishlist =
    query.data ?? [];

  const isWishlisted = productId
    ? wishlist.some(
        (item: {
          product: {
            _id: string;
          };
        }) =>
          item.product._id ===
          productId
      )
    : false;

  const toggleWishlist = () => {
    if (!productId) return;

    if (isWishlisted) {
      removeMutation.mutate(
        productId
      );
    } else {
      addMutation.mutate(
        productId
      );
    }
  };

  return {
    ...query,
    wishlist,
    isWishlisted,
    toggleWishlist,
    isLoading:
      query.isLoading ||
      addMutation.isPending ||
      removeMutation.isPending,
  };
};