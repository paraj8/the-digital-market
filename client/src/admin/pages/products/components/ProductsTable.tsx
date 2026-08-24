import type { Product } from "../../../../features/products/types/product";
import ProductRow from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  isLoading?: boolean;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductsTable({
  products,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead className="border-b border-white/10 bg-slate-800/40">
            <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">
                Product
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Price
              </th>

              <th className="px-6 py-4">
                Stock
              </th>

              <th className="px-6 py-4">
                Sales
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable;