import AddressCard from "./AddressCard";

import type { Address } from "../../features/addresses/types/address";

interface AddressListProps {
  addresses: Address[];
  isLoading?: boolean;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
  settingDefaultId?: string | null;
}

function AddressList({
  addresses,
  isLoading = false,
  onEdit,
  onDelete,
  onSetDefault,
  settingDefaultId = null,
}: AddressListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="
              h-64
              animate-pulse
              rounded-2xl
              border
              border-white/10
              bg-slate-900/60
            "
          />
        ))}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          bg-slate-900/40
          px-6
          py-16
          text-center
        "
      >
        <p className="text-sm font-medium text-gray-300">
          No saved addresses
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Add an address to make checkout faster.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
          isSettingDefault={
            settingDefaultId === address._id
          }
        />
      ))}
    </div>
  );
}

export default AddressList;