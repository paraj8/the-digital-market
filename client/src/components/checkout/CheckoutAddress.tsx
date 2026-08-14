import CheckoutSection from "./common/CheckoutSection";

import AddressList from "./addressSelector/AddressList";

import type { CheckoutAddress as CheckoutAddressType } from "../../features/checkout/types/checkout";

interface CheckoutAddressProps {
  addresses: CheckoutAddressType[];

  selectedAddressId?: string;

  onSelect: (id: string) => void;
}

function CheckoutAddress({
  addresses,
  selectedAddressId,
  onSelect,
}: CheckoutAddressProps) {
  return (
    <CheckoutSection
      title="Delivery Address"
      subtitle="Choose where you want your order delivered."
    >
      <AddressList
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelect={onSelect}
      />
    </CheckoutSection>
  );
}

export default CheckoutAddress;