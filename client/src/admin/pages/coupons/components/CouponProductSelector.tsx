import { useState } from "react";

import type { CouponProductReference } from "../../../../shared/types/coupon";
import { useProducts } from "../../../../user/features/products/hooks/useProducts";

interface CouponProductSelectorProps {
  productIds: string[];
  selectedProducts: CouponProductReference[];
  onProductsChange: (products: CouponProductReference[]) => void;
}

const formatPrice = (product: CouponProductReference) => {
  const price = product.salePrice > 0 ? product.salePrice : product.price;
  return `₹${price.toLocaleString("en-IN")}`;
};

function CouponProductSelector({
  productIds,
  selectedProducts,
  onProductsChange,
}: CouponProductSelectorProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useProducts({
    search: search.trim() || undefined,
    page,
    limit: 8,
  });
  const products = data?.data ?? [];
  const productById = new Map(
    [...selectedProducts, ...products].map((product) => [product._id, product])
  );

  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      onProductsChange(
        productIds
          .filter((id) => id !== productId)
          .map((id) => productById.get(id))
          .filter((product): product is CouponProductReference => Boolean(product))
      );
      return;
    }

    const product = productById.get(productId);
    if (!product) {
      return;
    }

    onProductsChange([
      ...productIds
        .map((id) => productById.get(id))
        .filter((selected): selected is CouponProductReference => Boolean(selected)),
      product,
    ]);
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-slate-800/40 p-4">
      <label className="block text-sm text-gray-300" htmlFor="coupon-product-search">
        Search products
      </label>
      <input
        id="coupon-product-search"
        type="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(1);
        }}
        placeholder="Search by product title..."
        className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
      />

      <div>
        <h3 className="mb-2 text-sm font-medium text-white">Available Products</h3>
        {isLoading ? (
          <p className="py-3 text-sm text-gray-400">Loading products...</p>
        ) : isError ? (
          <p className="py-3 text-sm text-red-400">
            {error instanceof Error ? error.message : "Failed to load products."}
          </p>
        ) : products.length === 0 ? (
          <p className="py-3 text-sm text-gray-400">No products found.</p>
        ) : (
          <ul className="max-h-64 divide-y divide-white/5 overflow-y-auto">
            {products.map((product) => (
              <li key={product._id}>
                <label className="flex cursor-pointer items-center gap-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={productIds.includes(product._id)}
                    onChange={() => toggleProduct(product._id)}
                    className="h-4 w-4 accent-violet-500"
                  />
                  {product.images[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg bg-slate-700" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-200">
                    {product.title}
                  </span>
                  <span className="text-sm text-gray-400">{formatPrice(product)}</span>
                </label>
              </li>
            ))}
          </ul>
        )}

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-white/10 px-3 py-1.5 disabled:opacity-40"
            >
              Previous
            </button>
            <span>
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <button
              type="button"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-white/10 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-white">
          Selected Products ({productIds.length})
        </h3>
        {productIds.length === 0 ? (
          <p className="text-sm text-gray-400">No products selected.</p>
        ) : (
          <ul className="space-y-2">
            {productIds.map((productId) => {
              const product = productById.get(productId);
              return (
                <li
                  key={productId}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-900/60 p-2"
                >
                  {product?.images[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt=""
                      className="h-9 w-9 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-md bg-slate-700" />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-200">
                    {product?.title ?? `Product ${productId}`}
                  </span>
                  {product && (
                    <span className="text-sm text-gray-400">{formatPrice(product)}</span>
                  )}
                  <button
                    type="button"
                    aria-label={`Remove ${product?.title ?? "product"}`}
                    onClick={() => toggleProduct(productId)}
                    className="rounded px-2 text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CouponProductSelector;
