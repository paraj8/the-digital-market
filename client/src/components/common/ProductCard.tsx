import { FiHeart } from "react-icons/fi";

function ProductCard() {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#121826]
        transition
        hover:border-violet-500/40
        hover:-translate-y-1
      "
    >
      {/* Product Image */}

      <div
        className="
          relative
          aspect-square
          bg-slate-800
        "
      >
        <button
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-black/40
            p-2
            backdrop-blur
          "
        >
          <FiHeart />
        </button>

        <img
          src="https://placehold.co/600x600"
          alt="product"
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* Content */}

      <div className="p-4">
        <h3
          className="
            line-clamp-2
            font-medium
          "
        >
          Wireless Gaming Mouse
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          Electronics
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold">
            ₹999
          </span>

          <span
            className="
              text-sm
              text-slate-500
              line-through
            "
          >
            ₹1499
          </span>
        </div>

        <button
          className="
            mt-4
            w-full
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-blue-600
            py-2
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