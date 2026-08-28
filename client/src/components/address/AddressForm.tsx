import { useState } from "react";
import type {
  Address,
  AddressType,
} from "../../features/addresses/types/address";

type AddressFormData = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  addressType: AddressType;
  isDefault: boolean;
};

interface AddressFormProps {
  address?: Address | null;
  isSubmitting?: boolean;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
}

const createInitialForm = (
  address?: Address | null
): AddressFormData => {
  if (address) {
    return {
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 ?? "",
      landmark: address.landmark ?? "",
      city: address.city,
      state: address.state,
      country: address.country || "India",
      postalCode: address.postalCode,
      addressType: address.addressType,
      isDefault: address.isDefault,
    };
  }

  return {
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    addressType: "home",
    isDefault: false,
  };
};

function AddressForm({
  address,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] = useState<AddressFormData>(
    () => createInitialForm(address)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* CONTACT */}

      <section>
        <h3 className="mb-4 text-sm font-semibold text-white">
          Contact Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <FormField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>
      </section>

      {/* ADDRESS */}

      <section>
        <h3 className="mb-4 text-sm font-semibold text-white">
          Address
        </h3>

        <div className="space-y-4">
          <FormField
            label="Address Line 1"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="House no., street, area"
            required
          />

          <FormField
            label="Address Line 2"
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            placeholder="Apartment, floor, etc. (optional)"
          />

          <FormField
            label="Landmark"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Nearby landmark (optional)"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />

            <FormField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />

            <FormField
              label="Postal Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              required
            />

            <FormField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>
        </div>
      </section>

      {/* ADDRESS TYPE */}

      <section>
        <h3 className="mb-4 text-sm font-semibold text-white">
          Address Type
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {(
            ["home", "office", "other"] as AddressType[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setForm((previous) => ({
                  ...previous,
                  addressType: type,
                }))
              }
              className={`
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-medium
                capitalize
                transition
                ${
                  form.addressType === type
                    ? "border-violet-500 bg-violet-500/10 text-violet-400"
                    : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* DEFAULT ADDRESS */}

      <label
        className="
          flex
          cursor-pointer
          items-center
          gap-3
          rounded-xl
          border
          border-white/10
          bg-white/[0.02]
          p-4
        "
      >
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) =>
            setForm((previous) => ({
              ...previous,
              isDefault: e.target.checked,
            }))
          }
          className="h-4 w-4 accent-violet-600"
        />

        <div>
          <p className="text-sm font-medium text-white">
            Set as default address
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Use this address automatically during
            checkout.
          </p>
        </div>
      </label>

      {/* ACTIONS */}

      <div
        className="
          flex
          justify-end
          gap-3
          border-t
          border-white/10
          pt-5
        "
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
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
          type="submit"
          disabled={isSubmitting}
          className="
            rounded-xl
            bg-violet-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Saving..."
            : address
              ? "Update Address"
              : "Save Address"}
        </button>
      </div>
    </form>
  );
}

/* =========================================
   FORM FIELD
========================================= */

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function FormField({
  label,
  name,
  value,
  placeholder,
  required = false,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium text-gray-400"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-slate-950
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition
          placeholder:text-gray-600
          focus:border-violet-500
          focus:ring-1
          focus:ring-violet-500
        "
      />
    </div>
  );
}

export default AddressForm;
