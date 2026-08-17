import type { ChangeEvent } from "react";

import CategoryImageUpload from "./CategoryImageUpload";

interface CategoryFormFieldsProps {
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  image: File | null;
  existingImageUrl?: string;

  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onIsActiveChange: (value: boolean) => void;
  onSortOrderChange: (value: number) => void;
  onImageChange: (file: File | null) => void;

  disabled?: boolean;
}

function CategoryFormFields({
  name,
  description,
  isActive,
  sortOrder,
  image,
  existingImageUrl,
  onNameChange,
  onDescriptionChange,
  onIsActiveChange,
  onSortOrderChange,
  onImageChange,
  disabled = false,
}: CategoryFormFieldsProps) {
  const handleSortOrderChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);

    onSortOrderChange(
      Number.isNaN(value) ? 0 : Math.max(0, value)
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Name */}
      <div>
        <label
          htmlFor="category-name"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Category Name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) =>
            onNameChange(event.target.value)
          }
          placeholder="e.g. Electronics"
          disabled={disabled}
          required
          className="
            w-full rounded-xl
            border border-white/10
            bg-slate-800/70
            px-4 py-3
            text-sm text-white
            outline-none
            placeholder:text-gray-500
            transition
            focus:border-violet-500
            focus:ring-1
            focus:ring-violet-500/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="category-description"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Description
        </label>

        <textarea
          id="category-description"
          value={description}
          onChange={(event) =>
            onDescriptionChange(event.target.value)
          }
          placeholder="Enter a short description for this category..."
          rows={4}
          disabled={disabled}
          className="
            w-full resize-none rounded-xl
            border border-white/10
            bg-slate-800/70
            px-4 py-3
            text-sm text-white
            outline-none
            placeholder:text-gray-500
            transition
            focus:border-violet-500
            focus:ring-1
            focus:ring-violet-500/30
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />
      </div>

      {/* Image */}
      <CategoryImageUpload
        value={image}
        existingImageUrl={existingImageUrl}
        onChange={onImageChange}
        disabled={disabled}
      />

      {/* Sort Order + Status */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Sort Order */}
        <div>
          <label
            htmlFor="category-sort-order"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Sort Order
          </label>

          <input
            id="category-sort-order"
            type="number"
            min={0}
            value={sortOrder}
            onChange={handleSortOrderChange}
            disabled={disabled}
            className="
              w-full rounded-xl
              border border-white/10
              bg-slate-800/70
              px-4 py-3
              text-sm text-white
              outline-none
              transition
              focus:border-violet-500
              focus:ring-1
              focus:ring-violet-500/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          />

          <p className="mt-1.5 text-xs text-gray-500">
            Lower numbers appear first.
          </p>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="category-status"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Status
          </label>

          <button
            id="category-status"
            type="button"
            role="switch"
            aria-checked={isActive}
            onClick={() =>
              onIsActiveChange(!isActive)
            }
            disabled={disabled}
            className="
              flex w-full items-center justify-between
              rounded-xl
              border border-white/10
              bg-slate-800/70
              px-4 py-3
              text-sm
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <span className="text-gray-300">
              {isActive ? "Active" : "Inactive"}
            </span>

            <span
              className={`
                relative h-6 w-11 rounded-full
                transition-colors
                ${
                  isActive
                    ? "bg-violet-600"
                    : "bg-gray-600"
                }
              `}
            >
              <span
                className={`
                  absolute top-1 h-4 w-4
                  rounded-full bg-white
                  shadow-sm transition-transform
                  ${
                    isActive
                      ? "translate-x-6"
                      : "translate-x-1"
                  }
                `}
              />
            </span>
          </button>

          <p className="mt-1.5 text-xs text-gray-500">
            Inactive categories won't be shown to customers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryFormFields;