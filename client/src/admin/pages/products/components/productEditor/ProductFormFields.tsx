import type { ChangeEvent } from "react";
import type { AdminProduct } from "./types";

import BasicInfoFields from "./fields/BasicInfoFields";
import PricingFields from "./fields/PricingFields";
import InventoryFields from "./fields/InventoryFields";
import ShippingFields from "./fields/ShippingFields";
import ProductSettingsFields from "./fields/ProductSettingsFields";
import ComplianceFields from "./fields/ComplianceFields";

interface ProductFormFieldsProps {
  form: Partial<AdminProduct>;

  onChange: (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => void;

  categories?: {
    _id: string;
    name: string;
  }[];
}

function ProductFormFields({
  form,
  onChange,
  categories = [],
}: ProductFormFieldsProps) {
  return (
    <div className="space-y-6">
      <BasicInfoFields
        form={form}
        onChange={onChange}
        categories={categories}
      />

      <PricingFields
        form={form}
        onChange={onChange}
      />

      <InventoryFields
        form={form}
        onChange={onChange}
      />

      <ShippingFields
        form={form}
        onChange={onChange}
      />

      <ProductSettingsFields
        form={form}
        onChange={onChange}
      />

      <ComplianceFields
        form={form}
        onChange={onChange}
      />
    </div>
  );
}

export default ProductFormFields;