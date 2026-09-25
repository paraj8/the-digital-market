import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

export interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onWishlist: () => void;
  addingToCart: boolean;
  isWishlisted: boolean;
  wishlistPending: boolean;
}

function ProductActions({
  onAddToCart,
  onBuyNow,
  onWishlist,
  addingToCart,
  isWishlisted,
  wishlistPending,
}: ProductActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onAddToCart}
        disabled={addingToCart}
        className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-50"
      >
        {addingToCart ? "Adding..." : "Add To Cart"}
      </button>

      <button
        type="button"
        onClick={onBuyNow}
        className="flex-1 rounded-xl border border-white/10 bg-[#121826] py-3 font-semibold transition hover:border-violet-500/50 hover:scale-[1.02]"
      >
        Buy Now
      </button>

      <button
        type="button"
        onClick={onWishlist}
        disabled={wishlistPending}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#121826] transition hover:border-pink-500 hover:bg-pink-500/10"
      >
        {isWishlisted ? (
          <FaHeart className="text-pink-500" size={20} />
        ) : (
          <FiHeart size={20} />
        )}
      </button>
    </div>
  );
}

export default ProductActions;
