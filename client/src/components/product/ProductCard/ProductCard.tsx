import { Link } from "react-router-dom";

import type { Product } from "../../../features/products/types/product";

import ProductCardImage from "./ProductCardImage";
import ProductCardInfo from "./ProductCardInfo";
import ProductCardPrice from "./ProductCardPrice";

interface ProductCardProps {
  product: Product;
}

function ProductCard({
  product,
}: ProductCardProps) {
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
      <ProductCardImage
        product={product}
      />

      <div className="p-3">
        <ProductCardInfo
          product={product}
        />

        <ProductCardPrice
          price={product.price}
          salePrice={product.salePrice}
        />

        <Link to={`/product/${product.slug}`}>
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
              transition
              hover:opacity-90
            "
          >
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;