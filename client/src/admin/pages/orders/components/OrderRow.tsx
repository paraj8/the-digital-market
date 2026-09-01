
import { FiEye } from "react-icons/fi";

import OrderStatusBadge from "./OrderStatusBadge";

import type {
  AdminOrder,
  AdminOrderStatus,
} from "../../../api/adminOrderApi";

interface OrderRowProps {
  order: AdminOrder;

  onView: (orderId: string) => void;

  onUpdateStatus: (
    orderId: string,
    orderStatus: AdminOrderStatus
  ) => void;

  updating: boolean;
}

function OrderRow({
  order,
  onView,
  onUpdateStatus,
  updating,
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
        <div className="flex items-center gap-3">

          <OrderStatusBadge
            status={statusLabel}
          />

          <select
            value={order.orderStatus}
            disabled={updating}
            onChange={(e) =>
              onUpdateStatus(
                order._id,
                e.target
                  .value as AdminOrderStatus
              )
            }
            className="
              rounded-lg
              border
              border-white/10
              bg-slate-800
              px-2
              py-1.5
              text-xs
              text-gray-300
              outline-none
              transition
              focus:border-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            title="Update order status"
          >
            <option value="pending">
              Pending
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="processing">
              Processing
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="delivered">
              Delivered
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

        </div>
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

