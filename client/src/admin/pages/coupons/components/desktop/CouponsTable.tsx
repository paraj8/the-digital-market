import type { Coupon } from "../../../../../shared/types/coupon";
import CouponTableRow from "./CouponTableRow";

interface CouponsTableProps {
  coupons: Coupon[];
  isLoading: boolean;
  isError: boolean;
  onView: (coupon: Coupon) => void;
  onEdit: (coupon: Coupon) => void;
  onToggleActive: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
}

function CouponsTable({
  coupons,
  isLoading,
  isError,
  onView,
  onEdit,
  onToggleActive,
  onDelete,
}: CouponsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1150px]">
          <thead className="border-b border-white/10 bg-slate-800/40">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">Coupon</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Min. Order</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Expires</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                  Loading coupons...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-red-400">
                  Failed to load coupons.
                </td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-400">
                  No coupons found.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <CouponTableRow
                  key={coupon._id}
                  coupon={coupon}
                  onView={onView}
                  onEdit={onEdit}
                  onToggleActive={onToggleActive}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CouponsTable;
