import {
  FiEdit2,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import type { Product } from "../../../../shared/types/product";
import ProductStatusBadge from "./ProductStatusBadge";

interface ProductRowProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductRow({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductRowProps) {
  const stock = product.stock ?? 0;

  const categoryName =
    typeof product.category === "object" &&
    product.category !== null
      ? product.category.name
      : "Uncategorized";

  const image =
    product.images?.length > 0
      ? product.images[0]?.url
      : null;

  return (
    <tr
      className="
        transition
        hover:bg-white/[0.02]
      "
    >
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-slate-800
              text-xs
              font-semibold
              text-violet-400
            "
          >
            {image ? (
              <img
                src={image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              "IMG"
            )}
          </div>

          <div>
            <p className="font-medium text-white">
              {product.title}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {product.sku}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-sm text-gray-400">
        {categoryName}
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="font-medium text-white">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        {product.salePrice &&
          product.salePrice > 0 &&
          product.salePrice < product.price && (
            <div className="mt-1 text-xs text-green-400">
              Sale: ₹
              {product.salePrice.toLocaleString(
                "en-IN"
              )}
            </div>
          )}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        <span
          className={
            stock === 0
              ? "text-red-400"
              : stock < 10
                ? "text-yellow-400"
                : "text-gray-300"
          }
        >
          {stock}
        </span>
      </td>

      {/* Sales */}
      <td className="px-6 py-4 text-sm text-gray-300">
        {product.salesCount ?? 0}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <ProductStatusBadge
          stock={stock}
          isActive={product.isActive ?? true}
        />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            title="View product"
            onClick={() => onView(product)}
            className="
              rounded-lg
              border
              border-white/10
              p-2
              text-gray-400
              transition
              hover:border-violet-500/30
              hover:bg-violet-500/10
              hover:text-violet-400
            "
          >
            <FiEye size={16} />
          </button>

          <button
            type="button"
            title="Edit product"
            onClick={() => onEdit(product)}
            className="
              rounded-lg
              border
              border-white/10
              p-2
              text-gray-400
              transition
              hover:border-blue-500/30
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            title="Delete product"
            onClick={() => onDelete(product)}
            className="
              rounded-lg
              border
              border-white/10
              p-2
              text-gray-400
              transition
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

export default ProductRow;