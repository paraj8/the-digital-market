import PaymentOption from "./PaymentOption";

import type { PaymentMethod as PaymentMethodType } from "../../../types/checkout";

interface PaymentMethodProps {
  selected: PaymentMethodType;

  onChange: (
    method: PaymentMethodType
  ) => void;
}

function PaymentMethod({
  selected,
  onChange,
}: PaymentMethodProps) {
  return (
    <div className="space-y-4">
      <PaymentOption
        title="Razorpay"
        description="Pay securely using UPI, Cards, Net Banking or Wallets."
        value="razorpay"
        selected={
          selected === "razorpay"
        }
        onSelect={onChange}
      />

      <PaymentOption
        title="Cash on Delivery"
        description="Pay when your order is delivered."
        value="cod"
        selected={
          selected === "cod"
        }
        onSelect={onChange}
      />
    </div>
  );
}

export default PaymentMethod;