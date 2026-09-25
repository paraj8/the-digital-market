import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

interface MobileProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  onWishlist: () => void;
  addingToCart: boolean;
  isWishlisted: boolean;
  wishlistPending: boolean;
}

function MobileProductActions({
  onAddToCart,
  onBuyNow,
  onWishlist,
  addingToCart,
  isWishlisted,
  wishlistPending,
}: MobileProductActionsProps) {
  return (
    <div className="mt-6 grid grid-cols-[1fr_1fr_auto] gap-2">
      <button
        type="button"
        onClick={onAddToCart}
        disabled={addingToCart}
        className="min-h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-3 text-sm font-semibold disabled:opacity-50"
      >
        {addingToCart ? "Adding..." : "Add To Cart"}
      </button>

      <button
        type="button"
        onClick={onBuyNow}
        className="min-h-12 rounded-xl border border-white/10 bg-[#121826] px-3 text-sm font-semibold hover:border-violet-500/50"
      >
        Buy Now
      </button>

      <button
        type="button"
        onClick={onWishlist}
        disabled={wishlistPending}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/10 bg-[#121826] hover:border-pink-500 hover:bg-pink-500/10"
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

export default MobileProductActions;
