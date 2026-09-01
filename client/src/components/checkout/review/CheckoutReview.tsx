
import {
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";

import type {
  CheckoutAddress,
  CheckoutItem,
  CheckoutSummary,
} from "../../../features/checkout/types/checkout";

interface CheckoutReviewProps {
  items: CheckoutItem[];
  address: CheckoutAddress | null;
  summary: CheckoutSummary;
  onConfirm: () => void | Promise<void>;
  confirming?: boolean;
}

function CheckoutReview({
  items,
  address,
  summary,
  onConfirm,
  confirming = false,
}: CheckoutReviewProps) {
  const isDisabled =
    !address ||
    items.length === 0 ||
    confirming;

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#121826]
        p-6
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-violet-500/10
            text-violet-400
          "
        >
          <FiCheckCircle size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Review Your Order
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Check your order details before payment.
          </p>
        </div>
      </div>

      {/* Items */}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-200">
          Items
        </h3>

        <div className="mt-3 space-y-3">
          {items.map((item) => {
            const itemTotal =
              item.salePrice * item.quantity;

            return (
              <div
                key={item.productId}
                className="
                  flex
                  gap-4
                  rounded-xl
                  border border-white/10
                  bg-white/[0.02]
                  p-3
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    h-16
                    w-16
                    shrink-0
                    rounded-lg
                    object-cover
                  "
                />

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-medium">
                    {item.title}
                  </h4>

                  {item.brand && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.brand}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-slate-400">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ₹
                    {itemTotal.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {item.price >
                    item.salePrice && (
                    <p className="mt-1 text-xs text-slate-500 line-through">
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address */}

      <div
        className="
          mt-6
          border-t
          border-white/10
          pt-6
        "
      >
        <div className="flex items-center gap-2">
          <FiMapPin className="text-violet-400" />

          <h3 className="text-sm font-semibold">
            Delivery Address
          </h3>
        </div>

        {address ? (
          <div
            className="
              mt-3
              rounded-xl
              border border-white/10
              bg-white/[0.02]
              p-4
              text-sm
              leading-6
              text-slate-300
            "
          >
            <p className="font-medium text-white">
              {address.fullName}
            </p>

            <p>{address.phone}</p>

            <p className="mt-2">
              {address.addressLine1}
            </p>

            {address.addressLine2 && (
              <p>{address.addressLine2}</p>
            )}

            <p>
              {address.city},{" "}
              {address.state}
            </p>

            <p>
              {address.postalCode},{" "}
              {address.country}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-red-400">
            Please select a delivery address.
          </p>
        )}
      </div>

      {/* Payment */}

      <div
        className="
          mt-6
          border-t
          border-white/10
          pt-6
        "
      >
        <div className="flex items-center gap-2">
          <FiCreditCard className="text-violet-400" />

          <h3 className="text-sm font-semibold">
            Payment Method
          </h3>
        </div>

        <div
          className="
            mt-3
            rounded-xl
            border border-violet-500/30
            bg-violet-500/10
            p-4
          "
        >
          <p className="font-medium">
            Cashfree
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Secure payment using UPI, Cards,
            Net Banking and other supported
            payment methods.
          </p>
        </div>
      </div>

      {/* Price */}

      <div
        className="
          mt-6
          border-t
          border-white/10
          pt-6
        "
      >
        <h3 className="text-sm font-semibold">
          Price Details
        </h3>

        <div className="mt-4 space-y-3 text-sm">
          {/* Item Total */}

          <div className="flex justify-between">
            <span className="text-slate-400">
              Item Total
            </span>

            <span>
              ₹
              {summary.subtotal.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          {/* Discount */}

          {summary.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-400">
                Discount
              </span>

              <span className="text-green-400">
                - ₹
                {summary.discount.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          )}

          {/* GST */}

          <div className="flex justify-between">
            <span className="text-slate-400">
              GST
            </span>

            <span className="text-slate-300">
              Included
            </span>
          </div>

          {/* Shipping */}

          <div className="flex justify-between">
            <span className="text-slate-400">
              Shipping
            </span>

            <span>
              {summary.shipping === 0
                ? "Free"
                : `₹${summary.shipping.toLocaleString(
                    "en-IN"
                  )}`}
            </span>
          </div>

          {/* Total */}

          <div
            className="
              border-t
              border-white/10
              pt-4
            "
          >
            <div className="flex justify-between">
              <span className="text-base font-semibold">
                Total Payable
              </span>

              <span className="text-xl font-bold">
                ₹
                {summary.total.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm */}

      <button
        type="button"
        onClick={onConfirm}
        disabled={isDisabled}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-blue-600
          py-3
          font-semibold
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {confirming ? (
          <>
            <FiLoader
              size={18}
              className="animate-spin"
            />

            Processing Payment...
          </>
        ) : (
          "Confirm & Pay"
        )}
      </button>
    </div>
  );
}

export default CheckoutReview;

