import CategoryFilter from "./filters/CategoryFilter";
import BrandFilter from "./filters/BrandFilter";
import RatingFilter from "./filters/RatingFilter";
import AvailabilityFilter from "./filters/AvailabilityFilter";
import SortFilter from "./filters/SortFilter";

import PriceFilter from "./filters/PriceFilter";
import ActiveFilters from "./ActiveFilters";
import ProductResultsInfo from "./ProductResultsInfo";

import type {
  FilterOptions,
  ProductFiltersState,
  ArrayFilterKey,
} from "../../../types/filter";

interface ProductFilterBarProps {
  options?: FilterOptions;

  filters: ProductFiltersState;

  page: number;
  limit: number;

  totalProducts: number;
  currentCount: number;

  onFilterChange: (
    key: keyof ProductFiltersState,
    values: string[]
  ) => void;

  onPriceChange: (
    min?: number,
    max?: number
  ) => void;

  onRemoveFilter: (
    key: ArrayFilterKey,
    value: string
  ) => void;

  onClearFilters: () => void;
}

function ProductFilterBar({
  options,
  filters,
  page,
  limit,
  totalProducts,
  currentCount,
  onFilterChange,
  onPriceChange,
  onRemoveFilter,
  onClearFilters,
}: ProductFilterBarProps) {
  return (
    <div
      className="
        sticky
        top-16
        z-30

        mb-6

        rounded-2xl
        border border-white/10

        bg-[#0f172a]/95
        backdrop-blur-xl

        p-4

        overflow-visible
      "
    >
      <div className="mb-3 flex flex-wrap gap-3">

        {options && (
          <>
            <CategoryFilter
              categories={options.categories}
              selected={filters.categories}
              onApply={(values) =>
                onFilterChange(
                  "categories",
                  values
                )
              }
            />

            <BrandFilter
              brands={options.brands}
              selected={filters.brands}
              onApply={(values) =>
                onFilterChange(
                  "brands",
                  values
                )
              }
            />

            <RatingFilter
              ratings={options.ratings}
              selected={filters.ratings}
              onApply={(values) =>
                onFilterChange(
                  "ratings",
                  values
                )
              }
            />

            <AvailabilityFilter
              selected={
                filters.availability
              }
              onApply={(values) =>
                onFilterChange(
                  "availability",
                  values
                )
              }
            />

            <SortFilter
              sortOptions={
                options.sortOptions
              }
              selected={filters.sort}
              onApply={(values) =>
                onFilterChange(
                  "sort",
                  values
                )
              }
            />

            <PriceFilter
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={{
                minPrice:
                  filters.minPrice,
                maxPrice:
                  filters.maxPrice,
              }}
              onApply={(value) =>
                onPriceChange(
                  value.minPrice,
                  value.maxPrice
                )
              }
            />
          </>
        )}
      </div>

      <ActiveFilters
        filters={filters}
        onRemove={onRemoveFilter}
        onClearAll={onClearFilters}
      />

      <ProductResultsInfo
        page={page}
        limit={limit}
        total={totalProducts}
        currentCount={currentCount}
      />
    </div>
  );
}

export default ProductFilterBar;