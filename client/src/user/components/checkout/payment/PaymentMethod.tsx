import PaymentOption from "./PaymentOption";

import type { PaymentMethod as PaymentMethodType } from "../../../features/checkout/types/checkout";

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
        description="Pay securely using UPI, Cards, Net Banking, EMI or Wallets."
        value="Razorpay"
        selected={
          selected === "Razorpay"
        }
        onSelect={onChange}
      />

      <PaymentOption
        title="CashFree"
        description="Currently unavailable."
        value="CashFree"
        selected={false}
        onSelect={onChange}
        disabled

      />

    </div>
  );
}

export default PaymentMethod;