import CheckoutSection from "./common/CheckoutSection";

import SummaryRow from "./summary/SummaryRow";
import PlaceOrderButton from "./summary/PlaceOrderButton";

interface CheckoutSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;

  loading?: boolean;

  onPlaceOrder?: () => void;
}

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

function CheckoutSummary({
  subtotal,
  shipping,
  discount,
  tax,
  total,
  loading = false,
  onPlaceOrder,
}: CheckoutSummaryProps) {
  return (
    <CheckoutSection
      title="Order Summary"
      subtitle="Review your order before placing it."
    >
      <SummaryRow
        label="Subtotal"
        value={formatPrice(subtotal)}
      />

      <SummaryRow
        label="Shipping"
        value={formatPrice(shipping)}
      />

      <SummaryRow
        label="Discount"
        value={`-${formatPrice(discount)}`}
        negative
      />

      <SummaryRow
        label="Tax"
        value={formatPrice(tax)}
      />

      <div className="my-4 border-t border-white/10" />

      <SummaryRow
        label="Total"
        value={formatPrice(total)}
        highlight
      />

      <PlaceOrderButton
        loading={loading}
        onClick={onPlaceOrder}
      />
    </CheckoutSection>
  );
}

export default CheckoutSummary;