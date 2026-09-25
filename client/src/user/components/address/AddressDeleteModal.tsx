import type { Address } from "../../features/addresses/types/address";

interface AddressDeleteModalProps {
  isOpen: boolean;
  address?: Address | null;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function AddressDeleteModal({
  isOpen,
  address,
  isDeleting = false,
  onClose,
  onConfirm,
}: AddressDeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Delete Address
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              aria-label="Close"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                text-gray-400
                transition
                hover:bg-white/5
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              ×
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="px-6 py-6">
          <div
            className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/5
              p-4
            "
          >
            <p className="text-sm leading-6 text-gray-300">
              Are you sure you want to delete this
              address?
            </p>

            {address && (
              <div className="mt-4 space-y-1">
                <p className="text-sm font-semibold text-white">
                  {address.fullName}
                </p>

                <p className="text-xs text-gray-400">
                  {address.addressLine1}
                </p>

                {address.addressLine2 && (
                  <p className="text-xs text-gray-400">
                    {address.addressLine2}
                  </p>
                )}

                <p className="text-xs text-gray-400">
                  {address.city}, {address.state}{" "}
                  {address.postalCode}
                </p>

                <p className="text-xs text-gray-400">
                  {address.phone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-white/10
            px-6
            py-4
          "
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="
              rounded-xl
              border
              border-white/10
              px-5
              py-2.5
              text-sm
              font-medium
              text-gray-300
              transition
              hover:bg-white/5
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isDeleting
              ? "Deleting..."
              : "Delete Address"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressDeleteModal;