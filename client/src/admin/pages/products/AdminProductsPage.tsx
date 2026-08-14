import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";

const products = [
  {
    id: "PRD-1001",
    name: "Samsung Galaxy S25",
    category: "Electronics",
    price: "₹79,999",
    stock: 24,
    status: "Active",
    sales: 128,
  },
  {
    id: "PRD-1002",
    name: "Wireless Mechanical Keyboard",
    category: "Electronics",
    price: "₹2,499",
    stock: 42,
    status: "Active",
    sales: 86,
  },
  {
    id: "PRD-1003",
    name: "Ergonomic Wireless Mouse",
    category: "Accessories",
    price: "₹1,499",
    stock: 18,
    status: "Active",
    sales: 64,
  },
  {
    id: "PRD-1004",
    name: "Premium Cotton T-Shirt",
    category: "Fashion",
    price: "₹899",
    stock: 7,
    status: "Low Stock",
    sales: 42,
  },
  {
    id: "PRD-1005",
    name: "USB-C Fast Charging Cable",
    category: "Accessories",
    price: "₹499",
    stock: 0,
    status: "Out of Stock",
    sales: 31,
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",

  "Low Stock":
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

  "Out of Stock":
    "border-red-500/20 bg-red-500/10 text-red-400",
};

function AdminProductsPage() {
  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage your store products and inventory.
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
          "
        >
          <FiPlus size={18} />

          Add Product
        </button>

      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Products
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            324
          </p>

          <p className="mt-1 text-xs text-green-400">
            +12 this month
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Active Products
          </p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            298
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Low Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            18
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Out of Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-red-400">
            8
          </p>
        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH + FILTERS */}
      {/* ===================================== */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}

          <div className="relative w-full lg:max-w-md">

            <FiSearch
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                py-2.5
                pl-10
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-gray-500
                focus:border-violet-500
              "
            />

          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                px-4
                py-2.5
                text-sm
                text-gray-300
                transition
                hover:bg-slate-800
              "
            >
              <FiFilter size={16} />

              Filter
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                px-4
                py-2.5
                text-sm
                text-gray-300
                transition
                hover:bg-slate-800
              "
            >
              All Categories

              <FiChevronDown size={15} />
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-slate-800/70
                px-4
                py-2.5
                text-sm
                text-gray-300
                transition
                hover:bg-slate-800
              "
            >
              All Status

              <FiChevronDown size={15} />
            </button>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* PRODUCTS TABLE */}
      {/* ===================================== */}

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

              {products.map((product) => (

                <tr
                  key={product.id}
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
                          rounded-xl
                          bg-slate-800
                          text-xs
                          font-semibold
                          text-violet-400
                        "
                      >
                        IMG
                      </div>

                      <div>

                        <p className="font-medium text-white">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {product.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {product.category}
                  </td>

                  {/* Price */}

                  <td className="px-6 py-4 font-medium text-white">
                    {product.price}
                  </td>

                  {/* Stock */}

                  <td className="px-6 py-4">

                    <span
                      className={
                        product.stock === 0
                          ? "text-red-400"
                          : product.stock < 10
                            ? "text-yellow-400"
                            : "text-gray-300"
                      }
                    >
                      {product.stock}
                    </span>

                  </td>

                  {/* Sales */}

                  <td className="px-6 py-4 text-sm text-gray-300">
                    {product.sales}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-4">

                    <span
                      className={`
                        inline-flex
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${statusStyles[product.status]}
                      `}
                    >
                      {product.status}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="View product"
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminProductsPage;