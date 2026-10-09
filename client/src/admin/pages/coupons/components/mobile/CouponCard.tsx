import { FiEdit2, FiEye, FiPower, FiTrash2 } from "react-icons/fi";

import type { Coupon } from "../../../../../shared/types/coupon";
import {
  formatCurrency,
  formatDate,
  formatDiscountValue,
  getUsageDisplay,
  getUsagePercentage,
} from "../../couponUtils";
import CouponStatusBadge from "../CouponStatusBadge";

interface CouponCardProps {
  coupon: Coupon;
  onView: (coupon: Coupon) => void;
  onEdit: (coupon: Coupon) => void;
  onToggleActive: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

function CouponCard({ coupon, onView, onEdit, onToggleActive, onDelete }: CouponCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-white">{coupon.code}</p>
          <p className="mt-1 text-xs text-gray-500">{coupon.discountType === "percentage" ? "Percentage" : "Fixed"}</p>
        </div>

        <CouponStatusBadge coupon={coupon} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-400">
        <div>
          <p className="text-gray-500">Discount</p>
          <p className="mt-1 font-medium text-white">{formatDiscountValue(coupon)}</p>
        </div>

        <div>
          <p className="text-gray-500">Min. Order</p>
          <p className="mt-1 font-medium text-white">{formatCurrency(coupon.minimumOrderAmount)}</p>
        </div>

        <div>
          <p className="text-gray-500">Usage</p>
          <p className="mt-1 font-medium text-white">{getUsageDisplay(coupon)}</p>
        </div>

        <div>
          <p className="text-gray-500">Expires</p>
          <p className="mt-1 font-medium text-white">{formatDate(coupon.endDate)}</p>
        </div>
        <div>
          <p className="text-gray-500">Applies To</p>
          <p className="mt-1 font-medium text-white">
            {coupon.scope === "products"
              ? `${coupon.products?.filter(Boolean).length ?? 0} Products`
              : "All Products"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[10px] text-gray-500">
          <span>Used</span>
          <span>{coupon.usageLimit > 0 ? `${coupon.usedCount}/${coupon.usageLimit}` : `${coupon.usedCount}/Unlimited`}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${coupon.usageLimit > 0 ? getUsagePercentage(coupon) : 0}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => onView(coupon)} className="flex-1 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-xs font-medium text-gray-200">
          <span className="inline-flex items-center gap-2"><FiEye size={12} /> View</span>
        </button>

        <button type="button" onClick={() => onEdit(coupon)} className="flex-1 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-xs font-medium text-gray-200">
          <span className="inline-flex items-center gap-2"><FiEdit2 size={12} /> Edit</span>
        </button>
      </div>

      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => onToggleActive(coupon)} className="flex-1 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-xs font-medium text-gray-200">
          <span className="inline-flex items-center gap-2"><FiPower size={12} /> {coupon.isActive ? "Deactivate" : "Activate"}</span>
        </button>

        <button type="button" onClick={() => onDelete(coupon)} className="flex-1 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          <span className="inline-flex items-center gap-2"><FiTrash2 size={12} /> Delete</span>
        </button>
      </div>
    </div>
  );
}

export default CouponCard;
