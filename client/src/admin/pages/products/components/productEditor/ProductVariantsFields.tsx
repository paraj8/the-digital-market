import { useState } from "react";

import type {
  ProductVariant,
  ProductVariantAttribute,
} from "../../../../../shared/types/product";

interface ProductVariantsFieldsProps {
  enabled: boolean;
  attributes: ProductVariantAttribute[];
  variants: ProductVariant[];
  basePrice: number;
  baseSalePrice: number;
  baseCostPrice: number;
  onEnabledChange: (enabled: boolean) => void;
  onAttributesChange: (attributes: ProductVariantAttribute[]) => void;
  onVariantsChange: (variants: ProductVariant[]) => void;
}

const combinationKey = (
  attributes: Record<string, string>,
  names: string[]
) =>
  JSON.stringify(
    names.map((name) => [name, attributes[name] ?? ""])
  );

const valuesKey = (attributes: Record<string, string>) =>
  JSON.stringify(Object.values(attributes));

function ProductVariantsFields({
  enabled,
  attributes,
  variants,
  basePrice,
  baseSalePrice,
  baseCostPrice,
  onEnabledChange,
  onAttributesChange,
  onVariantsChange,
}: ProductVariantsFieldsProps) {
  /*
   * Keep values as editable text while typing.
   * Convert them into arrays only when generating variants
   * or when the input loses focus.
   */
  const [valueDrafts, setValueDrafts] = useState<string[]>(() =>
    attributes.map((attribute) => attribute.values.join(", "))
  );

  /*
   * Synchronize drafts when attributes are changed externally.
   */


  /*
   * =========================================
   * UPDATE VARIANT
   * =========================================
   */

  const updateVariant = (
    index: number,
    updates: Partial<ProductVariant>
  ) => {
    onVariantsChange(
      variants.map((variant, variantIndex) =>
        variantIndex === index
          ? { ...variant, ...updates }
          : variant
      )
    );
  };

  /*
   * =========================================
   * UPDATE ATTRIBUTE
   * =========================================
   */

  const updateAttribute = (
    index: number,
    updates: Partial<ProductVariantAttribute>
  ) => {
    onAttributesChange(
      attributes.map((attribute, attributeIndex) =>
        attributeIndex === index
          ? { ...attribute, ...updates }
          : attribute
      )
    );
  };

  /*
   * =========================================
   * ADD ATTRIBUTE
   * =========================================
   */

  const addAttribute = () => {
    onAttributesChange([
      ...attributes,
      { name: "", values: [] },
    ]);

    setValueDrafts((previous) => [...previous, ""]);
  };

  /*
   * =========================================
   * REMOVE ATTRIBUTE
   * =========================================
   */

  const removeAttribute = (index: number) => {
    onAttributesChange(
      attributes.filter(
        (_, attributeIndex) => attributeIndex !== index
      )
    );

    setValueDrafts((previous) =>
      previous.filter((_, draftIndex) => draftIndex !== index)
    );
  };

  /*
   * =========================================
   * PARSE ATTRIBUTE VALUES
   * =========================================
   */

  const parseAttributeValues = (index: number) =>
    [
      ...new Set(
        (valueDrafts[index] ?? "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      ),
    ];

  /*
   * =========================================
   * GENERATE VARIANTS
   * =========================================
   */

  const generateVariants = () => {
    const normalized = attributes.map((attribute, index) => ({
      name: attribute.name.trim(),
      values: parseAttributeValues(index),
    }));

    if (
      normalized.length === 0 ||
      normalized.some(
        (attribute) =>
          !attribute.name || attribute.values.length === 0
      )
    ) {
      return;
    }

    const normalizedNames = normalized.map((attribute) =>
      attribute.name.toLowerCase()
    );

    if (new Set(normalizedNames).size !== normalizedNames.length) {
      return;
    }

    const names = normalized.map((attribute) => attribute.name);

    const previous = new Map(
      variants.map((variant) => [
        combinationKey(variant.attributes, names),
        variant,
      ])
    );

    const previousByValues = new Map(
      variants.map((variant) => [
        valuesKey(variant.attributes),
        variant,
      ])
    );

    const combinations: Record<string, string>[] = [{}];

    for (const attribute of normalized) {
      const next: Record<string, string>[] = [];

      for (const combination of combinations) {
        for (const value of attribute.values) {
          next.push({
            ...combination,
            [attribute.name]: value,
          });
        }
      }

      combinations.splice(
        0,
        combinations.length,
        ...next
      );
    }

    const unmatchedVariants = variants.filter(
      (variant) =>
        !combinations.some(
          (combination) =>
            combinationKey(combination, names) ===
              combinationKey(variant.attributes, names) ||
            valuesKey(combination) ===
              valuesKey(variant.attributes)
        )
    );

    if (
      unmatchedVariants.length > 0 &&
      !window.confirm(
        "Some current variants do not match the new combinations. Their SKU, pricing, and stock values will be removed. Continue?"
      )
    ) {
      return;
    }

    onAttributesChange(
      normalized.map((attribute) => ({
        name: attribute.name,
        values: attribute.values,
      }))
    );

    setValueDrafts(
      normalized.map((attribute) => attribute.values.join(", "))
    );

    onVariantsChange(
      combinations.map((combination) => {
        const existing =
          previous.get(
            combinationKey(combination, names)
          ) ??
          previousByValues.get(
            valuesKey(combination)
          );

        return (
          existing ?? {
            attributes: combination,
            sku: "",
            costPrice: baseCostPrice,
            price: basePrice,
            salePrice: baseSalePrice,
            stock: 0,
            isActive: true,
          }
        );
      })
    );
  };

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <section className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Product Variants
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            SKU, pricing, and stock are per variant. GST,
            shipping, inventory tracking, and backorder settings
            remain shared; product prices are retained as catalog
            defaults.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) =>
              onEnabledChange(event.target.checked)
            }
            className="h-4 w-4 accent-violet-600"
          />
          Enable variants
        </label>
      </div>

      {enabled && (
        <>
          {/* ATTRIBUTE CONFIGURATION */}

          <div className="space-y-3">
            {attributes.map((attribute, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-lg border border-white/10 p-3 sm:grid-cols-[1fr_2fr_auto]"
              >
                <label className="text-xs text-gray-400">
                  Attribute name

                  <input
                    type="text"
                    value={attribute.name}
                    onChange={(event) =>
                      updateAttribute(index, {
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Pack Size, Colour, Storage"
                    maxLength={50}
                    autoComplete="off"
                    className="product-input mt-1"
                  />
                </label>

                <label className="text-xs text-gray-400">
                  Values (comma separated)

                  <input
                    type="text"
                    value={valueDrafts[index] ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;

                      setValueDrafts((previous) =>
                        previous.map((item, draftIndex) =>
                          draftIndex === index
                            ? value
                            : item
                        )
                      );
                    }}
                    onBlur={() => {
                      updateAttribute(index, {
                        values: parseAttributeValues(index),
                      });
                    }}
                    placeholder="e.g. Pack of 20, Pack of 50"
                    className="product-input mt-1"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="self-end rounded-lg border border-white/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ATTRIBUTE ACTIONS */}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={addAttribute}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
            >
              Add attribute
            </button>

            <button
              type="button"
              onClick={generateVariants}
              className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500"
            >
              Generate / update combinations
            </button>
          </div>

          {/* GENERATED VARIANTS */}

          {variants.map((variant, index) => (
            <div
              key={
                variant._id ??
                combinationKey(
                  variant.attributes,
                  Object.keys(variant.attributes)
                )
              }
              className="space-y-3 rounded-xl border border-white/10 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-medium text-white">
                  {Object.entries(variant.attributes)
                    .map(
                      ([name, value]) =>
                        `${name}: ${value}`
                    )
                    .join(" / ") ||
                    `Variant ${index + 1}`}
                </h4>

                <button
                  type="button"
                  onClick={() =>
                    onVariantsChange(
                      variants.filter(
                        (_, variantIndex) =>
                          variantIndex !== index
                      )
                    )
                  }
                  className="text-sm text-red-300 hover:text-red-200"
                >
                  Remove variant
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {(
                  [
                    ["sku", "SKU"],
                    ["costPrice", "Cost price"],
                    ["price", "Regular price"],
                    ["salePrice", "Sale price"],
                    ["stock", "Stock"],
                  ] as const
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="text-xs text-gray-400"
                  >
                    {label}

                    <input
                      type={
                        key === "sku"
                          ? "text"
                          : "number"
                      }
                      min={
                        key === "sku"
                          ? undefined
                          : "0"
                      }
                      step={
                        key === "sku"
                          ? undefined
                          : key === "stock"
                            ? "1"
                            : "0.01"
                      }
                      value={variant[key]}
                      onChange={(event) =>
                        updateVariant(index, {
                          [key]:
                            key === "sku"
                              ? event.target.value.toUpperCase()
                              : Number(event.target.value),
                        })
                      }
                      className="product-input mt-1"
                    />
                  </label>
                ))}

                <label className="flex items-center gap-2 self-end pb-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={variant.isActive}
                    onChange={(event) =>
                      updateVariant(index, {
                        isActive: event.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-violet-600"
                  />
                  Active
                </label>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}

export default ProductVariantsFields;