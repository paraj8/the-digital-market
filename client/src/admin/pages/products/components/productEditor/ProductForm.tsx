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
    files: File[],
    remainingExistingImages: Product["images"]
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
  /*
   * ProductForm is remounted by ProductFormModal
   * whenever the product or mode changes.
   */
  const [form, setForm] =
    useState<Partial<AdminProduct>>(() =>
      getInitialForm(product)
    );

  /*
   * New image files selected by the user.
   */
  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  /*
   * Existing images that the user has kept.
   *
   * In edit mode, this allows the parent component
   * to tell the backend which existing images remain.
   */
  const [
    remainingExistingImages,
    setRemainingExistingImages,
  ] = useState<Product["images"]>(
    product?.images ?? []
  );

  /*
   * =========================================
   * HANDLE FIELD CHANGE
   * =========================================
   */

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

    /*
     * Checkbox
     */
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

    /*
     * Number input
     */
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

    /*
     * Text / select / textarea
     */
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * =========================================
   * HANDLE IMAGE CHANGE
   * =========================================
   */

  const handleImagesChange = (
    files: File[],
    remainingImages: Product["images"]
  ) => {
    setSelectedFiles(files);
    setRemainingExistingImages(
      remainingImages
    );
  };

  /*
   * =========================================
   * HANDLE SUBMIT
   * =========================================
   */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSubmit(
      form,
      selectedFiles,
      remainingExistingImages
    );
  };

  /*
   * Existing Cloudinary images.
   *
   * ProductImageUpload displays and manages
   * these images.
   */
  const existingImages =
    product?.images ?? [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ===================================== */}
      {/* PRODUCT IMAGES */}
      {/* ===================================== */}

      <ProductImageUpload
        existingImages={existingImages}
        onChange={handleImagesChange}
      />

      {/* ===================================== */}
      {/* PRODUCT FIELDS */}
      {/* ===================================== */}

      <ProductFormFields
        form={form}
        onChange={handleChange}
        categories={categories}
      />

      {/* ===================================== */}
      {/* FORM ACTIONS */}
      {/* ===================================== */}

      <ProductFormActions
        onClose={onClose}
        isSubmitting={isSubmitting}
        mode={mode}
      />
    </form>
  );
}

export default ProductForm;