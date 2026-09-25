import type { Category } from "../../../../shared/types/category";

interface CategoryStatsProps {
  categories: Category[];
}

function CategoryStats({
  categories,
}: CategoryStatsProps) {
  const total = categories.length;

  const active = categories.filter(
    (category) => category.isActive
  ).length;

  const inactive = total - active;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-sm text-gray-400">
          Total Categories
        </p>

        <p className="mt-2 text-2xl font-bold text-white">
          {total}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-sm text-gray-400">
          Active
        </p>

        <p className="mt-2 text-2xl font-bold text-green-400">
          {active}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <p className="text-sm text-gray-400">
          Inactive
        </p>

        <p className="mt-2 text-2xl font-bold text-gray-400">
          {inactive}
        </p>
      </div>
    </div>
  );
}

export default CategoryStats;