import type {
  Product,
  ProductVariant,
} from "../../../../../shared/types/product";

interface ProductVariantSelectorProps {
  product: Product;
  selectedAttributes: Record<string, string>;
  selectedVariant: ProductVariant | null;
  onAttributeChange: (
    name: string,
    value: string
  ) => void;
}

function ProductVariantSelector({
  product,
  selectedAttributes,
  selectedVariant,
  onAttributeChange,
}: ProductVariantSelectorProps) {
  const activeVariants = (product.variants ?? []).filter(
    (variant) => variant.isActive
  );
  const attributes = product.variantAttributes?.length
    ? product.variantAttributes
    : Object.keys(activeVariants[0]?.attributes ?? {}).map(
        (name) => ({
          name,
          values: [
            ...new Set(
              activeVariants
                .map((variant) => variant.attributes[name])
                .filter(Boolean)
            ),
          ],
        })
      );

  if (!product.hasVariants || attributes.length === 0) {
    return null;
  }

  const isAvailable = (variant: ProductVariant) =>
    !product.trackInventory ||
    product.allowBackorder ||
    variant.stock > 0;

  return (
    <div className="mt-6 space-y-4">
      {attributes.map((attribute) => (
        <fieldset key={attribute.name}>
          <legend className="mb-2 text-sm font-medium text-slate-300">
            {attribute.name}
          </legend>
          <div className="flex flex-wrap gap-2">
            {attribute.values.map((value) => {
              const isSelected =
                selectedAttributes[attribute.name] === value;
              const hasAvailableVariant = activeVariants.some(
                (variant) =>
                  variant.attributes[attribute.name] === value &&
                  isAvailable(variant) &&
                  Object.entries(selectedAttributes).every(
                    ([name, selectedValue]) =>
                      name === attribute.name ||
                      variant.attributes[name] === selectedValue
                  )
              );

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={!hasAvailableVariant}
                  onClick={() =>
                    onAttributeChange(attribute.name, value)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    isSelected
                      ? "border-violet-500 bg-violet-500/15 text-white"
                      : "border-white/10 bg-[#121826] text-slate-300 hover:border-violet-500/50"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
      <p className="text-sm text-slate-400" aria-live="polite">
        {selectedVariant
          ? `SKU: ${selectedVariant.sku}`
          : activeVariants.length
            ? "Select an option for each attribute."
            : "No active variants are currently available."}
      </p>
    </div>
  );
}

export default ProductVariantSelector;
