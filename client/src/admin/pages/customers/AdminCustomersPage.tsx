import {
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiUserCheck,
} from "react-icons/fi";

const customers = [
  {
    id: "USR-1001",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    orders: 12,
    spent: "₹24,580",
    status: "Active",
    joined: "Jul 08, 2026",
  },
  {
    id: "USR-1002",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 91234 56789",
    orders: 8,
    spent: "₹16,420",
    status: "Active",
    joined: "Jul 12, 2026",
  },
  {
    id: "USR-1003",
    name: "Amit Singh",
    email: "amit@example.com",
    phone: "+91 99887 66554",
    orders: 5,
    spent: "₹9,850",
    status: "Blocked",
    joined: "Jul 15, 2026",
  },
  {
    id: "USR-1004",
    name: "Sneha Verma",
    email: "sneha@example.com",
    phone: "+91 97654 32109",
    orders: 15,
    spent: "₹31,250",
    status: "Active",
    joined: "Jul 18, 2026",
  },
  {
    id: "USR-1005",
    name: "Vikash Das",
    email: "vikash@example.com",
    phone: "+91 93456 78901",
    orders: 2,
    spent: "₹2,499",
    status: "Inactive",
    joined: "Jul 22, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",

  Blocked:
    "border-red-500/20 bg-red-500/10 text-red-400",

  Inactive:
    "border-gray-500/20 bg-gray-500/10 text-gray-400",
};

function AdminCustomersPage() {
  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Customers
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Manage customers, accounts and activity.
        </p>
      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Customers
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            1,284
          </p>

          <p className="mt-1 text-xs text-green-400">
            +86 this month
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Active Customers
          </p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            1,192
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            New This Month
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-400">
            86
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Blocked
          </p>

          <p className="mt-2 text-2xl font-bold text-red-400">
            12
          </p>
        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH / FILTER */}
      {/* ===================================== */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

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
              placeholder="Search customers..."
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
              All Status

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
              <FiUserCheck size={16} />

              Verified

              <FiChevronDown size={15} />
            </button>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* CUSTOMER TABLE */}
      {/* ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="border-b border-white/10 bg-slate-800/40">

              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4">
                  Orders
                </th>

                <th className="px-6 py-4">
                  Total Spent
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Joined
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-white/5">

              {customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="
                    transition
                    hover:bg-white/[0.02]
                  "
                >

                  {/* Customer */}

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
                          rounded-full
                          bg-violet-500/10
                          text-sm
                          font-semibold
                          text-violet-400
                        "
                      >
                        {customer.name.charAt(0)}
                      </div>

                      <div>

                        <p className="font-medium text-white">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {customer.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Phone */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {customer.phone}
                  </td>

                  {/* Orders */}

                  <td className="px-6 py-4">

                    <span className="font-medium text-white">
                      {customer.orders}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      orders
                    </span>

                  </td>

                  {/* Spent */}

                  <td className="px-6 py-4 font-medium text-white">
                    {customer.spent}
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
                        ${statusStyles[customer.status]}
                      `}
                    >
                      {customer.status}
                    </span>

                  </td>

                  {/* Joined */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {customer.joined}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="View customer"
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
                        title="Edit customer"
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
                        title="Delete customer"
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

export default AdminCustomersPage;