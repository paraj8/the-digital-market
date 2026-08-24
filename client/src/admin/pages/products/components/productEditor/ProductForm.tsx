import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { Product } from "../../../../../features/products/types/product";
import type { AdminProduct } from "./types";

import ProductImageUpload from "./ProductImageUpload";
import ProductFormFields from "./ProductFormFields";
import ProductFormActions from "./ProductFormActions";

interface ProductFormProps {
  product?: Product | null;
  mode: "create" | "edit";
  isSubmitting?: boolean;

  categories?: {
    _id: string;
    name: string;
  }[];

  onSubmit: (
    data: Partial<AdminProduct>,
    files: File[]
  ) => void;

  onClose: () => void;
}

const defaultForm: Partial<AdminProduct> = {
  title: "",
  brand: "",
  shortDescription: "",
  description: "",

  costPrice: 0,
  price: 0,
  salePrice: 0,

  gstRate: 18,
  gstIncluded: true,

  stock: 0,
  lowStockThreshold: 5,
  trackInventory: true,
  allowBackorder: false,

  weight: 0,
  length: 0,
  width: 0,
  height: 0,

  shippingRequired: true,
  shippingClass: "light",

  isActive: true,
  isFeatured: false,
  returnable: false,
  codAvailable: true,

  isDigital: false,
  downloadUrl: "",

  hsnCode: "",

  tags: [],
};

const getInitialForm = (
  product?: Product | null
): Partial<AdminProduct> => {
  if (!product) {
    return { ...defaultForm };
  }

  return {
    ...defaultForm,
    ...product,
  };
};

function ProductForm({
  product,
  mode,
  isSubmitting = false,
  categories = [],
  onSubmit,
  onClose,
}: ProductFormProps) {
  const [form, setForm] =
    useState<Partial<AdminProduct>>(() =>
      getInitialForm(product)
    );

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const target = event.target;

    const {
      name,
      value,
      type,
    } = target;

    if (type === "checkbox") {
      const checked = (
        target as HTMLInputElement
      ).checked;

      setForm((previous) => ({
        ...previous,
        [name]: checked,
      }));

      return;
    }

    if (type === "number") {
      setForm((previous) => ({
        ...previous,
        [name]:
          value === ""
            ? 0
            : Number(value),
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImagesChange = (
    files: File[]
  ) => {
    setSelectedFiles(files);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSubmit(form, selectedFiles);
  };

  const existingImages =
    product?.images ?? [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <ProductImageUpload
        existingImages={existingImages}
        onChange={handleImagesChange}
      />

      <ProductFormFields
        form={form}
        onChange={handleChange}
        categories={categories}
      />

      <ProductFormActions
        onClose={onClose}
        isSubmitting={isSubmitting}
        mode={mode}
      />
    </form>
  );
}

export default ProductForm;