interface PaymentStatusDetailsProps {
  orderId: string;
  amount?: number;
  status:
    | "pending"
    | "paid"
    | "failed"
    | "cancelled"
    | "expired"
    | null;
}

function PaymentStatusDetails({
  orderId,
  amount,
  status,
}: PaymentStatusDetailsProps) {
  /*
  ====================================
  STATUS LABEL
  ====================================
  */

  const statusLabel = {
    pending: "Payment Pending",
    paid: "Payment Successful",
    failed: "Payment Failed",
    cancelled: "Payment Cancelled",
    expired: "Payment Expired",
  };

  /*
  ====================================
  STATUS COLOR
  ====================================
  */

  const statusColor = {
    pending: "text-violet-400",
    paid: "text-green-400",
    failed: "text-red-400",
    cancelled: "text-orange-400",
    expired: "text-yellow-400",
  };

  const currentStatus =
    status ?? "pending";

  return (
    <div className="mt-6 w-full">
      {/* Status */}

      <div className="text-center">
        <h2
          className={`
            text-2xl
            font-bold
            ${statusColor[currentStatus]}
          `}
        >
          {statusLabel[currentStatus]}
        </h2>

        {currentStatus === "pending" && (
          <p className="mt-2 text-sm text-slate-400">
            We're waiting for confirmation from
            the payment gateway.
          </p>
        )}

        {currentStatus === "paid" && (
          <p className="mt-2 text-sm text-slate-400">
            Your payment has been successfully
            received.
          </p>
        )}

        {currentStatus === "failed" && (
          <p className="mt-2 text-sm text-slate-400">
            We couldn't complete your payment.
            Please try again.
          </p>
        )}

        {currentStatus === "cancelled" && (
          <p className="mt-2 text-sm text-slate-400">
            The payment was cancelled before
            completion.
          </p>
        )}

        {currentStatus === "expired" && (
          <p className="mt-2 text-sm text-slate-400">
            The payment session has expired.
            Please start the payment again.
          </p>
        )}
      </div>

      {/* Details */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-white/10
          bg-white/[0.02]
          p-4
        "
      >
        {/* Order ID */}

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            Order ID
          </span>

          <span
            className="
              max-w-[65%]
              truncate
              text-right
              text-sm
              font-medium
              text-white
            "
            title={orderId}
          >
            {orderId}
          </span>
        </div>

        {/* Amount */}

        {amount !== undefined && (
          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              border-t
              border-white/10
              pt-3
            "
          >
            <span className="text-sm text-slate-400">
              Amount
            </span>

            <span className="text-sm font-semibold text-white">
              ₹
              {amount.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentStatusDetails;