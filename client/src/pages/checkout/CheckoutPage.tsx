
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import CheckoutItems from "../../components/checkout/items/CheckoutItems";
import CheckoutAddress from "../../components/checkout/CheckoutAddress";
import CheckoutDelivery from "../../components/checkout/CheckoutDelivery";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

import { useCheckout } from "../../features/checkout/hooks/useCheckout";

function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    items,
    addresses,

    selectedAddressId,
    setSelectedAddressId,

    summary,
  } = useCheckout(state);

  const handleContinueToReview = () => {
    if (!selectedAddressId) {
      return;
    }

    navigate("/checkout/review", {
      state: {
        ...state,
        selectedAddressId,
      },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <CheckoutHeader
        itemCount={items.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        )}
      />

      <div
        className="
          mt-8
          grid
          gap-8
          lg:grid-cols-[2fr_1fr]
        "
      >
        {/* LEFT */}

        <div className="space-y-6">
          <CheckoutItems
            items={items}
          />

          <CheckoutAddress
            addresses={addresses}
            selectedAddressId={
              selectedAddressId
            }
            onSelect={
              setSelectedAddressId
            }
          />

          <CheckoutDelivery />
        </div>

        {/* RIGHT */}

        <div
          className="
            h-fit
            lg:sticky
            lg:top-24
          "
        >
          <CheckoutSummary
            subtotal={summary.subtotal}
            shipping={summary.shipping}
            discount={summary.discount}
            tax={summary.tax}
            total={summary.total}
            onPlaceOrder={
              handleContinueToReview
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

