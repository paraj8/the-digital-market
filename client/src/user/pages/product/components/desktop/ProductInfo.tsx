import type { Product } from "../../../../../shared/types/product";

import ProductActions from "./ProductActions";
import ProductPrice from "../shared/ProductPrice";
import ProductQuantitySelector from "../shared/ProductQuantitySelector";
import ProductStock from "../shared/ProductStock";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onWishlist: () => void;
  addingToCart: boolean;
  isWishlisted: boolean;
  wishlistPending: boolean;
}

function ProductInfo({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onWishlist,
  addingToCart,
  isWishlisted,
  wishlistPending,
}: ProductInfoProps) {
  return (
    <div>
      <p className="text-sm text-slate-300 ">
        {product.brand}
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        {product.title}
      </h1>

      <ProductPrice price={product.price} salePrice={product.salePrice} />
      <ProductStock stock={product.stock} />
      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />
      <ProductActions
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onWishlist={onWishlist}
        addingToCart={addingToCart}
        isWishlisted={isWishlisted}
        wishlistPending={wishlistPending}
      />
    </div>
  );
}

export default ProductInfo;
