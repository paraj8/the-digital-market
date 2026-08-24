import {
  FiSearch,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

interface ProductFiltersProps {
  search: string;
  category: string;
  status: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;

  onClear?: () => void;

  categories?: {
    _id: string;
    name: string;
  }[];
}

function ProductFilters({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onClear,
  categories = [],
}: ProductFiltersProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <FiSearch
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search products..."
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-800/70
              py-2.5
              pl-10
              pr-4
              text-sm
              text-white
              outline-none
              placeholder:text-gray-500
              focus:border-violet-500
            "
          />
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          {/* Clear */}

          <button
            type="button"
            onClick={onClear}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-slate-800/70
              px-4
              py-2.5
              text-sm
              text-gray-300
              transition
              hover:bg-slate-800
            "
          >
            <FiFilter size={16} />
            Clear
          </button>

          {/* Category */}

          <div className="relative">
            <select
              value={category}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              className="
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                py-2.5
                pl-4
                pr-10
                text-sm
                text-gray-300
                outline-none
                transition
                hover:bg-slate-800
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
              size={15}
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

          {/* Status */}

          <div className="relative">
            <select
              value={status}
              onChange={(event) =>
                onStatusChange(event.target.value)
              }
              className="
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                py-2.5
                pl-4
                pr-10
                text-sm
                text-gray-300
                outline-none
                transition
                hover:bg-slate-800
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
              size={15}
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
    </div>
  );
}

export default ProductFilters;