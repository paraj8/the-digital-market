import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

import type { Category } from "../../../../shared/types/category";

import CategoryStatusBadge from "./CategoryStatusBadge";

interface CategoryRowProps {
  category: Category;
  onView?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

function CategoryRow({
  category,
  onView,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  return (
    <tr className="transition hover:bg-white/[0.02]">
      {/* Category */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              bg-violet-500/10
              text-sm font-semibold
              text-violet-400
            "
          >
            {category.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-medium text-white">
              {category.name}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {category._id}
            </p>
          </div>
        </div>
      </td>

      {/* Slug */}
      <td className="px-6 py-4">
        <code className="text-sm text-gray-400">
          /{category.slug}
        </code>
      </td>

      {/* Sort Order */}
      <td className="px-6 py-4">
        <span className="font-medium text-white">
          {category.sortOrder}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <CategoryStatusBadge isActive={category.isActive} />
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-sm text-gray-400">
        {new Date(category.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            title="View category"
            onClick={() => onView?.(category)}
            className="
              rounded-lg border border-white/10 p-2
              text-gray-400 transition
              hover:border-violet-500/30
              hover:bg-violet-500/10
              hover:text-violet-400
            "
          >
            <FiEye size={16} />
          </button>

          <button
            type="button"
            title="Edit category"
            onClick={() => onEdit?.(category)}
            className="
              rounded-lg border border-white/10 p-2
              text-gray-400 transition
              hover:border-blue-500/30
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            title="Delete category"
            onClick={() => onDelete?.(category)}
            className="
              rounded-lg border border-white/10 p-2
              text-gray-400 transition
              hover:border-red-500/30
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryRow;