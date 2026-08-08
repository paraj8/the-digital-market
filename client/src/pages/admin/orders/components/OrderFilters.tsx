import {
  FiSearch,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

interface OrderFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function OrderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <FiSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search orders..."
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

          {/* Filter button */}
          <button
            type="button"
            className="
              flex
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
            Filter
          </button>

          {/* Status */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) =>
                onStatusChange(e.target.value)
              }
              className="
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                px-4
                py-2.5
                pr-10
                text-sm
                text-gray-300
                outline-none
                transition
                focus:border-violet-500
              "
            >
              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="confirmed">
                Confirmed
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="shipped">
                Shipped
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
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

export default OrderFilters;

