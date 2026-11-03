import type { Product } from "../../../../../shared/types/product";

import ProductActions from "./ProductActions";
import type { ProductVariant } from "../../../../../shared/types/product";
import ProductVariantPrice from "../shared/ProductVariantPrice";
import ProductVariantSelector from "../shared/ProductVariantSelector";
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
  selectedAttributes: Record<string, string>;
  selectedVariant: ProductVariant | null;
  onAttributeChange: (name: string, value: string) => void;
  canPurchase: boolean;
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
  selectedAttributes,
  selectedVariant,
  onAttributeChange,
  canPurchase,
}: ProductInfoProps) {
  return (
    <div>
      <p className="text-sm text-slate-300 ">
        {product.brand}
      </p>

      <h1 className="mt-2 text-3xl font-bold">
        {product.title}
      </h1>

      {product.hasVariants && (
        <ProductVariantSelector
          product={product}
          selectedAttributes={selectedAttributes}
          selectedVariant={selectedVariant}
          onAttributeChange={onAttributeChange}
        />
      )}
      <ProductVariantPrice
        product={product}
        selectedVariant={selectedVariant}
      />
      {selectedVariant ? (
        <ProductStock
          stock={selectedVariant.stock}
          available={
            !product.trackInventory ||
            product.allowBackorder ||
            selectedVariant.stock > 0
          }
          showCount={product.trackInventory && !product.allowBackorder}
          availableLabel={
            product.allowBackorder && selectedVariant.stock === 0
              ? "Available on backorder"
              : "Available"
          }
        />
      ) : product.hasVariants ? (
        <p className="mt-6 text-sm text-slate-400">
          Select a variant to check availability.
        </p>
      ) : (
        <ProductStock stock={product.stock} />
      )}
      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        max={
          product.trackInventory && !product.allowBackorder
            ? selectedVariant?.stock ?? (!product.hasVariants ? product.stock : undefined)
            : undefined
        }
      />
      <ProductActions
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
        onWishlist={onWishlist}
        addingToCart={addingToCart}
        isWishlisted={isWishlisted}
        wishlistPending={wishlistPending}
        canPurchase={canPurchase}
      />
    </div>
  );
}

export default ProductInfo;
