import { useCallback } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import PaymentStatusCard from "../../../components/checkout/payment_status/PaymentStatusCard";

import { useCashfreePaymentStatus } from "../../../features/cashfree/hooks/useCashfreePaymentStatus";
import { useRazorpayPaymentStatus } from "../../../features/razorpay/hooks/useRazorpay";

function CheckoutPaymentStatusPage() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  /*
  ====================================
  ORDER ID
  ====================================
  */

  const orderId =
    searchParams.get("orderId");
  const provider =
    searchParams.get("provider");
  const isRazorpay =
    provider === "Razorpay";

  /*
  ====================================
  CASHFREE PAYMENT STATUS
  ====================================
  */

  const {
    payment,
    isPending,
    isPaid,
    isFailed,
    isCancelled,
    isExpired,
    loading,
    fetching,
    error,
    refetch,
  } =
    useCashfreePaymentStatus(
      orderId ?? undefined,
      !isRazorpay
    );

  const razorpayStatus =
    useRazorpayPaymentStatus(
      orderId ?? undefined,
      isRazorpay
    );

  const activePayment =
    isRazorpay
      ? razorpayStatus.payment
        ? {
            order_id:
              razorpayStatus.payment.razorpay_order_id ??
              orderId ??
              undefined,
          }
        : null
      : payment;
  const activePending =
    isRazorpay
      ? razorpayStatus.isPending
      : isPending;
  const activePaid =
    isRazorpay
      ? razorpayStatus.isPaid
      : isPaid;
  const activeFailed =
    isRazorpay
      ? razorpayStatus.isFailed
      : isFailed;
  const activeCancelled =
    isRazorpay ? false : isCancelled;
  const activeExpired =
    isRazorpay ? false : isExpired;
  const activeLoading =
    isRazorpay
      ? razorpayStatus.loading
      : loading;
  const activeFetching =
    isRazorpay
      ? razorpayStatus.fetching
      : fetching;
  const activeError =
    isRazorpay
      ? razorpayStatus.error
      : error;

  /*
  ====================================
  RETRY / CHECK AGAIN
  ====================================
  */

  const handleRetry =
    useCallback(async () => {
      if (!orderId) {
        return;
      }

      try {
        await (
          isRazorpay
            ? razorpayStatus.refetch()
            : refetch()
        );
      } catch (error) {
        console.error(
          "Failed to check payment status:",
          error
        );
      }
    }, [
      orderId,
      refetch,
      isRazorpay,
      razorpayStatus,
    ]);

  /*
  ====================================
  CONTINUE SHOPPING
  ====================================
  */

  const handleContinue =
    useCallback(() => {
      navigate("/products");
    }, [navigate]);

  /*
  ====================================
  VIEW ORDERS
  ====================================
  */

  const handleViewOrder =
    useCallback(() => {
      navigate("/orders");
    }, [navigate]);

  /*
  ====================================
  MISSING ORDER ID
  ====================================
  */

  if (!orderId) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="
            mx-auto
            w-full
            max-w-2xl
            rounded-2xl
            border
            border-white/10
            bg-[#121826]
            p-8
            text-center
            shadow-2xl
          "
        >
          <h1
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Payment Information Not Found
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-400
            "
          >
            We couldn't find the order associated
            with this payment.
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="
              mt-6
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              px-6
              py-3
              font-semibold
              transition
              hover:opacity-90
            "
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /*
  ====================================
  PAYMENT ERROR
  ====================================
  */

  if (activeError && !activePayment) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="
            mx-auto
            w-full
            max-w-2xl
            rounded-2xl
            border
            border-white/10
            bg-[#121826]
            p-8
            text-center
            shadow-2xl
          "
        >
          <h1
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Unable to Check Payment
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-400
            "
          >
            We couldn't retrieve your payment
            status right now. Please try again.
          </p>

          <div
            className="
              mt-6
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:justify-center
            "
          >
            <button
              type="button"
              onClick={handleRetry}
              disabled={activeFetching}
              className="
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                px-6
                py-3
                font-semibold
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {activeFetching
                ? "Checking..."
                : "Try Again"}
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                px-6
                py-3
                font-medium
                text-slate-300
                transition
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
  ====================================
  NORMALIZED STATUS
  ====================================
  */

  const normalizedStatus =
    activePaid
      ? "paid"
      : activeFailed
        ? "failed"
        : activeCancelled
          ? "cancelled"
          : activeExpired
            ? "expired"
            : activePending
              ? "pending"
              : "pending";

  /*
  ====================================
  PAGE
  ====================================
  */

  return (
    <div
      className="
        mx-auto
        max-w-7xl
        px-4
        py-8
      "
    >
      <PaymentStatusCard
        orderId={orderId}
        status={normalizedStatus}
        payment={activePayment}
        loading={activeLoading}
        fetching={activeFetching}
        onRetry={handleRetry}
        onContinue={handleContinue}
        onBackToOrders={handleViewOrder}
      />
    </div>
  );
}

export default CheckoutPaymentStatusPage;

