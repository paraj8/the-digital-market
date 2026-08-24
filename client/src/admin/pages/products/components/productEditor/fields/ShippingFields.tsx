import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface ShippingFieldsProps {
  form: Partial<AdminProduct>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function ShippingFields({
  form,
  onChange,
}: ShippingFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Shipping
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Configure product shipping information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Weight */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Weight
          </label>

          <input
            type="number"
            name="weight"
            min="0"
            value={form.weight ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Length */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Length
          </label>

          <input
            type="number"
            name="length"
            min="0"
            value={form.length ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Width */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Width
          </label>

          <input
            type="number"
            name="width"
            min="0"
            value={form.width ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Height */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Height
          </label>

          <input
            type="number"
            name="height"
            min="0"
            value={form.height ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Shipping Class */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Shipping Class
          </label>

          <select
            name="shippingClass"
            value={form.shippingClass ?? "light"}
            onChange={onChange}
            className="product-input"
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
      </div>

      {/* Shipping Required */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="shippingRequired"
          checked={form.shippingRequired ?? true}
          onChange={onChange}
          className="h-4 w-4 accent-violet-600"
        />

        <span className="text-sm text-gray-300">
          This product requires shipping
        </span>
      </label>
    </section>
  );
}

export default ShippingFields;