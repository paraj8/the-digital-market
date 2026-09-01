import AddressCard from "./AddressCard";

import type { CheckoutAddress } from "../../../features/checkout/types/checkout";

interface AddressListProps {
  addresses: CheckoutAddress[];
  
  selectedAddressId?: string | null;

  onSelect: (id: string) => void;
}

function AddressList({
  addresses,
  selectedAddressId,
  onSelect,
}: AddressListProps) {


  if (addresses.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-[#121826]
          p-8
          text-center
        "
      >
        <p className="font-medium text-slate-300">
          No saved addresses found.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Add a delivery address to continue.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          selected={
            selectedAddressId ===
            address._id
          }
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default AddressList;

