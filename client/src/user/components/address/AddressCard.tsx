import {
  FiEdit2,
  FiMapPin,
  FiStar,
  FiTrash2,
} from "react-icons/fi";

import type { Address } from "../../features/addresses/types/address";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
  isSettingDefault?: boolean;
}

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isSettingDefault = false,
}: AddressCardProps) {
  return (
    <div
      className="
        relative
        rounded-2xl
        border
        border-white/10
        bg-slate-900/60
        p-5
        shadow-lg
        transition
        hover:border-white/20
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-violet-500/10
              text-violet-400
            "
          >
            <FiMapPin size={18} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold capitalize text-white">
                {address.addressType}
              </h3>

              {address.isDefault && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-violet-500/10
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-violet-400
                  "
                >
                  <FiStar size={11} />
                  Default
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESS */}

      <div className="mt-5 space-y-1.5 text-sm text-gray-400">
        <p className="font-medium text-white">
          {address.fullName}
        </p>

        <p>{address.phone}</p>

        <p>{address.addressLine1}</p>

        {address.addressLine2 && (
          <p>{address.addressLine2}</p>
        )}

        {address.landmark && (
          <p>
            Landmark: {address.landmark}
          </p>
        )}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.country} - {address.postalCode}
        </p>
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          items-center
          gap-2
          border-t
          border-white/10
          pt-4
        "
      >
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/10
            px-3
            py-2
            text-xs
            font-medium
            text-gray-300
            transition
            hover:bg-white/5
            hover:text-white
          "
        >
          <FiEdit2 size={14} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(address)}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            border
            border-red-500/10
            px-3
            py-2
            text-xs
            font-medium
            text-red-400
            transition
            hover:bg-red-500/10
          "
        >
          <FiTrash2 size={14} />
          Delete
        </button>

        {!address.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(address)}
            disabled={isSettingDefault}
            className="
              ml-auto
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-violet-600
              px-3
              py-2
              text-xs
              font-medium
              text-white
              transition
              hover:bg-violet-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <FiStar size={14} />

            {isSettingDefault
              ? "Updating..."
              : "Set Default"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AddressCard;