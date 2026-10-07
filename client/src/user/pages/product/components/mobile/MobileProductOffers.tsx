import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAvailableCoupons } from "../../../../features/coupons/hooks/useAvailableCoupons";

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

function MobileProductOffers({ productId }: { productId: string }) {
  const { data: coupons = [], isLoading } = useAvailableCoupons(productId);

  const handleCopy = async (code: string) => {
    try {
      if (!navigator.clipboard) {
        toast.error("Clipboard is unavailable on this browser");
        return;
      }

      await navigator.clipboard.writeText(code);
      toast.success(`Coupon code ${code} copied`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy coupon code");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
        Loading offers...
      </div>
    );
  }

  if (!coupons.length) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-violet-500/30 bg-slate-900/80 p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-violet-300">
        Special Offer
      </p>

      <div className="mt-3 space-y-3">
        {coupons.map((coupon) => {
          const isPercentage = coupon.discountType === "percentage";
          const discountLabel = isPercentage
            ? `${coupon.discountValue}% OFF`
            : `${formatPrice(coupon.discountValue)} OFF`;

          return (
            <div
              key={coupon._id}
              className="rounded-xl border border-white/10 bg-slate-800/80 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                    {coupon.code}
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {discountLabel}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/40 bg-violet-500/10 px-2.5 py-2 text-xs font-medium text-violet-200"
                >
                  <FiCopy size={12} />
                  Copy
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-300">
                {coupon.description || "Limited-time offer available now."}
              </p>

              <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-400">
                <span>Minimum order: {formatPrice(coupon.minimumOrderAmount)}</span>
                {coupon.maximumDiscountAmount > 0 && (
                  <span>
                    Max discount: {formatPrice(coupon.maximumDiscountAmount)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MobileProductOffers;
