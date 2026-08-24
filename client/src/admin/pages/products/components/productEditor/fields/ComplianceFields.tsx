import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface ComplianceFieldsProps {
  form: Partial<AdminProduct>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

function ComplianceFields({
  form,
  onChange,
}: ComplianceFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Tax & Compliance
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Add tax and regulatory information for the product.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* HSN Code */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            HSN Code
          </label>

          <input
            type="text"
            name="hsnCode"
            value={form.hsnCode ?? ""}
            onChange={onChange}
            placeholder="Enter HSN code"
            className="product-input"
          />
        </div>
      </div>
    </section>
  );
}

export default ComplianceFields;