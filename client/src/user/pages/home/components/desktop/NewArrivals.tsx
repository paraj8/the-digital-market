
import ProductCard from "../../../../components/product/ProductCard";
import SectionHeader from "../../../../components/common/SectionHeader";
import ProductCardSkeleton from "../../../../components/common/ProductCardSkeleton";

import { useProducts } from "../../../../features/products/hooks/useProducts";
import type { Product } from "../../../../../shared/types/product";

function NewArrivals() {
  const {
    data,
    isLoading,
    error,
  } = useProducts({
    sort: "newest",
    limit: 8,
  });

  if (isLoading) {
    return (
      <section className="px-4 py-6 lg:px-6">
        <SectionHeader
          title="New Arrivals"
          subtitle="Loading products..."
        />

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {Array.from({ length: 12 }).map(
            (_, index) => (
              <ProductCardSkeleton
                key={index}
              />
            )
          )}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6 lg:px-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-red-400">
          Failed to load products
        </div>
      </section>
    );
  }

  const products = data?.data ?? [];

  return (
    <section className="px-4 py-6 lg:px-6">
      <SectionHeader
        title="New Arrivals"
        subtitle="Fresh products just added"
        actionText="View All"
      />

      <div
        className="
          grid
          grid-cols-2
          gap-4
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {products.map(
          (product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          )
        )}
      </div>
    </section>
  );
}

export default NewArrivals;

