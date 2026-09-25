import type { OrderStatus } from "../../../../features/orders/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const statusStyles: Record<
    OrderStatus,
    string
  > = {
    pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",

    confirmed:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    processing:
      "bg-violet-500/10 text-violet-400 border-violet-500/20",

    shipped:
      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

    delivered:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    cancelled:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const statusLabels: Record<
    OrderStatus,
    string
  > = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />

      {statusLabels[status]}
    </span>
  );
}

export default OrderStatusBadge;