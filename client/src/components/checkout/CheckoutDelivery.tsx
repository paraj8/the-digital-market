import CheckoutSection from "./common/CheckoutSection";

function CheckoutDelivery() {
  return (
    <CheckoutSection
      title="Delivery"
      subtitle="Shipping information"
    >
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">
            Courier
          </span>

          <span>Will be selected automatically</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Shipping
          </span>

          <span>Calculated at checkout</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Estimated Delivery
          </span>

          <span>2–5 Business Days</span>
        </div>
      </div>
    </CheckoutSection>
  );
}

export default CheckoutDelivery;