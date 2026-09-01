
import {
  FiArrowLeft,
} from "react-icons/fi";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import CheckoutReview from "../../components/checkout/review/CheckoutReview";

import { useCheckout } from "../../features/checkout/hooks/useCheckout";
import { useCashfree } from "../../features/cashfree/hooks/useCashfree";

function CheckoutReviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  /*
  ====================================
  CHECKOUT
  ====================================
  */

  const {
    items,
    selectedAddress,
    summary,
    placeOrder,
    isLoading,
    creatingOrder,
    orderError,
  } = useCheckout(state);

  /*
  ====================================
  CASHFREE
  ====================================
  */

  const {
    createPaymentOrder,
    openCheckout,
    creatingOrder:
      creatingCashfreeOrder,
    createError:
      cashfreeError,
  } = useCashfree();

  /*
  ====================================
  BACK TO CHECKOUT
  ====================================
  */

  const handleBack = () => {
    if (isPaymentLoading) {
      return;
    }

    navigate("/checkout", {
      state,
    });
  };

  /*
  ====================================
  PAYMENT LOADING
  ====================================
  */

  const isPaymentLoading =
    creatingOrder ||
    creatingCashfreeOrder;

  /*
  ====================================
  CONFIRM & PAY
  ====================================
  */

  const handleConfirm = async () => {
    /*
    Prevent duplicate clicks
    */

    if (isPaymentLoading) {
      return;
    }

    try {
      /*
      --------------------------------
      STEP 1
      Create pending application order
      --------------------------------
      */

      const order =
        await placeOrder();

      if (!order) {
        return;
      }

      /*
      --------------------------------
      STEP 2
      Get logged-in customer
      --------------------------------
      */

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        throw new Error(
          "User information not found. Please login again."
        );
      }

      let user: {
        _id?: string;
        id?: string;
        fullName?: string;
        name?: string;
        email?: string;
        phone?: string;
      };

      try {
        user = JSON.parse(
          storedUser
        );
      } catch {
        throw new Error(
          "Invalid user information. Please login again."
        );
      }

      /*
      --------------------------------
      Validate customer
      --------------------------------
      */

      const customerId =
        user._id || user.id;

      if (!customerId) {
        throw new Error(
          "Customer information is incomplete. Please login again."
        );
      }

      if (!user.email) {
        throw new Error(
          "Customer email is missing. Please login again."
        );
      }

      /*
      --------------------------------
      STEP 3
      Create Cashfree payment order
      --------------------------------
      */

      const cashfreeResponse =
        await createPaymentOrder({
          orderId:
            order._id,

          amount:
            order.totalAmount,

          customer: {
            id: customerId,

            name:
              user.fullName ||
              user.name ||
              "Customer",

            email:
              user.email,

            phone:
              user.phone ||
              selectedAddress?.phone ||
              "",
          },

          /*
          Cashfree redirects the
          customer to the payment
          status page after checkout.
          */

          returnUrl:
            `${window.location.origin}/checkout/payment-status?orderId=${order._id}`,
        });

      /*
      --------------------------------
      STEP 4
      Get payment session
      --------------------------------
      */

      const paymentSessionId =
        cashfreeResponse.data
          ?.payment_session_id;

      if (!paymentSessionId) {
        throw new Error(
          "Cashfree payment session could not be created."
        );
      }

      /*
      --------------------------------
      STEP 5
      Open Cashfree checkout
      --------------------------------
      */

      await openCheckout(
        paymentSessionId
      );
    } catch (error) {
      console.error(
        "Payment initialization failed:",
        error
      );
    }
  };

  /*
  ====================================
  LOADING
  ====================================
  */

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        Loading review...
      </div>
    );
  }

  /*
  ====================================
  EMPTY CHECKOUT
  ====================================
  */

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-10
            text-center
          "
        >
          <h2 className="text-xl font-semibold">
            Unable to review order
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Your checkout items could not
            be loaded.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="
              mt-6
              rounded-xl
              bg-violet-600
              px-5
              py-3
              font-medium
              transition
              hover:bg-violet-500
            "
          >
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  /*
  ====================================
  ERROR
  ====================================
  */

  const displayError =
    orderError ||
    cashfreeError;

  /*
  ====================================
  PAGE
  ====================================
  */

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Back */}

      <button
        type="button"
        onClick={handleBack}
        disabled={isPaymentLoading}
        className="
          mb-6
          flex
          items-center
          gap-2
          text-sm
          text-slate-400
          transition
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <FiArrowLeft size={16} />

        Back to Checkout
      </button>

      {/* Header */}

      <CheckoutHeader
        itemCount={items.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        )}
      />

      {/* Error */}

      {displayError && (
        <div
          className="
            mt-6
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            px-4
            py-3
            text-sm
            text-red-400
          "
        >
          {displayError instanceof Error
            ? displayError.message
            : "Unable to initialize payment. Please try again."}
        </div>
      )}

      {/* Review */}

      <div className="mt-8">
        <CheckoutReview
          items={items}
          address={selectedAddress}
          summary={summary}
          onConfirm={handleConfirm}
          confirming={isPaymentLoading}
        />
      </div>
    </div>
  );
}

export default CheckoutReviewPage;
