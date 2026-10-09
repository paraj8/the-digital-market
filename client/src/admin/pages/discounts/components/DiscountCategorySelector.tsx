import { useMemo, useState } from "react";

import type { Category } from "../../../../shared/types/category";
import type { DiscountCategoryReference } from "../../../../shared/types/discount";
import { useCategories } from "../../../../user/features/categories/hooks/useCategories";

interface DiscountCategorySelectorProps {
  categoryIds: string[];
  selectedCategories: DiscountCategoryReference[];
  onChange: (categories: DiscountCategoryReference[]) => void;
}

function DiscountCategorySelector({
  categoryIds,
  selectedCategories,
  onChange,
}: DiscountCategorySelectorProps) {
  const [search, setSearch] = useState("");
  const { data = [], isLoading, isError, error } = useCategories();
  const categories = useMemo(
    () => data.filter((category) => category.name.toLowerCase().includes(search.trim().toLowerCase())),
    [data, search]
  );
  const categoryMap = new Map<string, DiscountCategoryReference>([
    ...selectedCategories.map((category) => [category._id, category] as const),
    ...data.map((category: Category) => [
      category._id,
      { _id: category._id, name: category.name },
    ] as const),
  ]);

  const toggle = (id: string) => {
    const ids = categoryIds.includes(id)
      ? categoryIds.filter((categoryId) => categoryId !== id)
      : [...categoryIds, id];
    onChange(ids.map((categoryId) => categoryMap.get(categoryId))
      .filter((category): category is DiscountCategoryReference => Boolean(category)));
  };

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-slate-800/40 p-4">
      <label htmlFor="discount-category-search" className="block text-sm text-gray-300">
        Search categories
      </label>
      <input
        id="discount-category-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search categories..."
        className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-white outline-none focus:border-violet-500"
      />
      {isLoading ? (
        <p className="text-sm text-gray-400">Loading categories...</p>
      ) : isError ? (
        <p className="text-sm text-red-400">
          {error instanceof Error ? error.message : "Failed to load categories."}
        </p>
      ) : (
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {categories.map((category) => (
            <label key={category._id} className="flex items-center gap-3 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={categoryIds.includes(category._id)}
                onChange={() => toggle(category._id)}
                className="accent-violet-500"
              />
              {category.name}
            </label>
          ))}
          {!categories.length && <p className="text-sm text-gray-400">No categories found.</p>}
        </div>
      )}
      <div>
        <p className="mb-2 text-sm font-medium text-white">Selected Categories ({categoryIds.length})</p>
        {categoryIds.length === 0 ? (
          <p className="text-sm text-gray-400">No categories selected.</p>
        ) : (
          <ul className="space-y-2">
            {categoryIds.map((id) => (
              <li key={id} className="flex items-center gap-2 rounded-lg bg-slate-900/70 p-2 text-sm text-gray-200">
                <span className="flex-1">{categoryMap.get(id)?.name ?? `Category ${id}`}</span>
                <button type="button" onClick={() => toggle(id)} aria-label={`Remove ${categoryMap.get(id)?.name ?? "category"}`}
                  className="px-2 text-gray-400 hover:text-white">×</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DiscountCategorySelector;
