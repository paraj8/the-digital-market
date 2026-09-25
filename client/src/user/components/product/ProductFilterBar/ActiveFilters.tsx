import { FiX } from "react-icons/fi";

import type {
  FilterOptions,
  ProductFiltersState,
} from "../../../features/products/types/filter";

interface ActiveFiltersProps {
  filters: ProductFiltersState;

  options?: FilterOptions;

  onRemove: (
    key:
      | "categories"
      | "brands"
      | "ratings"
      | "availability"
      | "sort",
    value: string
  ) => void;

  onRemovePrice: () => void;

  onClearAll: () => void;
}

function ActiveFilters({
  filters,
  options,
  onRemove,
  onRemovePrice,
  onClearAll,
}: ActiveFiltersProps) {
  const chips = [
    ...filters.categories.map((value) => {
      const category =
        options?.categories.find(
          (item) => item._id === value
        );

      return {
        key: "categories" as const,
        value,
        label:
          category?.name ?? value,
      };
    }),

    ...filters.brands.map((value) => ({
      key: "brands" as const,
      value,
      label: value,
    })),

    ...filters.ratings.map((value) => ({
      key: "ratings" as const,
      value,
      label: `${value} ★ & up`,
    })),

    ...filters.availability.map((value) => ({
      key: "availability" as const,
      value,
      label:
        value === "true"
          ? "In Stock"
          : value,
    })),

    ...filters.sort.map((value) => ({
      key: "sort" as const,
      value,
      label: value,
    })),
  ];

  const hasPriceFilter =
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined;

  if (
    chips.length === 0 &&
    !hasPriceFilter
  ) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          onClick={() =>
            onRemove(
              chip.key,
              chip.value
            )
          }
          className="
            flex
            items-center
            gap-2

            rounded-full

            border border-violet-500/30
            bg-violet-500/10

            px-4
            py-2

            text-sm

            transition

            hover:bg-violet-500/20
          "
        >
          <span>{chip.label}</span>

          <FiX size={14} />
        </button>
      ))}

      {hasPriceFilter && (
        <button
          onClick={onRemovePrice}
          className="
            flex
            items-center
            gap-2

            rounded-full

            border border-violet-500/30
            bg-violet-500/10

            px-4
            py-2

            text-sm

            transition

            hover:bg-violet-500/20
          "
        >
          <span>
            Price:{" "}
            {filters.minPrice !== undefined
              ? `₹${filters.minPrice}`
              : "₹0"}
            {" – "}
            {filters.maxPrice !== undefined
              ? `₹${filters.maxPrice}`
              : "Any"}
          </span>

          <FiX size={14} />
        </button>
      )}

      <button
        onClick={onClearAll}
        className="
          text-sm
          text-red-400

          transition

          hover:text-red-300
        "
      >
        Clear All
      </button>
    </div>
  );
}

export default ActiveFilters;