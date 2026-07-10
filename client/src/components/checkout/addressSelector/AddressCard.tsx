import type { CheckoutAddress } from "../../../types/checkout.ts";

interface AddressCardProps {
  address: CheckoutAddress;

  selected: boolean;

  onSelect: (id: string) => void;
}

function AddressCard({
  address,
  selected,
  onSelect,
}: AddressCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(address._id)}
      className={`
        w-full
        rounded-2xl
        border
        p-4
        text-left
        transition

        ${
          selected
            ? "border-violet-500 bg-violet-500/10"
            : "border-white/10 bg-[#121826] hover:border-violet-400"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">
            {address.fullName}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {address.phone}
          </p>
        </div>

        {address.isDefault && (
          <span
            className="
              rounded-full
              bg-violet-600/20
              px-3
              py-1
              text-xs
              text-violet-300
            "
          >
            Default
          </span>
        )}
      </div>

      <div
        className="
          mt-4
          text-sm
          leading-6
          text-slate-300
        "
      >
        <p>{address.addressLine1}</p>

        {address.addressLine2 && (
          <p>{address.addressLine2}</p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.postalCode}, {address.country}
        </p>
      </div>
    </button>
  );
}

export default AddressCard;