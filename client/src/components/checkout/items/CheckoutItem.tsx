import type { CheckoutItem as CheckoutItemType } from "../../../types/checkout.ts";

interface CheckoutItemProps {
  item: CheckoutItemType;
}

function CheckoutItem({
  item,
}: CheckoutItemProps) {
  const hasDiscount =
    item.salePrice > 0 &&
    item.salePrice < item.price;

  const displayPrice =
    hasDiscount
      ? item.salePrice
      : item.price;

  return (
    <div
      className="
        flex
        gap-4

        rounded-2xl
        border border-white/10

        bg-[#121826]

        p-4
      "
    >
      {/* Image */}

      <img
        src={
          item.image ||
          "https://placehold.co/200x200"
        }
        alt={item.title}
        className="
          h-24
          w-24

          rounded-xl

          object-cover
        "
      />

      {/* Content */}

      <div className="flex-1">
        <h3
          className="
            line-clamp-2
            font-semibold
          "
        >
          {item.title}
        </h3>

        {item.brand && (
          <p
            className="
              mt-1
              text-sm
              text-slate-400
            "
          >
            {item.brand}
          </p>
        )}

        <div
          className="
            mt-3
            flex
            items-center
            gap-3
          "
        >
          <span className="text-lg font-bold">
            ₹{displayPrice.toLocaleString("en-IN")}
          </span>

          {hasDiscount && (
            <span
              className="
                text-sm
                text-slate-500
                line-through
              "
            >
              ₹{item.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <p
          className="
            mt-2
            text-sm
            text-slate-400
          "
        >
          Quantity : {item.quantity}
        </p>
      </div>
    </div>
  );
}

export default CheckoutItem;