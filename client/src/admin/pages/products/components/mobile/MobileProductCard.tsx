import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";

import type { Product } from "../../../../../features/products/types/product";

interface MobileProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function MobileProductCard({
  product,
  onView,
  onEdit,
  onDelete,
}: MobileProductCardProps) {
  const image =
    product.images?.[0]?.url ?? "";

  const stock =
    product.stock ?? 0;

  const threshold =
    product.lowStockThreshold ?? 5;

  const isLowStock =
    stock > 0 &&
    stock <= threshold;

  const isOutOfStock =
    stock === 0;

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-slate-900/70
      "
    >
      {/* PRODUCT */}

      <div className="flex gap-4 p-4">

        {/* IMAGE */}

        <div
          className="
            h-20
            w-20
            shrink-0
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-slate-800
          "
        >
          {image ? (
            <img
              src={image}
              alt={product.title}
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-gray-600
              "
            >
              <FiPackage size={28} />
            </div>
          )}
        </div>

        {/* DETAILS */}

        <div className="min-w-0 flex-1">

          <div
            className="
              flex
              items-start
              justify-between
              gap-2
            "
          >
            <h3
              className="
                line-clamp-2
                text-sm
                font-semibold
                text-white
              "
            >
              {product.title}
            </h3>

            {/* STATUS */}

            <span
              className={`
                shrink-0
                rounded-full
                px-2
                py-1
                text-[10px]
                font-semibold
                ${
                  product.isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-gray-500/10 text-gray-400"
                }
              `}
            >
              {product.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          {/* PRICE */}

          <p
            className="
              mt-2
              text-base
              font-bold
              text-white
            "
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          {/* STOCK */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                text-xs
                text-gray-500
              "
            >
              Stock:
            </span>

            {isOutOfStock ? (
              <span
                className="
                  text-xs
                  font-medium
                  text-red-400
                "
              >
                Out of stock
              </span>
            ) : isLowStock ? (
              <span
                className="
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-medium
                  text-amber-400
                "
              >
                <FiAlertCircle size={12} />
                {stock} left
              </span>
            ) : (
              <span
                className="
                  text-xs
                  font-medium
                  text-gray-300
                "
              >
                {stock} available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
          grid
          grid-cols-3
          border-t
          border-white/10
        "
      >
        <button
          type="button"
          onClick={() => onView(product)}
          className="
            flex
            items-center
            justify-center
            gap-1.5
            py-3
            text-xs
            font-medium
            text-gray-400
            transition
            hover:bg-white/5
            hover:text-white
          "
        >
          <FiEye size={15} />
          View
        </button>

        <button
          type="button"
          onClick={() => onEdit(product)}
          className="
            flex
            items-center
            justify-center
            gap-1.5
            border-x
            border-white/10
            py-3
            text-xs
            font-medium
            text-gray-400
            transition
            hover:bg-white/5
            hover:text-white
          "
        >
          <FiEdit2 size={14} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(product)}
          className="
            flex
            items-center
            justify-center
            gap-1.5
            py-3
            text-xs
            font-medium
            text-red-400
            transition
            hover:bg-red-500/5
          "
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default MobileProductCard;