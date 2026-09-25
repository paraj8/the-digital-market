import { Link } from "react-router-dom";

import { useOrders } from "../../../features/orders/hooks/useOrders";
import OrderStatusBadge from "./components/OrderStatusBadge";

function OrdersPage() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useOrders();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white">
          My Orders
        </h1>

        <div className="mt-8 space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-2xl bg-[#151B2B]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white">
          My Orders
        </h1>

        <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <p className="text-red-400">
            Failed to load your orders.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white">
          My Orders
        </h1>

        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111827] px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
            📦
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            No orders yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-400">
            You haven't placed any orders yet.
            Start shopping and your orders will
            appear here.
          </p>

          <Link
            to="/products"
            className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-slate-200"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Orders
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {orders.length}{" "}
          {orders.length === 1
            ? "order"
            : "orders"}{" "}
          placed
        </p>
      </div>

      {/* Orders */}
      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <article
            key={order._id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition hover:border-white/20"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Order ID
                </p>

                <p className="mt-1 break-all font-mono text-sm text-white">
                  #{order._id}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Placed on{" "}
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
                </p>
              </div>

              <OrderStatusBadge
                status={order.orderStatus}
              />
            </div>

            {/* Products */}
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">
                  Ordered Products
                </h2>

                <span className="text-xs text-slate-500">
                  {order.items.length}{" "}
                  {order.items.length === 1
                    ? "product"
                    : "products"}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map(
                  (item, index) => (
                    <div
                      key={`${item.product}-${index}`}
                      className="flex gap-4 rounded-xl border border-white/5 bg-[#0B0F19] p-3"
                    >
                      {/* Product Image */}
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#151B2B] sm:h-28 sm:w-28">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-600">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-medium text-white sm:text-base">
                          {item.title}
                        </h3>

                        <div className="mt-2 space-y-1 text-xs text-slate-400 sm:text-sm">
                          <p>
                            Quantity:{" "}
                            <span className="text-slate-300">
                              {item.quantity}
                            </span>
                          </p>

                          <p>
                            Price: ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-white">
                          ₹
                          {item.subtotal.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Order Footer */}
            <div className="flex flex-col gap-5 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Payment + Total */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div>
                  <p className="text-xs text-slate-500">
                    Payment
                  </p>

                  <p
                    className={`mt-1 text-sm font-medium capitalize ${
                      order.paymentStatus ===
                      "paid"
                        ? "text-emerald-400"
                        : order.paymentStatus ===
                          "failed"
                        ? "text-red-400"
                        : "text-amber-400"
                    }`}
                  >
                    {order.paymentStatus}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    ₹
                    {order.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Order Type
                  </p>

                  <p className="mt-1 text-sm capitalize text-slate-300">
                    {order.checkoutMode ===
                    "buyNow"
                      ? "Buy Now"
                      : "Cart Order"}
                  </p>
                </div>
              </div>

              {/* Details Button */}
              <Link
                to={`/orders/${order._id}`}
                className="rounded-lg bg-white px-5 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-slate-200"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
