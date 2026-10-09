import { FiPlus } from "react-icons/fi";

import type { Coupon } from "../../../../../shared/types/coupon";
import type {
  CouponDiscountTypeFilter,
  CouponStatusFilter,
} from "../../couponUtils";
import CouponFilters from "./CouponFilters";
import CouponCard from "./CouponCard";

interface AdminCouponsMobileProps {
  coupons: Coupon[];
  isLoading: boolean;
  isError: boolean;
  search: string;
  status: CouponStatusFilter;
  discountType: CouponDiscountTypeFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CouponStatusFilter) => void;
  onDiscountTypeChange: (value: CouponDiscountTypeFilter) => void;
  onClearFilters: () => void;
  onAdd: () => void;
  onView: (coupon: Coupon) => void;
  onEdit: (coupon: Coupon) => void;
  onToggleActive: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

function AdminCouponsMobile({
  coupons,
  isLoading,
  isError,
  search,
  status,
  discountType,
  onSearchChange,
  onStatusChange,
  onDiscountTypeChange,
  onClearFilters,
  onAdd,
  onView,
  onEdit,
  onToggleActive,
  onDelete,
}: AdminCouponsMobileProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Coupons</h1>
          <p className="mt-1 text-xs text-gray-500">Manage discount coupons.</p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/20 transition active:scale-95"
        >
          <FiPlus size={16} />
          Add
        </button>
      </div>

      <CouponFilters
        search={search}
        status={status}
        discountType={discountType}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onDiscountTypeChange={onDiscountTypeChange}
        onClear={onClearFilters}
      />

      {isLoading && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-10 text-center text-gray-400">
          Loading coupons...
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center text-red-400">
          Failed to load coupons.
        </div>
      )}

      {!isLoading && !isError && coupons.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-10 text-center text-gray-400">
          No coupons found.
        </div>
      )}

      {!isLoading && !isError && coupons.length > 0 && (
        <div className="space-y-3">
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              onView={onView}
              onEdit={onEdit}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCouponsMobile;
