import type { DiscountStatus } from "../discountUtils";

export type DiscountStatusFilter = "all" | DiscountStatus;

interface DiscountFiltersProps {
  search: string;
  status: DiscountStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: DiscountStatusFilter) => void;
}

function DiscountFilters({ search, status, onSearchChange, onStatusChange }: DiscountFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search discounts..."
        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
      />
      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value as DiscountStatusFilter)}
        className="rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
      >
        <option value="all">All statuses</option>
        <option value="Active">Active</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Expired">Expired</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}

export default DiscountFilters;
