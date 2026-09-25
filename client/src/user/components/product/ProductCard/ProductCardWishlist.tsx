import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { toast } from "react-hot-toast";

import { useWishlist } from "../../../features/wishlist/hooks/useWishlist";

interface ProductCardWishlistProps {
  productId: string;
}

function ProductCardWishlist({
  productId,
}: ProductCardWishlistProps) {
  const {
    isWishlisted,
    toggleWishlist,
  } = useWishlist(productId);

  const handleWishlist = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const token =
      localStorage.getItem("token");

    if (!token) {
      toast("Please login first");
      return;
    }

    toggleWishlist();
  };

  return (
    <button
      onClick={handleWishlist}
      className="
        absolute
        right-3
        top-3
        z-10

        rounded-full

        bg-black/40

        p-2

        backdrop-blur

        transition
        hover:scale-110
      "
    >
      {isWishlisted ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FiHeart />
      )}
    </button>
  );
}

export default ProductCardWishlist;