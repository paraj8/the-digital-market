import ProductCard from "../../../components/product/ProductCard";

import { useRelatedProducts } from "../../../features/products/hooks/useRelatedProducts";

import type { Product } from "../../../../shared/types/product";

type Props = {
  categoryId: string;
  currentProductId: string;
};

function RelatedProducts({
  categoryId,
  currentProductId,
}: Props) {
  const { data, isLoading } =
    useRelatedProducts(categoryId);

  if (isLoading) {
    return null;
  }

  const products =
    data?.filter(
      (
        product: Product
      ) =>
        product._id !==
        currentProductId
    ) || [];

  if (!products.length) {
    return (
      <section
        className="
          mt-12
          rounded-2xl
          border border-white/10
          bg-[#121826]
          p-6
        "
      >
        <h2
          className="
            mb-6
            text-2xl
            font-bold
          "
        >
          Related Products
        </h2>

        <p className="text-slate-500">
          No related products found.
        </p>
      </section>
    );
  }

  return (
    <section
      className="
        mt-12
        rounded-2xl
        border border-white/10
        bg-[#121826]
        p-6
      "
    >
      <h2
        className="
          mb-6
          text-2xl
          font-bold
        "
      >
        Related Products
      </h2>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {products.map(
          (
            product: Product
          ) => (
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

export default RelatedProducts;