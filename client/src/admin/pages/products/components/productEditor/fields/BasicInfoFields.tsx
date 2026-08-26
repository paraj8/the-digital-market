import type { ChangeEvent } from "react";
import type { AdminProduct } from "../types";

interface BasicInfoFieldsProps {
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

function BasicInfoFields({
  form,
  onChange,
  categories = [],
}: BasicInfoFieldsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Basic Information
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Enter the basic details of your product.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Product Title */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Product Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title ?? ""}
            onChange={onChange}
            placeholder="Enter product title"
            className="
              w-full rounded-xl
              border border-white/10
              bg-white/5 px-4 py-3
              text-sm text-white
              outline-none transition
              placeholder:text-gray-500
              focus:border-violet-500
            "
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Category
          </label>

          <div className="relative">
            <select
              name="category"
              value={
                typeof form.category === "object" &&
                form.category !== null
                  ? form.category._id
                  : form.category ?? ""
              }
              onChange={onChange}
              className="
                w-full appearance-none rounded-xl
                border border-white/10
                bg-white/5 px-4 py-3 pr-10
                text-sm text-white
                outline-none transition
                focus:border-violet-500
              "
            >
              <option
                value=""
                className="bg-slate-900"
              >
                Select category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="bg-slate-900"
                >
                  {category.name}
                </option>
              ))}
            </select>

            <span
              className="
                pointer-events-none
                absolute right-4 top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >
              ▼
            </span>
          </div>
        </div>

        {/* Brand */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={form.brand ?? ""}
            onChange={onChange}
            placeholder="Enter brand"
            className="
              w-full rounded-xl
              border border-white/10
              bg-white/5 px-4 py-3
              text-sm text-white
              outline-none transition
              placeholder:text-gray-500
              focus:border-violet-500
            "
          />
        </div>

        {/* SKU Information */}
        <div className="sm:col-span-2">
          <div
            className="
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-3
            "
          >
            <p className="text-xs font-medium text-gray-400">
              SKU
            </p>

            <p className="mt-1 text-sm text-gray-500">
              SKU is automatically generated when
              the product is created.
            </p>
          </div>
        </div>

        {/* Short Description */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Short Description
          </label>

          <textarea
            name="shortDescription"
            value={form.shortDescription ?? ""}
            onChange={onChange}
            rows={3}
            placeholder="Short product description"
            className="
              w-full resize-none rounded-xl
              border border-white/10
              bg-white/5 px-4 py-3
              text-sm text-white
              outline-none transition
              placeholder:text-gray-500
              focus:border-violet-500
            "
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Description
          </label>

          <textarea
            name="description"
            value={form.description ?? ""}
            onChange={onChange}
            rows={6}
            placeholder="Enter full product description"
            className="
              w-full resize-none rounded-xl
              border border-white/10
              bg-white/5 px-4 py-3
              text-sm text-white
              outline-none transition
              placeholder:text-gray-500
            "
          />
        </div>
      </div>
    </section>
  );
}

export default BasicInfoFields;

