import { Link, useParams } from "react-router-dom";

import { useOrder } from "../../features/orders/hooks/useOrder";

import OrderItems from "./components/OrderItems";
import OrderStatusBadge from "./components/OrderStatusBadge";
import OrderSummary from "./components/OrderSummary";
import OrderShippingAddress from "./components/OrderShippingAddress";
import OrderPaymentDetails from "./components/OrderPaymentDetails";

function OrderDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const {
    data: order,
    isLoading,
    isError,
  } = useOrder(id);

  // Loading
  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-[#151B2B]" />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-64 animate-pulse rounded-2xl bg-[#151B2B]" />
            <div className="h-64 animate-pulse rounded-2xl bg-[#151B2B]" />
          </div>

          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-2xl bg-[#151B2B]" />
            <div className="h-48 animate-pulse rounded-2xl bg-[#151B2B]" />
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (isError || !order) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <Link
          to="/orders"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Orders
        </Link>

        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <div className="text-4xl">
            ⚠️
          </div>

          <h1 className="mt-4 text-xl font-semibold text-white">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            We couldn't find this order or you
            don't have permission to view it.
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
          >
            Back to Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/orders"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Orders
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Order Details
            </h1>

            <OrderStatusBadge
              status={order.orderStatus}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
            <span>
              Order #{order._id}
            </span>

            <span>
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
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
          <p className="text-xs text-slate-500">
            Order Total
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            ₹
            {order.totalAmount.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          {/* Products */}
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Ordered Products
              </h2>

              <span className="text-sm text-slate-400">
                {order.items.length}{" "}
                {order.items.length === 1
                  ? "product"
                  : "products"}
              </span>
            </div>

            <div className="mt-5">
              <OrderItems
                items={order.items}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <OrderShippingAddress
            address={order.shippingAddress}
          />

          {/* Payment */}
          <OrderPaymentDetails
            order={order}
          />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <OrderSummary order={order} />

          {/* Checkout Mode */}
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <h2 className="text-lg font-semibold text-white">
              Order Information
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Order Type
                </span>

                <span className="text-sm font-medium capitalize text-white">
                  {order.checkoutMode ===
                  "buyNow"
                    ? "Buy Now"
                    : "Cart Order"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Payment
                </span>

                <span className="text-sm font-medium text-white">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Status
                </span>

                <OrderStatusBadge
                  status={order.orderStatus}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h2 className="text-lg font-semibold text-white">
                Order Notes
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderDetailsPage;