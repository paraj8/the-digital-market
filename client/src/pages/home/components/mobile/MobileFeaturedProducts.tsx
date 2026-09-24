
import ProductCard from "../../../../components/product/ProductCard";
import SectionHeader from "../../../../components/common/SectionHeader";
import ProductCardSkeleton from "../../../../components/common/ProductCardSkeleton";

import { useProducts } from "../../../../features/products/hooks/useProducts";
import type { Product } from "../../../../features/products/types/product";

function MobileFeaturedProducts() {
  const {
    data,
    isLoading,
    error,
  } = useProducts({
    featured: true,
    limit: 8,
  });

  if (isLoading) {
    return (
      <section className="px-4 py-6">
        <SectionHeader
          title="Featured Products"
          subtitle="Loading products..."
        />

        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
            snap-x
            snap-mandatory
          "
        >
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  min-w-[42vw]
                  max-w-[42vw]
                  shrink-0
                  snap-start
                "
              >
                <ProductCardSkeleton />
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-6">
        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-4
            text-sm
            text-red-400
          "
        >
          Failed to load products
        </div>
      </section>
    );
  }

  const products = data?.data ?? [];

  return (
    <section className="px-4 py-6">
      <SectionHeader
        title="Featured Products"
        subtitle="Popular products for you"
        actionText="View All"
      />

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-hide
          snap-x
          snap-mandatory
        "
      >
        {products.map(
          (product: Product) => (
            <div
              key={product._id}
              className="
                min-w-[42vw]
                max-w-[42vw]
                shrink-0
                snap-start
              "
            >
              <ProductCard
                product={product}
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default MobileFeaturedProducts;
