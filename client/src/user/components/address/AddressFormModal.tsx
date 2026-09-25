import type { Address } from "../../features/addresses/types/address";
import AddressForm from "./AddressForm";

type AddressFormData = Parameters<
  React.ComponentProps<typeof AddressForm>["onSubmit"]
>[0];

interface AddressFormModalProps {
  isOpen: boolean;
  address?: Address | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => void;
}

function AddressFormModal({
  isOpen,
  address,
  isSubmitting = false,
  onClose,
  onSubmit,
}: AddressFormModalProps) {
  if (!isOpen) {
    return null;
  }

  const isEditing = Boolean(address);

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
          flex
          max-h-[90vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-slate-950
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-6
            py-5
          "
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              {isEditing
                ? "Edit Address"
                : "Add New Address"}
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              {isEditing
                ? "Update your saved address."
                : "Add an address for faster checkout."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="
              flex
              h-9
              w-9
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

        {/* FORM */}

        <div className="overflow-y-auto px-6 py-6">
          <AddressForm
            key={address?._id ?? "new"}
            address={address}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default AddressFormModal;