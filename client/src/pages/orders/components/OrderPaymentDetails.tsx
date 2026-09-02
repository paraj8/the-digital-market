import type { Order } from "../../../features/orders/types/order";

interface OrderPaymentDetailsProps {
  order: Order;
}

function OrderPaymentDetails({
  order,
}: OrderPaymentDetailsProps) {
  const paymentStatusStyles = {
    pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",

    paid:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    failed:
      "bg-red-500/10 text-red-400 border-red-500/20",

    refunded:
      "bg-violet-500/10 text-violet-400 border-violet-500/20",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <h2 className="text-lg font-semibold text-white">
        Payment Details
      </h2>

      <div className="mt-5 space-y-4">
        {/* Payment Method */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            Payment Method
          </span>

          <span className="text-sm font-medium text-white">
            {order.paymentMethod}
          </span>
        </div>

        {/* Payment Status */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            Payment Status
          </span>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
              paymentStatusStyles[
                order.paymentStatus
              ]
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        {/* Order ID */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            Order ID
          </span>

          <span className="max-w-[200px] truncate font-mono text-xs text-slate-300">
            #{order._id}
          </span>
        </div>

        {/* Order Date */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-slate-400">
            Order Date
          </span>

          <span className="text-sm text-slate-300">
            {new Date(
              order.createdAt
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderPaymentDetails;