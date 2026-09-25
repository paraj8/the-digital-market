import type { Product } from "../../../../shared/types/product";

import ProductCardWishlist from "./ProductCardWishlist";

interface ProductCardImageProps {
  product: Product;
}

function ProductCardImage({
  product,
}: ProductCardImageProps) {
  return (
    <div className="relative aspect-square bg-slate-800">
      <ProductCardWishlist
        productId={product._id}
      />

      <img
        src={
          product.images?.[0]?.url ??
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
  );
}

export default ProductCardImage;