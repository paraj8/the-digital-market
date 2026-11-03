import type {
  Product,
  ProductVariant,
} from "../../../../../shared/types/product";

import ProductPrice from "./ProductPrice";

interface ProductVariantPriceProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  className?: string;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

function ProductVariantPrice({
  product,
  selectedVariant,
  className = "",
}: ProductVariantPriceProps) {
  if (!product.hasVariants) {
    return (
      <ProductPrice
        price={product.price}
        salePrice={product.salePrice}
        className={className}
      />
    );
  }

  if (selectedVariant) {
    return (
      <ProductPrice
        price={selectedVariant.price}
        salePrice={selectedVariant.salePrice}
        className={className}
      />
    );
  }

  const prices = (product.variants ?? [])
    .filter(
      (variant) =>
        variant.isActive &&
        (!product.trackInventory ||
          product.allowBackorder ||
          variant.stock > 0)
    )
    .map((variant) =>
      variant.salePrice > 0
        ? variant.salePrice
        : variant.price
    )
    .filter((price) => Number.isFinite(price) && price > 0);

  if (prices.length === 0) {
    return (
      <div className={`mt-6 ${className}`}>
        <p className="text-lg font-semibold text-slate-300">
          No variants currently available
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Select an available variant to continue.
        </p>
      </div>
    );
  }

  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);

  return (
    <div className={`mt-6 ${className}`}>
      <p className="text-3xl font-bold text-white">
        {minimum === maximum
          ? `From ${formatPrice(minimum)}`
          : `From ${formatPrice(minimum)} – ${formatPrice(maximum)}`}
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Select a variant to see its price.
      </p>
    </div>
  );
}

export default ProductVariantPrice;
