import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface PricingFieldsProps {
  form: Partial<AdminProduct>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function PricingFields({
  form,
  onChange,
}: PricingFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Pricing
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Configure product pricing and GST.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cost Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Cost Price
          </label>

          <input
            type="number"
            name="costPrice"
            min="0"
            value={form.costPrice ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Price
          </label>

          <input
            type="number"
            name="price"
            min="0"
            value={form.price ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Sale Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Sale Price
          </label>

          <input
            type="number"
            name="salePrice"
            min="0"
            value={form.salePrice ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* GST */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            GST Rate (%)
          </label>

          <input
            type="number"
            name="gstRate"
            min="0"
            max="100"
            value={form.gstRate ?? ""}
            onChange={onChange}
            placeholder="18"
            className="product-input"
          />
        </div>
      </div>

      {/* GST Included */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="gstIncluded"
          checked={form.gstIncluded ?? true}
          onChange={onChange}
          className="h-4 w-4 accent-violet-600"
        />

        <span className="text-sm text-gray-300">
          GST is included in the product price
        </span>
      </label>
    </section>
  );
}

export default PricingFields;