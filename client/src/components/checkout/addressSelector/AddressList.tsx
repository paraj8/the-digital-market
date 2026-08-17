import AddressCard from "./AddressCard";

import type { CheckoutAddress } from "../../../features/checkout/types/checkout";

interface AddressListProps {
  addresses: CheckoutAddress[];

  selectedAddressId?: string;

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
          border border-dashed border-white/10
          bg-[#121826]
          p-6
          text-center
        "
      >
        <p className="text-slate-400">
          No saved addresses found.
        </p>

        <button
          className="
            mt-4
            rounded-xl
            bg-violet-600
            px-5
            py-2
            text-sm
            font-medium
            transition
            hover:bg-violet-500
          "
        >
          Add New Address
        </button>
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
            selectedAddressId === address._id
          }
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default AddressList;