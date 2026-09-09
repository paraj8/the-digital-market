import {
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

interface ProductCategory {
  _id: string;
  name: string;
}

interface MobileProductFiltersProps {
  category: string;
  status: string;
  categories: ProductCategory[];

  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
}

function MobileProductFilters({
  category,
  status,
  categories,
  onCategoryChange,
  onStatusChange,
  onClear,
}: MobileProductFiltersProps) {
  const hasFilters =
    category !== "" ||
    status !== "";

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-900/70
        p-4
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <FiFilter
            size={15}
            className="text-violet-400"
          />

          <span
            className="
              text-sm
              font-medium
              text-gray-300
            "
          >
            Filters
          </span>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="
              text-xs
              font-medium
              text-violet-400
              transition
              hover:text-violet-300
            "
          >
            Clear
          </button>
        )}
      </div>

      {/* FILTERS */}

      <div className="space-y-3">

        {/* CATEGORY */}

        <div className="relative">

          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(
                e.target.value
              )
            }
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-white/10
              bg-slate-800/70
              px-3
              py-3
              pr-10
              text-sm
              text-gray-300
              outline-none
              focus:border-violet-500
            "
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          <FiChevronDown
            size={16}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

        </div>

        {/* STATUS */}

        <div className="relative">

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value
              )
            }
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-white/10
              bg-slate-800/70
              px-3
              py-3
              pr-10
              text-sm
              text-gray-300
              outline-none
              focus:border-violet-500
            "
          >
            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="low-stock">
              Low Stock
            </option>

            <option value="out-of-stock">
              Out of Stock
            </option>
          </select>

          <FiChevronDown
            size={16}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

        </div>

      </div>
    </div>
  );
}

export default MobileProductFilters;