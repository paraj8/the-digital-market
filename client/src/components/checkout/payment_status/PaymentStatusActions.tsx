import {
  FiArrowRight,
  FiHome,
  FiRefreshCw,
  FiShoppingBag,
} from "react-icons/fi";

interface PaymentStatusActionsProps {
  status:
    | "pending"
    | "paid"
    | "failed"
    | "cancelled"
    | "expired"
    | null;

  loading?: boolean;

  onViewOrder?: () => void;
  onContinueShopping?: () => void;
  onTryAgain?: () => void;
  onCheckAgain?: () => void;
}

function PaymentStatusActions({
  status,
  loading = false,
  onViewOrder,
  onContinueShopping,
  onTryAgain,
  onCheckAgain,
}: PaymentStatusActionsProps) {
  const currentStatus =
    status ?? "pending";

  /*
  ====================================
  PAID
  ====================================
  */

  if (currentStatus === "paid") {
    return (
      <div className="mt-6 space-y-3">
        {onViewOrder && (
          <button
            type="button"
            onClick={onViewOrder}
            className="
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
            "
          >
            View Order
            <FiArrowRight size={17} />
          </button>
        )}

        {onContinueShopping && (
          <button
            type="button"
            onClick={onContinueShopping}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              py-3
              font-medium
              text-slate-300
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <FiShoppingBag size={17} />
            Continue Shopping
          </button>
        )}
      </div>
    );
  }

  /*
  ====================================
  PENDING
  ====================================
  */

  if (currentStatus === "pending") {
    return (
      <div className="mt-6 space-y-3">
        {onCheckAgain && (
          <button
            type="button"
            onClick={onCheckAgain}
            disabled={loading}
            className="
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
            <FiRefreshCw
              size={17}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            {loading
              ? "Checking..."
              : "Check Payment Status"}
          </button>
        )}

        {onContinueShopping && (
          <button
            type="button"
            onClick={onContinueShopping}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              py-3
              font-medium
              text-slate-300
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <FiHome size={17} />
            Continue Shopping
          </button>
        )}
      </div>
    );
  }

  /*
  ====================================
  FAILED / CANCELLED / EXPIRED
  ====================================
  */

  return (
    <div className="mt-6 space-y-3">
      {onTryAgain && (
        <button
          type="button"
          onClick={onTryAgain}
          disabled={loading}
          className="
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
          <FiRefreshCw
            size={17}
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          {loading
            ? "Processing..."
            : "Try Payment Again"}
        </button>
      )}

      {onContinueShopping && (
        <button
          type="button"
          onClick={onContinueShopping}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            py-3
            font-medium
            text-slate-300
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          <FiShoppingBag size={17} />
          Continue Shopping
        </button>
      )}
    </div>
  );
}

export default PaymentStatusActions;