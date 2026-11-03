import type {
  Product,
  ProductVariant,
} from "../../../../../shared/types/product";

interface MobileProductDetailsCardProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

function MobileProductDetailsCard({
  product,
  selectedVariant,
}: MobileProductDetailsCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#121826] p-4">
      <h2 className="mb-4 text-base font-semibold">
        Product Details
      </h2>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <dt className="text-slate-400">SKU</dt>
        <dd className="min-w-0 break-words text-right">
          {product.hasVariants
            ? selectedVariant?.sku ?? "Select a variant"
            : product.sku}
        </dd>
        <dt className="text-slate-400">Brand</dt>
        <dd className="min-w-0 break-words text-right">{product.brand}</dd>
        <dt className="text-slate-400">Stock</dt>
        <dd className="text-right">
          {product.hasVariants
            ? selectedVariant?.stock ?? "Select a variant"
            : product.stock}
        </dd>
        <dt className="text-slate-400">Returnable</dt>
        <dd className="text-right">{product.returnable ? "Yes" : "No"}</dd>
        <dt className="text-slate-400">COD</dt>
        <dd className="text-right">
          {product.codAvailable ? "Available" : "Unavailable"}
        </dd>
      </dl>
    </div>
  );
}

export default MobileProductDetailsCard;
