import ProductCard from "../../../components/common/ProductCard";
import SectionHeader from "../../../components/common/SectionHeader";

function FeaturedProducts() {
  return (
    <section className="px-4 py-6 lg:px-6">
      <SectionHeader
        title="Featured Products"
        subtitle="Popular products chosen for you"
        actionText="View All"
      />

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <ProductCard key={index} />
          )
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;