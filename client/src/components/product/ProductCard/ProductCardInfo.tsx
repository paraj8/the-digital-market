import type { Product } from "../../../types/product";

interface ProductCardInfoProps {
  product: Product;
}

function ProductCardInfo({
  product,
}: ProductCardInfoProps) {
  return (
    <>
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
    </>
  );
}

export default ProductCardInfo;