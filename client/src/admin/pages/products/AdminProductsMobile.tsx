import {
  FiPlus,
  FiSearch,
  FiPackage,
} from "react-icons/fi";

import type { Product } from "../../../features/products/types/product";

import MobileProductCard from "./components/mobile/MobileProductCard";
import MobileProductStats from "./components/mobile/MobileProductStats";
import MobileProductFilters from "./components/mobile/MobileProductFilters";

interface ProductCategory {
  _id: string;
  name: string;
}

interface AdminProductsMobileProps {
  products: Product[];
  isLoading: boolean;

  search: string;
  category: string;
  status: string;

  categories: ProductCategory[];

  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;

  onAdd: () => void;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function AdminProductsMobile({
  products,
  isLoading,

  search,
  category,
  status,

  categories,

  total,
  active,
  lowStock,
  outOfStock,

  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onClear,

  onAdd,
  onView,
  onEdit,
  onDelete,
}: AdminProductsMobileProps) {
  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">

        <div>
          <h1
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Products
          </h1>

          <p
            className="
              mt-1
              text-xs
              text-gray-500
            "
          >
            Manage products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="
            inline-flex
            shrink-0
            items-center
            justify-center
            gap-1.5
            rounded-xl
            bg-violet-600
            px-3.5
            py-2.5
            text-xs
            font-semibold
            text-white
            shadow-lg
            shadow-violet-900/20
            transition
            active:scale-95
          "
        >
          <FiPlus size={16} />
          Add
        </button>

      </div>

      {/* STATS */}

      <MobileProductStats
        total={total}
        active={active}
        lowStock={lowStock}
        outOfStock={outOfStock}
      />

      {/* SEARCH */}

      <div className="relative">

        <FiSearch
          size={17}
          className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-gray-500
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search products..."
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900/70
            py-3
            pl-10
            pr-4
            text-sm
            text-white
            outline-none
            placeholder:text-gray-600
            focus:border-violet-500
          "
        />

      </div>

      {/* FILTERS */}

      <MobileProductFilters
        category={category}
        status={status}
        categories={categories}
        onCategoryChange={onCategoryChange}
        onStatusChange={onStatusChange}
        onClear={onClear}
      />

      {/* LOADING */}

      {isLoading && (
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/70
            p-10
            text-center
          "
        >
          <div
            className="
              mx-auto
              h-7
              w-7
              animate-spin
              rounded-full
              border-2
              border-white/10
              border-t-violet-500
            "
          />

          <p
            className="
              mt-3
              text-xs
              text-gray-500
            "
          >
            Loading products...
          </p>
        </div>
      )}

      {/* EMPTY */}

      {!isLoading && products.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/70
            p-10
            text-center
          "
        >
          <FiPackage
            size={32}
            className="
              mx-auto
              text-gray-600
            "
          />

          <p
            className="
              mt-3
              text-sm
              font-medium
              text-gray-400
            "
          >
            No products found
          </p>

          <p
            className="
              mt-1
              text-xs
              text-gray-600
            "
          >
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* PRODUCTS */}

      {!isLoading && products.length > 0 && (
        <div className="space-y-3">

          {products.map((product) => (
            <MobileProductCard
              key={product._id}
              product={product}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminProductsMobile;