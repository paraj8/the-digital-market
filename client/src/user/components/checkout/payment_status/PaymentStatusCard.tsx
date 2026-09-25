import PaymentStatusIcon from "./PaymentStatusIcon";
import PaymentStatusDetails from "./PaymentStatusDetails";
import PaymentStatusActions from "./PaymentStatusActions";

import type {
  CashfreePaymentStatus,
} from "../../../features/cashfree/types/cashfree";

/*
====================================
NORMALIZED PAYMENT STATUS
====================================
*/

type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "expired"
  | null;

/*
====================================
PROPS
====================================
*/

interface PaymentStatusCardProps {
  orderId: string;

  status: string | null;

  payment: CashfreePaymentStatus | null;

  loading?: boolean;

  fetching?: boolean;

  onRetry?: () => void | Promise<void>;

  onContinue?: () => void;

  onBackToOrders?: () => void;
}

/*
====================================
COMPONENT
====================================
*/

function PaymentStatusCard({
  orderId,
  status,
  payment,
  loading = false,
  fetching = false,
  onRetry,
  onContinue,
  onBackToOrders,
}: PaymentStatusCardProps) {
  /*
  ====================================
  NORMALIZE STATUS
  ====================================
  */

  const normalizedStatus: PaymentStatus =
    (() => {
      switch (
        status?.toUpperCase()
      ) {
        case "PAID":
          return "paid";

        case "FAILED":
          return "failed";

        case "CANCELLED":
          return "cancelled";

        case "EXPIRED":
          return "expired";

        case "ACTIVE":
        case "PENDING":
        default:
          return "pending";
      }
    })();

  /*
  ====================================
  DISPLAY DATA
  ====================================
  */

  const displayOrderId =
    payment?.order_id ||
    orderId;

  const displayAmount =
    payment?.order_amount;

  /*
  ====================================
  TITLE
  ====================================
  */

  const title =
    normalizedStatus === "paid"
      ? "Payment Successful"
      : normalizedStatus === "failed"
        ? "Payment Failed"
        : normalizedStatus === "cancelled"
          ? "Payment Cancelled"
          : normalizedStatus === "expired"
            ? "Payment Expired"
            : loading && !status
              ? "Checking Payment..."
              : "Processing Payment";

  /*
  ====================================
  DESCRIPTION
  ====================================
  */

  const description =
    loading && !status
      ? "Please wait while we check your payment status."
      : normalizedStatus === "paid"
        ? "Your payment has been successfully received."
        : normalizedStatus === "failed"
          ? "Your payment could not be completed."
          : normalizedStatus === "cancelled"
            ? "The payment was cancelled."
            : normalizedStatus === "expired"
              ? "The payment session has expired."
              : "We are waiting for confirmation from the payment gateway.";

  /*
  ====================================
  RENDER
  ====================================
  */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-2xl
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#121826]
        shadow-2xl
      "
    >
      {/* ====================================
          HEADER
      ==================================== */}

      <div
        className="
          border-b
          border-white/10
          px-6
          py-8
          text-center
          sm:px-8
        "
      >
        {/* Status Icon */}

        <div className="flex justify-center">
          <PaymentStatusIcon
            status={normalizedStatus}
          />
        </div>

        {/* Title */}

        <h1
          className="
            mt-5
            text-2xl
            font-bold
            text-white
          "
        >
          {title}
        </h1>

        {/* Description */}

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
          {description}
        </p>

        {/* ====================================
            POLLING INDICATOR
        ==================================== */}

        {fetching &&
          normalizedStatus ===
            "pending" && (
            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-violet-400
                "
              />

              Checking payment status...
            </div>
          )}
      </div>

      {/* ====================================
          PAYMENT DETAILS
      ==================================== */}

      <div
        className="
          px-6
          py-6
          sm:px-8
        "
      >
        <PaymentStatusDetails
          orderId={displayOrderId}
          amount={displayAmount}
          status={normalizedStatus}
        />
      </div>

      {/* ====================================
          ACTIONS
      ==================================== */}

      <div
        className="
          border-t
          border-white/10
          bg-white/[0.02]
          px-6
          py-6
          sm:px-8
        "
      >
        <PaymentStatusActions
          status={normalizedStatus}
          loading={loading || fetching}
          onViewOrder={onBackToOrders}
          onContinueShopping={onContinue}
          onTryAgain={onRetry}
          onCheckAgain={onRetry}
        />
      </div>
    </div>
  );
}

export default PaymentStatusCard;