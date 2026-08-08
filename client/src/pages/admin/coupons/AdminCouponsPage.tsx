import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiCopy,
} from "react-icons/fi";

const coupons = [
  {
    id: "CPN-001",
    code: "WELCOME10",
    type: "Percentage",
    value: "10%",
    minOrder: "₹499",
    usage: 128,
    limit: 500,
    status: "Active",
    expires: "Aug 31, 2026",
  },
  {
    id: "CPN-002",
    code: "SAVE200",
    type: "Fixed",
    value: "₹200",
    minOrder: "₹1,499",
    usage: 76,
    limit: 200,
    status: "Active",
    expires: "Sep 15, 2026",
  },
  {
    id: "CPN-003",
    code: "FESTIVE20",
    type: "Percentage",
    value: "20%",
    minOrder: "₹999",
    usage: 342,
    limit: 500,
    status: "Active",
    expires: "Oct 10, 2026",
  },
  {
    id: "CPN-004",
    code: "NEWUSER50",
    type: "Fixed",
    value: "₹50",
    minOrder: "₹299",
    usage: 500,
    limit: 500,
    status: "Expired",
    expires: "Jul 31, 2026",
  },
  {
    id: "CPN-005",
    code: "ELECTRO15",
    type: "Percentage",
    value: "15%",
    minOrder: "₹2,000",
    usage: 42,
    limit: 100,
    status: "Inactive",
    expires: "Dec 31, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",

  Inactive:
    "border-gray-500/20 bg-gray-500/10 text-gray-400",

  Expired:
    "border-red-500/20 bg-red-500/10 text-red-400",
};

function AdminCouponsPage() {
  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Coupons
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Create and manage discount coupons for customers.
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

          Create Coupon
        </button>

      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Coupons
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            38
          </p>

          <p className="mt-1 text-xs text-green-400">
            +6 this month
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Active Coupons
          </p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            24
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Usage
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-400">
            4,826
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Discount Given
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            ₹2.84L
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
              placeholder="Search coupon code..."
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
              All Types

              <FiChevronDown size={15} />
            </button>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* COUPON TABLE */}
      {/* ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1150px]">

            <thead className="border-b border-white/10 bg-slate-800/40">

              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Coupon
                </th>

                <th className="px-6 py-4">
                  Discount
                </th>

                <th className="px-6 py-4">
                  Min. Order
                </th>

                <th className="px-6 py-4">
                  Usage
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Expires
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-white/5">

              {coupons.map((coupon) => (

                <tr
                  key={coupon.id}
                  className="
                    transition
                    hover:bg-white/[0.02]
                  "
                >

                  {/* Coupon */}

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
                          text-violet-400
                        "
                      >
                        <FiCopy size={18} />
                      </div>

                      <div>

                        <div className="flex items-center gap-2">

                          <p className="font-semibold text-white">
                            {coupon.code}
                          </p>

                          <span className="text-xs text-gray-600">
                            {coupon.id}
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          {coupon.type}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Discount */}

                  <td className="px-6 py-4">

                    <span className="font-semibold text-white">
                      {coupon.value}
                    </span>

                  </td>

                  {/* Minimum Order */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {coupon.minOrder}
                  </td>

                  {/* Usage */}

                  <td className="px-6 py-4">

                    <div className="w-32">

                      <div className="mb-1 flex justify-between text-xs">

                        <span className="text-gray-400">
                          {coupon.usage}
                        </span>

                        <span className="text-gray-600">
                          {coupon.limit}
                        </span>

                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                        <div
                          className="h-full rounded-full bg-violet-500"
                          style={{
                            width: `${Math.min(
                              (coupon.usage / coupon.limit) * 100,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

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
                        ${statusStyles[coupon.status]}
                      `}
                    >
                      {coupon.status}
                    </span>

                  </td>

                  {/* Expires */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {coupon.expires}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="View coupon"
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
                        title="Edit coupon"
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
                        title="Delete coupon"
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

export default AdminCouponsPage;