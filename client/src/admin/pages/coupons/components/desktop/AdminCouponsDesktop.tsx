import { FiPlus } from "react-icons/fi";

import type { Coupon } from "../../../../../shared/types/coupon";
import type {
  CouponDiscountTypeFilter,
  CouponStatusFilter,
} from "../../couponUtils";
import CouponFilters from "./CouponFilters";
import CouponsTable from "./CouponsTable";

interface AdminCouponsDesktopProps {
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

function AdminCouponsDesktop({
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
}: AdminCouponsDesktopProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Coupons</h1>
          <p className="mt-1 text-sm text-gray-400">Create and manage discount coupons for customers.</p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <FiPlus size={18} />
          Add Coupon
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

      <CouponsTable
        coupons={coupons}
        isLoading={isLoading}
        isError={isError}
        onView={onView}
        onEdit={onEdit}
        onToggleActive={onToggleActive}
        onDelete={onDelete}
      />
    </div>
  );
}

export default AdminCouponsDesktop;
