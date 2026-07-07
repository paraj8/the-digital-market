import ProductFilterBar from "../../components/product/ProductFilterBar";

import ProductGrid from "../../components/product/ProductGrid";
import ProductPagination from "../../components/product/ProductPagination";

import { useProducts } from "../../hooks/products/useProducts";
import { useFilterOptions } from "../../hooks/products/useFilterOptions";
import { useProductFilters } from "../../hooks/products/useProductFilters";

type ArrayFilterKey =
  | "categories"
  | "brands"
  | "ratings"
  | "availability"
  | "sort";

function ProductListingPage() {
  const {
    query,
    filters,
    page,
    setPage,
    updateFilter,
    updatePrice,
    clearFilters,
  } = useProductFilters();

  const {
    data: productData,
    isLoading,
    error,
  } = useProducts(query);

  const {
    data: filterOptions,
  } = useFilterOptions();

const removeFilter = (
  key: ArrayFilterKey,
  value: string
) => {
  updateFilter(
    key,
    filters[key].filter(
      (item) => item !== value
    )
  );
};

  const products =
    productData?.data ?? [];

  const pagination =
    productData?.pagination;

  const totalProducts =
    pagination?.total ??
    products.length;

    console.log("Products:", products);
console.log("Length:", products.length);

return (
<section className="mx-auto max-w-screen-2xl px-6 py-8">

    {/* Filters */}

<ProductFilterBar
  options={filterOptions}
  filters={filters}
  page={page}
  limit={query.limit ?? 12}
  totalProducts={totalProducts}
  currentCount={products.length}
  onFilterChange={(key, values) =>
    updateFilter(key, values as never)
  }
  onPriceChange={updatePrice}
  onRemoveFilter={removeFilter}
  onClearFilters={clearFilters}
/>

    {/* Products */}

    <ProductGrid
      products={products}
      loading={isLoading}
      error={!!error}
    />

    {/* Pagination */}

    {pagination && (
      <div className="mt-10">
        <ProductPagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    )}
  </section>
);
}

export default ProductListingPage;