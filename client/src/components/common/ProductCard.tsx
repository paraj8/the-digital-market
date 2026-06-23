import { FiHeart } from "react-icons/fi";

import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({
  product,
}: ProductCardProps) {
  const displayPrice =
    product.salePrice > 0
      ? product.salePrice
      : product.price;

  const hasDiscount =
    product.salePrice > 0 &&
    product.salePrice < product.price;

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#121826]
        transition
        hover:-translate-y-1
        hover:border-violet-500/40
      "
    >
      {/* Image */}

      <div className="relative aspect-square bg-slate-800">
        <button
          className="
            absolute
            right-3
            top-3
            z-10
            rounded-full
            bg-black/40
            p-2
            backdrop-blur
          "
        >
          <FiHeart />
        </button>

        <img
          src={
            product.images?.[0] ||
            "https://placehold.co/600x600"
          }
          alt={product.title}
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* Content */}

      <div className="p-3">
        <h3
          className="
            line-clamp-2
            text-sm
            font-medium
          "
        >
          {product.title}
        </h3>

        <p
          className="
            mt-2
            text-xs
            text-slate-400
          "
        >
          {product.brand}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-bold">
            ₹{displayPrice}
          </span>

          {hasDiscount && (
            <span
              className="
                text-xs
                text-slate-500
                line-through
              "
            >
              ₹{product.price}
            </span>
          )}
        </div>

        <button
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-blue-600
            py-1.5
            text-sm
            font-medium
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;