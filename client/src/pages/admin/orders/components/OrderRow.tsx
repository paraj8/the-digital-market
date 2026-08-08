import { FiEye } from "react-icons/fi";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderRowProps {
  order: {
    _id: string;
    totalAmount: number;
    orderStatus: string;
    paymentStatus: string;
    paymentMethod: string;
    createdAt: string;
    user?: {
      fullName: string;
      email: string;
    };
  };

  onView: (orderId: string) => void;
}

function OrderRow({
  order,
  onView,
}: OrderRowProps) {
  const date = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const paymentLabel =
    order.paymentStatus
      .charAt(0)
      .toUpperCase() +
    order.paymentStatus.slice(1);

  const statusLabel =
    order.orderStatus
      .charAt(0)
      .toUpperCase() +
    order.orderStatus.slice(1);

  return (
    <tr
      className="
        transition
        hover:bg-white/[0.02]
      "
    >
      {/* Order */}
      <td className="px-6 py-4">
        <span className="font-medium text-violet-400">
          #{order._id.slice(-8).toUpperCase()}
        </span>
      </td>

      {/* Customer */}
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-white">
            {order.user?.fullName ??
              "Unknown Customer"}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {order.user?.email ?? "—"}
          </p>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-400">
        {date}
      </td>

      {/* Amount */}
      <td className="px-6 py-4 font-medium text-white">
        ₹
        {order.totalAmount.toLocaleString(
          "en-IN"
        )}
      </td>

      {/* Payment */}
      <td className="px-6 py-4">
        <span
          className={`
            text-sm
            ${
              order.paymentStatus ===
              "paid"
                ? "text-green-400"
                : order.paymentStatus ===
                  "failed"
                ? "text-red-400"
                : "text-gray-300"
            }
          `}
        >
          {paymentLabel}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <OrderStatusBadge
          status={statusLabel}
        />
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={() =>
            onView(order._id)
          }
          className="
            inline-flex
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            p-2
            text-gray-400
            transition
            hover:border-violet-500/30
            hover:bg-violet-500/10
            hover:text-violet-400
          "
          title="View order"
        >
          <FiEye size={17} />
        </button>
      </td>
    </tr>
  );
}

export default OrderRow;

