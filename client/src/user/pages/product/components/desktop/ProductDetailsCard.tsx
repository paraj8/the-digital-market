import type {
  Product,
  ProductVariant,
} from "../../../../../shared/types/product";

interface ProductDetailsCardProps {
  product: Product;
  selectedVariant?: ProductVariant | null;
}

function ProductDetailsCard({
  product,
  selectedVariant,
}: ProductDetailsCardProps) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#121826] p-5">
      <h3 className="mb-4 text-lg font-semibold">
        Product Details
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-400">SKU</span>
          <span>
            {product.hasVariants
              ? selectedVariant?.sku ?? "Select a variant"
              : product.sku}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Brand</span>
          <span>{product.brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Stock</span>
          <span>
            {product.hasVariants
              ? selectedVariant?.stock ?? "Select a variant"
              : product.stock}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Returnable</span>
          <span>{product.returnable ? "Yes" : "No"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">COD</span>
          <span>{product.codAvailable ? "Available" : "Unavailable"}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
