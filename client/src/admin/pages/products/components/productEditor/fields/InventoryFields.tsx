import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface InventoryFieldsProps {
  form: Partial<AdminProduct>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function InventoryFields({
  form,
  onChange,
}: InventoryFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Inventory
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Manage stock and inventory settings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stock */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            min="0"
            value={form.stock ?? ""}
            onChange={onChange}
            placeholder="0"
            className="product-input"
          />
        </div>

        {/* Low Stock Threshold */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Low Stock Threshold
          </label>

          <input
            type="number"
            name="lowStockThreshold"
            min="0"
            value={form.lowStockThreshold ?? ""}
            onChange={onChange}
            placeholder="5"
            className="product-input"
          />
        </div>
      </div>

      {/* Inventory Settings */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="trackInventory"
            checked={form.trackInventory ?? true}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Track inventory
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="allowBackorder"
            checked={form.allowBackorder ?? false}
            onChange={onChange}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm text-gray-300">
            Allow backorders
          </span>
        </label>
      </div>
    </section>
  );
}

export default InventoryFields;