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
    <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
      <div className="relative">
        <FiSearch size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search coupons..."
          className="w-full rounded-xl border border-white/10 bg-slate-800/70 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as CouponStatusFilter)}
          className="rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2.5 text-xs text-gray-300 outline-none focus:border-violet-500"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
          <option value="scheduled">Scheduled</option>
          <option value="usage-limit-reached">Usage limit reached</option>
        </select>

        <select
          value={discountType}
          onChange={(event) =>
            onDiscountTypeChange(event.target.value as CouponDiscountTypeFilter)
          }
          className="rounded-xl border border-white/10 bg-slate-800/70 px-2.5 py-2.5 text-xs text-gray-300 outline-none focus:border-violet-500"
        >
          <option value="all">All types</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-gray-300"
      >
        <FiX size={12} />
        Clear filters
      </button>
    </div>
  );
}

export default CouponFilters;
