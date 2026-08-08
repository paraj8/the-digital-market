import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronDown,
} from "react-icons/fi";

const categories = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    products: 86,
    status: "Active",
    created: "Jul 12, 2026",
  },
  {
    id: "CAT-002",
    name: "Fashion",
    slug: "fashion",
    products: 64,
    status: "Active",
    created: "Jul 14, 2026",
  },
  {
    id: "CAT-003",
    name: "Accessories",
    slug: "accessories",
    products: 42,
    status: "Active",
    created: "Jul 18, 2026",
  },
  {
    id: "CAT-004",
    name: "Courier Pack Materials",
    slug: "courier-pack-materials",
    products: 28,
    status: "Active",
    created: "Jul 21, 2026",
  },
  {
    id: "CAT-005",
    name: "Digital Products",
    slug: "digital-products",
    products: 17,
    status: "Inactive",
    created: "Jul 24, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",

  Inactive:
    "border-gray-500/20 bg-gray-500/10 text-gray-400",
};

function AdminCategoriesPage() {
  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Categories
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage product categories and organization.
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

          Add Category
        </button>

      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Categories
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            24
          </p>

          <p className="mt-1 text-xs text-green-400">
            +3 this month
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Active
          </p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            21
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Inactive
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-400">
            3
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Products
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-400">
            324
          </p>
        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH / FILTER */}
      {/* ===================================== */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}

          <div className="relative w-full sm:max-w-md">

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
              placeholder="Search categories..."
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

          {/* Status Filter */}

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
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

      {/* ===================================== */}
      {/* CATEGORY TABLE */}
      {/* ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="border-b border-white/10 bg-slate-800/40">

              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Slug
                </th>

                <th className="px-6 py-4">
                  Products
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Created
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-white/5">

              {categories.map((category) => (

                <tr
                  key={category.id}
                  className="
                    transition
                    hover:bg-white/[0.02]
                  "
                >

                  {/* Category */}

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
                          bg-violet-500/10
                          text-sm
                          font-semibold
                          text-violet-400
                        "
                      >
                        {category.name.charAt(0)}
                      </div>

                      <div>

                        <p className="font-medium text-white">
                          {category.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {category.id}
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

                  {/* Products */}

                  <td className="px-6 py-4">

                    <span className="font-medium text-white">
                      {category.products}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      products
                    </span>

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
                        ${statusStyles[category.status]}
                      `}
                    >
                      {category.status}
                    </span>

                  </td>

                  {/* Created */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {category.created}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="View category"
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
                        title="Edit category"
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
                        title="Delete category"
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

export default AdminCategoriesPage;