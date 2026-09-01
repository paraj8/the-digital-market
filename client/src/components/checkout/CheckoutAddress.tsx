import { useNavigate } from "react-router-dom";

import CheckoutSection from "./common/CheckoutSection";
import AddressList from "./addressSelector/AddressList";

import type {
  CheckoutAddress as CheckoutAddressType,
} from "../../features/checkout/types/checkout";

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
  const navigate = useNavigate();

  return (
    <CheckoutSection
      title="Delivery Address"
      subtitle="Choose where you want your order delivered."
      action={
        <button
          type="button"
          onClick={() => navigate("/addresses")}
          className="
            rounded-lg
            border border-violet-500/40
            bg-violet-500/10
            px-3
            py-2
            text-sm
            font-medium
            text-violet-300
            transition
            hover:border-violet-500
            hover:bg-violet-500/20
            hover:text-violet-200
          "
        >
          + Add New Address
        </button>
      }
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