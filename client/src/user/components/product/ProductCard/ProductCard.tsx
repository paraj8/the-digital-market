
import { Link } from "react-router-dom";

import type { Product } from "../../../../shared/types/product";

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
    <Link
      to={`/product/${product.slug}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#121826]
        transition
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-lg
        hover:shadow-violet-950/20
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

        <span
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-violet-600
            to-blue-600
            py-1.5
            text-sm
            font-medium
            text-white
            transition
            group-hover:opacity-90
          "
        >
          View Product
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
