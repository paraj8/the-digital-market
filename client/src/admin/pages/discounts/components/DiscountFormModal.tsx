import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";

import type {
  Discount,
  DiscountCategoryReference,
  DiscountProductReference,
} from "../../../../shared/types/discount";
import {
  buildDiscountPayload,
  createDefaultDiscountForm,
  mapDiscountToForm,
  validateDiscountForm,
  type DiscountFormValues,
} from "../discountUtils";
import DiscountCategorySelector from "./DiscountCategorySelector";
import DiscountProductSelector from "./DiscountProductSelector";

interface DiscountFormModalProps {
  discount: Discount | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: ReturnType<typeof buildDiscountPayload>) => Promise<void>;
}

function DiscountFormModal({ discount, isSubmitting, onClose, onSubmit }: DiscountFormModalProps) {
  const initialValues = useMemo(
    () => discount ? mapDiscountToForm(discount) : createDefaultDiscountForm(),
    [discount]
  );
  const [form, setForm] = useState<DiscountFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedProducts, setSelectedProducts] = useState(() =>
    (discount?.products ?? []).filter(
      (product): product is DiscountProductReference =>
        Boolean(product) && typeof product !== "string"
    )
  );
  const [selectedCategories, setSelectedCategories] = useState(() =>
    (discount?.categories ?? []).filter(
      (category): category is DiscountCategoryReference =>
        Boolean(category) && typeof category !== "string"
    )
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateDiscountForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    await onSubmit(buildDiscountPayload(form));
  };

  const update = (name: keyof DiscountFormValues, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const changeScope = (scope: DiscountFormValues["scope"]) => {
    setForm((current) => ({
      ...current,
      scope,
      products: scope === "products" ? current.products : [],
      categories: scope === "categories" ? current.categories : [],
    }));
    setErrors((current) => ({ ...current, products: "", categories: "" }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white">{discount ? "Edit Discount" : "Create Discount"}</h2>
            <p className="mt-1 text-sm text-gray-400">Configure an automatic promotional offer.</p>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Close"
            className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white disabled:opacity-50">
            <FiX size={18} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="max-h-[calc(92vh-80px)] space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="discount-name" className="mb-2 block text-sm text-gray-300">Name</label>
              <input id="discount-name" value={form.name} onChange={(event) => update("name", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="discount-description" className="mb-2 block text-sm text-gray-300">Description</label>
              <textarea id="discount-description" rows={2} value={form.description}
                onChange={(event) => update("description", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
            </div>

            <div>
              <label htmlFor="discount-type" className="mb-2 block text-sm text-gray-300">Discount Type</label>
              <select id="discount-type" value={form.discountType}
                onChange={(event) => update("discountType", event.target.value as DiscountFormValues["discountType"])}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label htmlFor="discount-value" className="mb-2 block text-sm text-gray-300">
                Discount Value {form.discountType === "percentage" ? "(%)" : "(₹)"}
              </label>
              <input id="discount-value" type="number" min="0" step="0.01" value={form.discountValue}
                onChange={(event) => update("discountValue", Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
              {errors.discountValue && <p className="mt-1 text-xs text-red-400">{errors.discountValue}</p>}
            </div>

            <div>
              <label htmlFor="discount-minimum" className="mb-2 block text-sm text-gray-300">Minimum Order Amount</label>
              <input id="discount-minimum" type="number" min="0" step="1" value={form.minimumOrderAmount}
                onChange={(event) => update("minimumOrderAmount", Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
              {errors.minimumOrderAmount && <p className="mt-1 text-xs text-red-400">{errors.minimumOrderAmount}</p>}
            </div>

            <div>
              <label htmlFor="discount-maximum" className="mb-2 block text-sm text-gray-300">Maximum Discount Amount</label>
              <input id="discount-maximum" type="number" min="0" step="1" value={form.maximumDiscountAmount}
                disabled={form.discountType === "fixed"}
                onChange={(event) => update("maximumDiscountAmount", Number(event.target.value))}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500 disabled:opacity-50" />
              {errors.maximumDiscountAmount && <p className="mt-1 text-xs text-red-400">{errors.maximumDiscountAmount}</p>}
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm text-gray-300">Applies To</legend>
            <div className="flex flex-wrap gap-4 rounded-xl border border-white/10 bg-slate-800/60 p-3 text-sm text-white">
              {([
                ["all", "All Products"],
                ["products", "Selected Products"],
                ["categories", "Selected Categories"],
              ] as const).map(([scope, label]) => (
                <label key={scope} className="flex items-center gap-2">
                  <input type="radio" name="discount-scope" checked={form.scope === scope}
                    onChange={() => changeScope(scope)} className="accent-violet-500" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          {form.scope === "products" && (
            <div>
              <DiscountProductSelector
                productIds={form.products}
                selectedProducts={selectedProducts}
                onChange={(products) => {
                  setSelectedProducts(products);
                  setForm((current) => ({ ...current, products: products.map((product) => product._id) }));
                  setErrors((current) => ({ ...current, products: "" }));
                }}
              />
              {errors.products && <p className="mt-1 text-xs text-red-400">{errors.products}</p>}
            </div>
          )}

          {form.scope === "categories" && (
            <div>
              <DiscountCategorySelector
                categoryIds={form.categories}
                selectedCategories={selectedCategories}
                onChange={(categories) => {
                  setSelectedCategories(categories);
                  setForm((current) => ({ ...current, categories: categories.map((category) => category._id) }));
                  setErrors((current) => ({ ...current, categories: "" }));
                }}
              />
              {errors.categories && <p className="mt-1 text-xs text-red-400">{errors.categories}</p>}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="discount-start-date" className="mb-2 block text-sm text-gray-300">Start Date</label>
              <input id="discount-start-date" type="date" value={form.startDate}
                onChange={(event) => update("startDate", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
              {errors.startDate && <p className="mt-1 text-xs text-red-400">{errors.startDate}</p>}
            </div>
            <div>
              <label htmlFor="discount-end-date" className="mb-2 block text-sm text-gray-300">End Date</label>
              <input id="discount-end-date" type="date" value={form.endDate}
                onChange={(event) => update("endDate", event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500" />
              {errors.endDate && <p className="mt-1 text-xs text-red-400">{errors.endDate}</p>}
            </div>
            <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white md:col-span-2">
              <input type="checkbox" checked={form.isActive} onChange={(event) => update("isActive", event.target.checked)}
                className="h-4 w-4 accent-violet-500" />
              Active
            </label>
          </div>

          <footer className="flex justify-end gap-3 border-t border-white/10 pt-4">
            <button type="button" onClick={onClose} disabled={isSubmitting}
              className="rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-gray-300">Cancel</button>
            <button type="submit" disabled={isSubmitting}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {isSubmitting ? "Saving..." : discount ? "Save Changes" : "Create Discount"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default DiscountFormModal;
