import type { Order } from "../../../features/orders/types/order";

interface OrderSummaryProps {
  order: Order;
}

function OrderSummary({
  order,
}: OrderSummaryProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
      <h2 className="text-lg font-semibold text-white">
        Order Summary
      </h2>

      <div className="mt-5 space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Subtotal
          </span>

          <span className="text-slate-200">
            ₹
            {order.subtotal.toLocaleString(
              "en-IN"
            )}
          </span>
        </div>

        {/* Discount */}
        {order.discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Discount
            </span>

            <span className="text-emerald-400">
              - ₹
              {order.discount.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            Shipping
          </span>

          <span
            className={
              order.shippingCharge === 0
                ? "text-emerald-400"
                : "text-slate-200"
            }
          >
            {order.shippingCharge === 0
              ? "Free"
              : `₹${order.shippingCharge.toLocaleString(
                  "en-IN"
                )}`}
          </span>
        </div>

        {/* Tax */}
        {order.tax > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400">
              Tax
            </span>

            <span className="text-slate-200">
              ₹
              {order.tax.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-white/10" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-white">
          Total
        </span>

        <span className="text-xl font-bold text-white">
          ₹
          {order.totalAmount.toLocaleString(
            "en-IN"
          )}
        </span>
      </div>
    </div>
  );
}

export default OrderSummary;