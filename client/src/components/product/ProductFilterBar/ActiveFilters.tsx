import { FiX } from "react-icons/fi";

interface ActiveFiltersProps {
  filters: {
    categories: string[];
    brands: string[];
    ratings: string[];
    availability: string[];
    sort: string[];
  };

  onRemove: (
    key:
      | "categories"
      | "brands"
      | "ratings"
      | "availability"
      | "sort",
    value: string
  ) => void;

  onClearAll: () => void;
}

function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const chips = [
    ...filters.categories.map((value) => ({
      key: "categories" as const,
      value,
      label: value,
    })),

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

  if (chips.length === 0) {
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