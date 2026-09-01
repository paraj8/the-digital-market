
import OrderRow from "./OrderRow";

import type {
  AdminOrder,
  AdminOrderStatus,
} from "../../../api/adminOrderApi";

interface OrdersTableProps {
  orders: AdminOrder[];

  onView: (orderId: string) => void;

  onUpdateStatus: (
    orderId: string,
    orderStatus: AdminOrderStatus
  ) => void;

  updating: boolean;
}

function OrdersTable({
  orders,
  onView,
  onUpdateStatus,
  updating,
}: OrdersTableProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-slate-900/60
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">

          {/* Header */}

          <thead
            className="
              border-b
              border-white/10
              bg-slate-800/40
            "
          >
            <tr
              className="
                text-left
                text-xs
                uppercase
                tracking-wider
                text-gray-500
              "
            >
              <th className="px-6 py-4">
                Order
              </th>

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Payment
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}

          <tbody
            className="
              divide-y
              divide-white/5
            "
          >
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onView={onView}
                  onUpdateStatus={
                    onUpdateStatus
                  }
                  updating={updating}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-gray-500
                  "
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default OrdersTable;

