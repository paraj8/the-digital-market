import { useState } from "react";

import type { DiscountProductReference } from "../../../../shared/types/discount";
import type { Product } from "../../../../shared/types/product";
import { useProducts } from "../../../../user/features/products/hooks/useProducts";

interface DiscountProductSelectorProps {
  productIds: string[];
  selectedProducts: DiscountProductReference[];
  onChange: (products: DiscountProductReference[]) => void;
}

function DiscountProductSelector({
  productIds,
  selectedProducts,
  onChange,
}: DiscountProductSelectorProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useProducts({
    search: search.trim() || undefined,
    page,
    limit: 8,
  });
  const products = data?.data ?? [];
  const productReference = (product: Product): DiscountProductReference => ({
    _id: product._id,
    title: product.title,
    images: product.images,
    price: product.price,
    salePrice: product.salePrice,
  });
  const productMap = new Map<string, DiscountProductReference>([
    ...selectedProducts.map((product) => [product._id, product] as const),
    ...products.map((product) => [product._id, productReference(product)] as const),
  ]);
  const toggle = (id: string) => {
    const ids = productIds.includes(id)
      ? productIds.filter((productId) => productId !== id)
      : [...productIds, id];
    onChange(ids.map((productId) => productMap.get(productId))
      .filter((product): product is DiscountProductReference => Boolean(product)));
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-slate-800/40 p-4">
      <label htmlFor="discount-product-search" className="block text-sm text-gray-300">
        Search products
      </label>
      <input
        id="discount-product-search"
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder="Search products..."
        className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
      />

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading products...</p>
      ) : isError ? (
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : "Failed to load products."}
        </p>
      ) : (
        <ul className="max-h-52 divide-y divide-white/5 overflow-y-auto">
          {products.map((product) => (
            <li key={product._id}>
              <label className="flex cursor-pointer items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={productIds.includes(product._id)}
                  onChange={() => toggle(product._id)}
                  className="accent-violet-500"
                />
                {product.images[0]?.url ? (
                  <img src={product.images[0].url} alt="" className="h-9 w-9 rounded object-cover" />
                ) : (
                  <span className="h-9 w-9 rounded bg-slate-700" />
                )}
                <span className="min-w-0 flex-1 truncate text-sm text-gray-200">{product.title}</span>
                <span className="text-xs text-gray-400">
                  ₹{(product.salePrice > 0 ? product.salePrice : product.price).toLocaleString("en-IN")}
                </span>
              </label>
            </li>
          ))}
          {!products.length && <li className="py-2 text-sm text-gray-400">No products found.</li>}
        </ul>
      )}

      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}
            className="rounded border border-white/10 px-2 py-1 disabled:opacity-40">Previous</button>
          <span>Page {data.pagination.page} of {data.pagination.totalPages}</span>
          <button type="button" disabled={page >= data.pagination.totalPages} onClick={() => setPage((value) => value + 1)}
            className="rounded border border-white/10 px-2 py-1 disabled:opacity-40">Next</button>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-white">Selected Products ({productIds.length})</p>
        {productIds.length === 0 ? (
          <p className="text-sm text-gray-400">No products selected.</p>
        ) : (
          <ul className="space-y-2">
            {productIds.map((id) => {
              const product = productMap.get(id);
              return (
                <li key={id} className="flex items-center gap-3 rounded-lg bg-slate-900/70 p-2">
                  {product?.images[0]?.url && (
                    <img src={product.images[0].url} alt="" className="h-8 w-8 rounded object-cover" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-200">
                    {product?.title ?? `Product ${id}`}
                  </span>
                  <button type="button" onClick={() => toggle(id)} aria-label={`Remove ${product?.title ?? "product"}`}
                    className="px-2 text-gray-400 hover:text-white">×</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DiscountProductSelector;
