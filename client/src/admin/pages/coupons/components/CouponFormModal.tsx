import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";

import type { Coupon } from "../../../../shared/types/coupon";
import {
  buildDefaultCouponForm,
  buildCouponPayload,
  mapCouponToFormValues,
  validateCouponForm,
  type CouponFormMode,
  type CouponFormValues,
} from "../couponUtils";
import CouponProductSelector from "./CouponProductSelector";

interface CouponFormModalProps {
  isOpen: boolean;
  mode: CouponFormMode;
  coupon: Coupon | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: CouponFormValues) => Promise<void> | void;
}

function CouponFormModal({
  isOpen,
  mode,
  coupon,
  isSubmitting,
  onClose,
  onSubmit,
}: CouponFormModalProps) {
  const defaultValues = useMemo(() => {
    if (coupon) {
      return mapCouponToFormValues(coupon);
    }

    return buildDefaultCouponForm();
  }, [coupon]);

  const [form, setForm] = useState<CouponFormValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedProductDetails, setSelectedProductDetails] = useState(() =>
    (coupon?.products ?? []).filter(
      (product): product is Exclude<typeof product, string | null> =>
        Boolean(product) && typeof product !== "string"
    )
  );

  if (!isOpen) {
    return null;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    if (name === "scope") {
      const scope = value as CouponFormValues["scope"];
      setForm((current) => ({
        ...current,
        scope,
        products: scope === "all" ? [] : current.products,
      }));
      setErrors((current) => ({ ...current, products: "" }));
      return;
    }

    const nextValue =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : value;

    setForm((current) => ({
      ...current,
      [name]: type === "number" ? Number(value) : nextValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCouponForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit(buildCouponPayload(form));
  };

  return (
    <div key={`${mode}-${coupon?._id ?? "new"}`} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/60">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {mode === "create" ? "Add Coupon" : "Edit Coupon"}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {mode === "create" ? "Create a new discount coupon." : "Update coupon details."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-white/20 hover:text-white"
            disabled={isSubmitting}
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">Code</label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                disabled={mode === "edit"}
                placeholder="SUMMER2026"
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
              {errors.code && <p className="mt-1 text-xs text-red-400">{errors.code}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Summer sale discount for selected orders"
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Discount Type</label>
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                {form.discountType === "percentage" ? "Discount Value (%)" : "Discount Value (₹)"}
              </label>
              <input
                type="number"
                name="discountValue"
                min={0}
                step={0.01}
                value={form.discountValue}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              />
              {errors.discountValue && (
                <p className="mt-1 text-xs text-red-400">{errors.discountValue}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <fieldset>
                <legend className="mb-2 block text-sm text-gray-300">Applies To</legend>
                <div className="flex flex-wrap gap-4 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3 text-sm text-white">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="scope"
                      value="all"
                      checked={form.scope === "all"}
                      onChange={handleChange}
                      className="accent-violet-500"
                    />
                    All Products
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="scope"
                      value="products"
                      checked={form.scope === "products"}
                      onChange={handleChange}
                      className="accent-violet-500"
                    />
                    Selected Products
                  </label>
                </div>
              </fieldset>
            </div>

            {form.scope === "products" && (
              <div className="md:col-span-2">
                <CouponProductSelector
                  productIds={form.products}
                  selectedProducts={selectedProductDetails}
                  onProductsChange={(products) => {
                    setForm((current) => ({
                      ...current,
                      products: products.map((product) => product._id),
                    }));
                    setSelectedProductDetails((current) => {
                      const byId = new Map(current.map((product) => [product._id, product]));
                      products.forEach((product) => byId.set(product._id, product));
                      return Array.from(byId.values());
                    });
                    setErrors((current) => ({ ...current, products: "" }));
                  }}
                />
                {errors.products && (
                  <p className="mt-2 text-xs text-red-400">{errors.products}</p>
                )}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-300">Minimum Order Amount</label>
              <input
                type="number"
                name="minimumOrderAmount"
                min={0}
                step={1}
                value={form.minimumOrderAmount}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              />
              {errors.minimumOrderAmount && (
                <p className="mt-1 text-xs text-red-400">{errors.minimumOrderAmount}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Maximum Discount Amount</label>
              <input
                type="number"
                name="maximumDiscountAmount"
                min={0}
                step={1}
                value={form.maximumDiscountAmount}
                onChange={handleChange}
                disabled={form.discountType === "fixed"}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
              {errors.maximumDiscountAmount && (
                <p className="mt-1 text-xs text-red-400">{errors.maximumDiscountAmount}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Usage Limit</label>
              <input
                type="number"
                name="usageLimit"
                min={0}
                step={1}
                value={form.usageLimit}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              />
              {errors.usageLimit && (
                <p className="mt-1 text-xs text-red-400">{errors.usageLimit}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-xs text-red-400">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500"
              />
              {errors.endDate && (
                <p className="mt-1 text-xs text-red-400">{errors.endDate}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2.5 text-sm text-white">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 accent-violet-500"
                />
                Active coupon
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create Coupon"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CouponFormModal;
