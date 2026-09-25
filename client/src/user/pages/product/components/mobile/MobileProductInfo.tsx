import type { Product } from "../../../../../shared/types/product";

import ProductPrice from "../shared/ProductPrice";
import ProductQuantitySelector from "../shared/ProductQuantitySelector";
import ProductStock from "../shared/ProductStock";

interface MobileProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

function MobileProductInfo({
  product,
  quantity,
  onQuantityChange,
}: MobileProductInfoProps) {
  return (
    <div className="pt-1">
      <p className="text-sm text-slate-300">
        {product.brand}
      </p>

      <h1 className="mt-1 text-2xl font-bold leading-tight">
        {product.title}
      </h1>

      <ProductPrice
        price={product.price}
        salePrice={product.salePrice}
        className="mt-5"
      />

      <ProductStock
        stock={product.stock}
        className="mt-5"
      />

      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        className="mt-5"
      />
    </div>
  );
}

export default MobileProductInfo;
