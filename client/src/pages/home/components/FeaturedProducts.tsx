import ProductCard from "../../../components/product/ProductCard";
import SectionHeader from "../../../components/common/SectionHeader";
import ProductCardSkeleton from "../../../components/common/ProductCardSkeleton";

import { useProducts } from "../../../hooks/products/useProducts";
import type { Product } from "../../../types/product";

function FeaturedProducts() {
  const {
    data,
    isLoading,
    error,
  } = useProducts({featured: true, limit: 8,});

  if (isLoading) {
    return (
      <section className="px-4 py-6 lg:px-6">
        <SectionHeader
          title="Featured Products"
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
      <div className="p-6">
        Failed to load products
      </div>
    );
  }

  return (
    <section className="px-4 py-6 lg:px-6">
      <SectionHeader
        title="Featured Products"
        subtitle="Popular products for you"
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
        {data?.data.map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;