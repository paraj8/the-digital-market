import { useState } from "react";
import toast from "react-hot-toast";

import { validateCoupon } from "../../features/coupons/api/couponApi";
import { useAvailableDiscounts } from "../../features/discounts/hooks/useAvailableDiscounts";
import { calculateDiscountEstimate } from "../../features/discounts/utils/calculateDiscountEstimate";
import type { DiscountEstimateItem } from "../../features/discounts/utils/calculateDiscountEstimate";

import CheckoutSection from "./common/CheckoutSection";
import SummaryRow from "./summary/SummaryRow";
import PlaceOrderButton from "./summary/PlaceOrderButton";

interface CheckoutSummaryProps {
  items: DiscountEstimateItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string | null;
  initialCouponDiscount?: number;
  onCouponChange?: (code: string | null) => void;
  onCouponDiscountChange?: (amount: number) => void;

  loading?: boolean;

  onPlaceOrder?: () => void;
}

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

function CheckoutSummary({
  items,
  subtotal,
  shipping,
  discount,
  tax,
  total,
  couponCode: initialCouponCode = null,
  initialCouponDiscount = 0,
  onCouponChange,
  onCouponDiscountChange,
  loading = false,
  onPlaceOrder,
}: CheckoutSummaryProps) {
  const {
    data: availableDiscounts = [],
    isError: isDiscountQueryError,
    error: discountQueryError,
  } = useAvailableDiscounts();
  const [couponInput, setCouponInput] = useState(() => initialCouponCode ?? "");
  const [appliedCouponCode, setAppliedCouponCode] = useState(() => initialCouponCode ?? "");
  const [couponDiscount, setCouponDiscount] = useState(initialCouponDiscount);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const bestAdditionalDiscount = calculateDiscountEstimate(
    availableDiscounts,
    items,
    Math.max(0, subtotal - couponDiscount)
  );
  const additionalDiscount = bestAdditionalDiscount?.amount ?? 0;

  const payableTotal = Math.max(
    0,
    total - additionalDiscount - couponDiscount
  );

  const handleApplyCoupon = async () => {
    const trimmedCode = couponInput.trim();

    if (!trimmedCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);

    try {
      const result = await validateCoupon({
        code: trimmedCode,
        orderAmount: subtotal,
        items,
      });

      const nextCouponCode = result.coupon?.code || trimmedCode.toUpperCase();

      setAppliedCouponCode(nextCouponCode);
      setCouponInput(nextCouponCode);
      setCouponDiscount(result.discount);
      onCouponDiscountChange?.(result.discount);
      onCouponChange?.(nextCouponCode);
      toast.success(`${nextCouponCode} applied successfully`);
    } catch (error: unknown) {
      setCouponDiscount(0);
      onCouponDiscountChange?.(0);
      setAppliedCouponCode("");
      setCouponInput("");
      onCouponChange?.(null);

      const message =
        error instanceof Error
          ? error.message
          : "Unable to apply coupon";

      toast.error(message);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode("");
    setCouponInput("");
    setCouponDiscount(0);
    onCouponDiscountChange?.(0);
    onCouponChange?.(null);
    toast.success("Coupon removed");
  };

  return (
    <CheckoutSection
      title="Order Summary"
      subtitle="Review your order before placing it."
    >
      <div className="mb-5 rounded-xl border border-white/10 bg-slate-900/60 p-3">
        <p className="mb-2 text-sm font-medium text-white">Have a coupon?</p>

        {appliedCouponCode ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  Applied Coupon
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {appliedCouponCode}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs font-medium text-rose-300 transition hover:text-rose-200"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Enter coupon code"
              className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon}
              className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </button>
          </div>
        )}
      </div>

      <SummaryRow
        label="Subtotal"
        value={formatPrice(subtotal)}
      />

      {isDiscountQueryError && (
        <p role="status" className="text-xs text-amber-300">
          {discountQueryError instanceof Error
            ? discountQueryError.message
            : "Promotional discounts could not be loaded. Eligibility will be recalculated when your order is placed."}
        </p>
      )}

      <SummaryRow
        label="Product Savings (included)"
        value={formatPrice(discount)}
      />

      {bestAdditionalDiscount && additionalDiscount > 0 && (
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2">
          <p className="text-xs font-medium text-violet-200">
            Automatic offer: {bestAdditionalDiscount.discount.name}
          </p>
          {bestAdditionalDiscount.discount.description && (
            <p className="mt-1 text-xs text-slate-400">
              {bestAdditionalDiscount.discount.description}
            </p>
          )}
          <SummaryRow
            label="Additional Discount"
            value={`-${formatPrice(additionalDiscount)}`}
            negative
          />
        </div>
      )}

      <SummaryRow
        label="Shipping"
        value={formatPrice(shipping)}
      />

      <SummaryRow
        label="Coupon Discount"
        value={`-${formatPrice(couponDiscount)}`}
        negative
      />

      <SummaryRow
        label="Tax (included)"
        value={formatPrice(tax)}
      />

      <div className="my-4 border-t border-white/10" />

      <SummaryRow
        label="Payable Amount"
        value={formatPrice(payableTotal)}
        highlight
      />

      <PlaceOrderButton
        loading={loading}
        onClick={onPlaceOrder}
      />
    </CheckoutSection>
  );
}

export default CheckoutSummary;