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
        title="CashFree"
        description="Pay securely using UPI, Cards, Net Banking or Wallets."
        value="CashFree"
        selected={
          selected === "CashFree"
        }
        onSelect={onChange}
      />

    </div>
  );
}

export default PaymentMethod;