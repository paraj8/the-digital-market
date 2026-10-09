import { FiX } from "react-icons/fi";

import type { Coupon } from "../../../../shared/types/coupon";
import {
  formatCurrency,
  formatDate,
  formatDiscountValue,
  getCouponStatus,
  getUsageDisplay,
} from "../couponUtils";
import CouponStatusBadge from "./CouponStatusBadge";

interface CouponDetailsModalProps {
  isOpen: boolean;
  coupon: Coupon | null;
  isLoading: boolean;
  onClose: () => void;
}

function CouponDetailsModal({
  isOpen,
  coupon,
  isLoading,
  onClose,
}: CouponDetailsModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/60">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white">Coupon Details</h2>
            <p className="mt-1 text-sm text-gray-400">Read-only summary of the selected coupon.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-white/20 hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="px-6 py-10 text-center text-gray-400">Loading coupon details...</div>
        ) : !coupon ? (
          <div className="px-6 py-10 text-center text-gray-400">No coupon selected.</div>
        ) : (
          <div className="space-y-5 px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Code</p>
                <p className="mt-2 text-2xl font-bold text-white">{coupon.code}</p>
              </div>

              <CouponStatusBadge coupon={coupon} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Description</p>
                <p className="mt-2 text-sm text-gray-200">{coupon.description || "—"}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Discount</p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {formatDiscountValue(coupon)}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Applies To</p>
                <p className="mt-2 text-sm text-gray-200">
                  {coupon.scope === "products"
                    ? `${coupon.products?.length ?? 0} Products`
                    : "All Products"}
                </p>
                {coupon.scope === "products" && coupon.products?.some(
                  (product) => Boolean(product) && typeof product !== "string"
                ) && (
                  <ul className="mt-3 space-y-2">
                    {coupon.products.map((product) =>
                      !product || typeof product === "string" ? null : (
                        <li key={product._id} className="flex items-center gap-2 text-sm text-gray-300">
                          {product.images[0]?.url && (
                            <img
                              src={product.images[0].url}
                              alt=""
                              className="h-8 w-8 rounded object-cover"
                            />
                          )}
                          <span>{product.title}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Minimum Order</p>
                <p className="mt-2 text-sm text-gray-200">{formatCurrency(coupon.minimumOrderAmount)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Maximum Discount</p>
                <p className="mt-2 text-sm text-gray-200">
                  {coupon.maximumDiscountAmount > 0
                    ? formatCurrency(coupon.maximumDiscountAmount)
                    : "No cap"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Usage</p>
                <p className="mt-2 text-sm text-gray-200">{getUsageDisplay(coupon)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Status</p>
                <p className="mt-2 text-sm text-gray-200">{getCouponStatus(coupon)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Start Date</p>
                <p className="mt-2 text-sm text-gray-200">{formatDate(coupon.startDate)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">End Date</p>
                <p className="mt-2 text-sm text-gray-200">{formatDate(coupon.endDate)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Created At</p>
                <p className="mt-2 text-sm text-gray-200">{formatDate(coupon.createdAt)}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Updated At</p>
                <p className="mt-2 text-sm text-gray-200">{formatDate(coupon.updatedAt)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CouponDetailsModal;
