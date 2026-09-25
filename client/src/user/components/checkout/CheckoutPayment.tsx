import CheckoutSection from "./common/CheckoutSection";

import PaymentMethod from "./payment/PaymentMethod";

import type { PaymentMethod as PaymentMethodType } from "../../features/checkout/types/checkout";

interface CheckoutPaymentProps {
  paymentMethod: PaymentMethodType;

  onChange: (
    method: PaymentMethodType
  ) => void;
}

function CheckoutPayment({
  paymentMethod,
  onChange,
}: CheckoutPaymentProps) {
  return (
    <CheckoutSection
      title="Payment Method"
      subtitle="Choose how you want to pay for your order."
    >
      <PaymentMethod
        selected={paymentMethod}
        onChange={onChange}
      />
    </CheckoutSection>
  );
}

export default CheckoutPayment;