import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface ProductSettingsFieldsProps {
  form: Partial<AdminProduct>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function ProductSettingsFields({
  form,
  onChange,
}: ProductSettingsFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Product Settings
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* Active */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive ?? true}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Active product
          </span>
        </label>

        {/* Featured */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured ?? false}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Featured product
          </span>
        </label>

        {/* Returnable */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="returnable"
            checked={form.returnable ?? false}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Returnable
          </span>
        </label>

        {/* COD */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="codAvailable"
            checked={form.codAvailable ?? true}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Cash on Delivery available
          </span>
        </label>

        {/* Digital */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="isDigital"
            checked={form.isDigital ?? false}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Digital product
          </span>
        </label>
      </div>

      {/* Download URL */}
      {form.isDigital && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Download URL
          </label>

          <input
            type="url"
            name="downloadUrl"
            value={form.downloadUrl ?? ""}
            onChange={onChange}
            placeholder="https://..."
            className="product-input"
          />
        </div>
      )}
    </section>
  );
}

export default ProductSettingsFields;