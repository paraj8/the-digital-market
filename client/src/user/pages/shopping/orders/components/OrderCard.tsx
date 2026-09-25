import { Link } from "react-router-dom";

import type { OrderSummary } from "../../../../features/orders/api/orderApi";

import OrderItems from "./OrderItems";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: OrderSummary;
}

function OrderCard({
  order,
}: OrderCardProps) {
  const totalProducts = order.items.length;

  const totalQuantity =
    order.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Order ID
          </p>

          <p className="mt-1 break-all font-mono text-sm text-white">
            #{order._id}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {new Date(
              order.createdAt
            ).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <OrderStatusBadge
          status={order.orderStatus}
        />
      </div>

      {/* Products */}
      <div className="p-5">
        <OrderItems
          items={order.items}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {totalProducts}{" "}
            {totalProducts === 1
              ? "product"
              : "products"}{" "}
            · {totalQuantity}{" "}
            {totalQuantity === 1
              ? "item"
              : "items"}
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ₹
            {order.totalAmount.toLocaleString(
              "en-IN"
            )}
          </p>

          <p
            className={`mt-1 text-xs font-medium capitalize ${
              order.paymentStatus ===
              "paid"
                ? "text-emerald-400"
                : order.paymentStatus ===
                  "failed"
                ? "text-red-400"
                : "text-amber-400"
            }`}
          >
            Payment:{" "}
            {order.paymentStatus}
          </p>
        </div>

        <Link
          to={`/orders/${order._id}`}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/5"
        >
          View Order
        </Link>
      </div>
    </article>
  );
}

export default OrderCard;