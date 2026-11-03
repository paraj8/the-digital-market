import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { Product } from "../../../../../shared/types/product";
import type { AdminProduct } from "./types";

import ProductImageUpload from "./ProductImageUpload";
import ProductFormFields from "./ProductFormFields";
import ProductFormActions from "./ProductFormActions";
import ProductVariantsFields from "./ProductVariantsFields";

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
  hasVariants: false,
  variantAttributes: [],
  variants: [],
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
    hasVariants:
      product.hasVariants ??
      Boolean(product.variants?.length),
    variantAttributes:
      product.variantAttributes ?? [],
    variants: product.variants ?? [],
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
  const [validationError, setValidationError] =
    useState("");

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
    setValidationError("");

    if (form.hasVariants) {
      const attributes = form.variantAttributes ?? [];
      const variants = form.variants ?? [];
      const attributeNames = attributes.map((attribute) =>
        attribute.name.trim().toLowerCase()
      );

      if (
        attributes.length === 0 ||
        attributeNames.some((name) => !name) ||
        new Set(attributeNames).size !== attributeNames.length ||
        attributes.some(
          (attribute) =>
            attribute.values.length === 0 ||
            new Set(
              attribute.values.map((value) =>
                value.trim().toLowerCase()
              )
            ).size !== attribute.values.length
        )
      ) {
        setValidationError(
          "Add unique attribute names and at least one unique value for each."
        );
        return;
      }

      if (!variants.some((variant) => variant.isActive)) {
        setValidationError("At least one variant must be active.");
        return;
      }

      const combinations = variants.map((variant) =>
        JSON.stringify(
          attributes.map(({ name }) => [
            name,
            variant.attributes[name] ?? "",
          ])
        )
      );
      if (
        variants.some(
          (variant) =>
            Object.keys(variant.attributes).length !== attributes.length ||
            attributes.some(
              ({ name, values }) =>
                !values.includes(variant.attributes[name])
            )
        ) ||
        new Set(combinations).size !== combinations.length
      ) {
        setValidationError(
          "Generate combinations again so every variant matches the current attributes."
        );
        return;
      }

      const variantSkus = variants
        .map((variant) => variant.sku.trim().toUpperCase())
        .filter(Boolean);

      if (new Set(variantSkus).size !== variantSkus.length) {
        setValidationError("Variant SKUs must be unique.");
        return;
      }

      const invalidVariant = variants.some(
        (variant) =>
          !Number.isFinite(variant.costPrice) ||
          variant.costPrice < 0 ||
          !Number.isFinite(variant.price) ||
          (variant.isActive && variant.price <= 0) ||
          !Number.isFinite(variant.salePrice) ||
          variant.salePrice < 0 ||
          (variant.salePrice > 0 &&
            variant.salePrice > variant.price) ||
          !Number.isInteger(variant.stock) ||
          variant.stock < 0
      );

      if (invalidVariant) {
        setValidationError(
          "Each variant needs valid pricing and a whole-number stock quantity. Sale price cannot exceed regular price."
        );
        return;
      }
    }

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

      <ProductVariantsFields
        enabled={Boolean(form.hasVariants)}
        attributes={form.variantAttributes ?? []}
        variants={form.variants ?? []}
        basePrice={form.price ?? 0}
        baseSalePrice={form.salePrice ?? 0}
        baseCostPrice={form.costPrice ?? 0}
        onEnabledChange={(hasVariants) =>
          setForm((previous) => ({
            ...previous,
            hasVariants,
          }))
        }
        onAttributesChange={(variantAttributes) =>
          setForm((previous) => ({
            ...previous,
            variantAttributes,
          }))
        }
        onVariantsChange={(variants) =>
          setForm((previous) => ({
            ...previous,
            variants,
          }))
        }
      />

      {validationError && (
        <p role="alert" className="text-sm text-red-400">
          {validationError}
        </p>
      )}

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