import type { AdminOrder } from "../../../../api/adminOrderApi";

interface OrderStatsProps {
  orders: AdminOrder[];
}

function OrderStats({
  orders,
}: OrderStatsProps) {
  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "pending"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "processing"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "delivered"
    ).length;

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >

      {/* Total */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          p-5
        "
      >
        <p className="text-sm text-gray-400">
          Total Orders
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-white
          "
        >
          {totalOrders}
        </p>
      </div>

      {/* Pending */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          p-5
        "
      >
        <p className="text-sm text-gray-400">
          Pending
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-yellow-400
          "
        >
          {pendingOrders}
        </p>
      </div>

      {/* Processing */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          p-5
        "
      >
        <p className="text-sm text-gray-400">
          Processing
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-blue-400
          "
        >
          {processingOrders}
        </p>
      </div>

      {/* Delivered */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          p-5
        "
      >
        <p className="text-sm text-gray-400">
          Delivered
        </p>

        <p
          className="
            mt-2
            text-2xl
            font-bold
            text-green-400
          "
        >
          {deliveredOrders}
        </p>
      </div>

    </div>
  );
}

export default OrderStats;

