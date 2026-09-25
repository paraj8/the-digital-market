import type { OrderItem } from "../../../../features/orders/types/order";

interface OrderItemsProps {
  items: OrderItem[];
}

function OrderItems({
  items,
}: OrderItemsProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.product}-${index}`}
          className="flex gap-4"
        >
          {/* Product Image */}
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0F19]">
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

          {/* Product Info */}
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-medium text-white">
              {item.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span>
                Qty: {item.quantity}
              </span>

              <span>
                ₹
                {item.price.toLocaleString(
                  "en-IN"
                )}{" "}
                each
              </span>
            </div>
          </div>

          {/* Subtotal */}
          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-white">
              ₹
              {item.subtotal.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;