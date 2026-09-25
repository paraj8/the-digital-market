import type { Product } from "../../../../../shared/types/product";

interface MobileProductDetailsCardProps {
  product: Product;
}

function MobileProductDetailsCard({
  product,
}: MobileProductDetailsCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#121826] p-4">
      <h2 className="mb-4 text-base font-semibold">
        Product Details
      </h2>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <dt className="text-slate-400">SKU</dt>
        <dd className="min-w-0 break-words text-right">{product.sku}</dd>
        <dt className="text-slate-400">Brand</dt>
        <dd className="min-w-0 break-words text-right">{product.brand}</dd>
        <dt className="text-slate-400">Stock</dt>
        <dd className="text-right">{product.stock}</dd>
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
