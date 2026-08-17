import {
  FiSearch,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

import type { AdminOrderStatus } from "../../../api/adminOrderApi";

export type OrderFilterStatus =
  | AdminOrderStatus
  | "all";

interface OrderFiltersProps {
  search: string;
  status: OrderFilterStatus;

  onSearchChange: (value: string) => void;

  onStatusChange: (
    value: OrderFilterStatus
  ) => void;
}

function OrderFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
  const statuses: OrderFilterStatus[] = [
    "all",
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-900/60
        p-4
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
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

        {/* Status Filter */}

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FiFilter
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
              size={16}
            />

            <select
              value={status}
              onChange={(e) =>
                onStatusChange(
                  e.target.value as OrderFilterStatus
                )
              }
              className="
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                py-2.5
                pl-10
                pr-10
                text-sm
                text-gray-300
                outline-none
                transition
                focus:border-violet-500
              "
            >
              {statuses.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-slate-900"
                >
                  {item === "all"
                    ? "All Status"
                    : item.charAt(0).toUpperCase() +
                      item.slice(1)}
                </option>
              ))}
            </select>

            <FiChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
              size={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderFilters;