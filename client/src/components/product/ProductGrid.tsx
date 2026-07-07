import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../common/ProductCardSkeleton";

import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];

  loading: boolean;

  error: boolean;
}

function ProductGrid({
  products,
  loading,
  error,
}: ProductGridProps) {
  // Loading

  if (loading) {
    return (
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <ProductCardSkeleton
            key={index}
          />
        ))}
      </div>
    );
  }

  // Error

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/10
          p-8
          text-center
        "
      >
        <h2 className="text-xl font-semibold">
          Failed to load products
        </h2>

        <p className="mt-2 text-slate-400">
          Please try again later.
        </p>
      </div>
    );
  }

  // Empty

  if (products.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-[#121826]
          p-10
          text-center
        "
      >
        <h2 className="text-xl font-semibold">
          No products found
        </h2>

        <p className="mt-2 text-slate-400">
          Try changing your filters.
        </p>
      </div>
    );
  }

  // Products

  return (
<div
  className="
    grid
    gap-6
    grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
  "
>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;