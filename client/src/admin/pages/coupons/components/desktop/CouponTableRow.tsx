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

interface CouponTableRowProps {
  coupon: Coupon;
  onView: (coupon: Coupon) => void;
  onEdit: (coupon: Coupon) => void;
  onToggleActive: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

function CouponTableRow({
  coupon,
  onView,
  onEdit,
  onToggleActive,
  onDelete,
}: CouponTableRowProps) {
  return (
    <tr className="transition hover:bg-white/[0.02]">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <FiPower size={18} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{coupon.code}</p>
              <span className="text-xs text-gray-600">{coupon._id.slice(-6).toUpperCase()}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {coupon.discountType === "percentage" ? "Percentage" : "Fixed"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {coupon.scope === "products"
                ? `${coupon.products?.filter(Boolean).length ?? 0} Products`
                : "All Products"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="font-semibold text-white">{formatDiscountValue(coupon)}</span>
      </td>

      <td className="px-6 py-4 text-sm text-gray-400">
        {formatCurrency(coupon.minimumOrderAmount)}
      </td>

      <td className="px-6 py-4">
        <div className="w-32">
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-gray-400">{coupon.usedCount}</span>
            <span className="text-gray-600">{coupon.usageLimit > 0 ? coupon.usageLimit : "∞"}</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{ width: `${coupon.usageLimit > 0 ? getUsagePercentage(coupon) : 0}%` }}
            />
          </div>

          <div className="mt-1 text-[10px] text-gray-500">{getUsageDisplay(coupon)}</div>
        </div>
      </td>

      <td className="px-6 py-4">
        <CouponStatusBadge coupon={coupon} />
      </td>

      <td className="px-6 py-4 text-sm text-gray-400">{formatDate(coupon.endDate)}</td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button type="button" title="View coupon" onClick={() => onView(coupon)} className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400">
            <FiEye size={16} />
          </button>

          <button type="button" title="Edit coupon" onClick={() => onEdit(coupon)} className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400">
            <FiEdit2 size={16} />
          </button>

          <button type="button" title={coupon.isActive ? "Deactivate coupon" : "Activate coupon"} onClick={() => onToggleActive(coupon)} className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400">
            <FiPower size={16} />
          </button>

          <button type="button" title="Delete coupon" onClick={() => onDelete(coupon)} className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400">
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CouponTableRow;
