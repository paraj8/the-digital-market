import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

import { useAvailableCoupons } from "../../../../features/coupons/hooks/useAvailableCoupons";

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

function ProductOffers({ productId }: { productId: string }) {
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
      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-300">
        Loading offers...
      </div>
    );
  }

  if (!coupons.length) {
    return null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-violet-500/30 bg-slate-900/80 p-5 shadow-lg shadow-violet-950/20">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-violet-300">
            Special Offer
          </p>
          <h2 className="mt-1 text-xl font-semibold text-white">
            Best deals for this product
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {coupons.map((coupon) => {
          const isPercentage = coupon.discountType === "percentage";
          const discountLabel = isPercentage
            ? `${coupon.discountValue}% OFF`
            : `${formatPrice(coupon.discountValue)} OFF`;

          return (
            <div
              key={coupon._id}
              className="rounded-xl border border-white/10 bg-slate-800/80 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">
                    {coupon.code}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {discountLabel}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200 transition hover:border-violet-400 hover:bg-violet-500/20"
                >
                  <FiCopy size={14} />
                  Copy Code
                </button>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                {coupon.description || "Limited-time offer available now."}
              </p>

              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                <span>Minimum order: {formatPrice(coupon.minimumOrderAmount)}</span>
                {coupon.maximumDiscountAmount > 0 && (
                  <span>
                    Maximum discount: {formatPrice(coupon.maximumDiscountAmount)}
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

export default ProductOffers;
