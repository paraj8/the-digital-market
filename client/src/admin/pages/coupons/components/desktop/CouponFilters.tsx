import { FiSearch, FiX } from "react-icons/fi";

import type {
  CouponDiscountTypeFilter,
  CouponStatusFilter,
} from "../../couponUtils";

interface CouponFiltersProps {
  search: string;
  status: CouponStatusFilter;
  discountType: CouponDiscountTypeFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CouponStatusFilter) => void;
  onDiscountTypeChange: (value: CouponDiscountTypeFilter) => void;
  onClear: () => void;
}

function CouponFilters({
  search,
  status,
  discountType,
  onSearchChange,
  onStatusChange,
  onDiscountTypeChange,
  onClear,
}: CouponFiltersProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <FiSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search coupon code or description..."
            className="w-full rounded-xl border border-white/10 bg-slate-800/70 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value as CouponStatusFilter)}
            className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
            <option value="scheduled">Scheduled</option>
            <option value="usage-limit-reached">Usage Limit Reached</option>
          </select>

          <select
            value={discountType}
            onChange={(event) =>
              onDiscountTypeChange(event.target.value as CouponDiscountTypeFilter)
            }
            className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-violet-500"
          >
            <option value="all">All Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-slate-800"
          >
            <FiX size={14} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default CouponFilters;
