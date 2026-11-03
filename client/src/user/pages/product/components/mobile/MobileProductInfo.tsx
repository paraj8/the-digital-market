import type { Product } from "../../../../../shared/types/product";

import type { ProductVariant } from "../../../../../shared/types/product";
import ProductVariantPrice from "../shared/ProductVariantPrice";
import ProductVariantSelector from "../shared/ProductVariantSelector";
import ProductQuantitySelector from "../shared/ProductQuantitySelector";
import ProductStock from "../shared/ProductStock";

interface MobileProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  selectedAttributes: Record<string, string>;
  selectedVariant: ProductVariant | null;
  onAttributeChange: (name: string, value: string) => void;
}

function MobileProductInfo({
  product,
  quantity,
  onQuantityChange,
  selectedAttributes,
  selectedVariant,
  onAttributeChange,
}: MobileProductInfoProps) {
  return (
    <div className="pt-1">
      <p className="text-sm text-slate-300">
        {product.brand}
      </p>

      <h1 className="mt-1 text-2xl font-bold leading-tight">
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
        className="mt-5"
      />
      {selectedVariant ? (
        <ProductStock
          stock={selectedVariant.stock}
          className="mt-5"
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
        <p className="mt-5 text-sm text-slate-400">
          Select a variant to check availability.
        </p>
      ) : (
        <ProductStock stock={product.stock} className="mt-5" />
      )}

      <ProductQuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        className="mt-5"
        max={
          product.trackInventory && !product.allowBackorder
            ? selectedVariant?.stock ?? (!product.hasVariants ? product.stock : undefined)
            : undefined
        }
      />
    </div>
  );
}

export default MobileProductInfo;
