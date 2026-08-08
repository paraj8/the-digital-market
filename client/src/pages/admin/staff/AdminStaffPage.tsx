import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronDown,

} from "react-icons/fi";

const staff = [
  {
    id: "STF-001",
    name: "Rahul Sharma",
    email: "rahul.staff@example.com",
    role: "Manager",
    department: "Operations",
    status: "Active",
    joined: "Jul 05, 2026",
  },
  {
    id: "STF-002",
    name: "Priya Singh",
    email: "priya.staff@example.com",
    role: "Support",
    department: "Customer Support",
    status: "Active",
    joined: "Jul 09, 2026",
  },
  {
    id: "STF-003",
    name: "Amit Kumar",
    email: "amit.staff@example.com",
    role: "Product Manager",
    department: "Products",
    status: "Active",
    joined: "Jul 13, 2026",
  },
  {
    id: "STF-004",
    name: "Sneha Das",
    email: "sneha.staff@example.com",
    role: "Accountant",
    department: "Finance",
    status: "Inactive",
    joined: "Jul 16, 2026",
  },
  {
    id: "STF-005",
    name: "Vikash Verma",
    email: "vikash.staff@example.com",
    role: "Support",
    department: "Customer Support",
    status: "Blocked",
    joined: "Jul 20, 2026",
  },
];

const statusStyles: Record<string, string> = {
  Active:
    "border-green-500/20 bg-green-500/10 text-green-400",

  Inactive:
    "border-gray-500/20 bg-gray-500/10 text-gray-400",

  Blocked:
    "border-red-500/20 bg-red-500/10 text-red-400",
};

const roleStyles: Record<string, string> = {
  Manager:
    "border-violet-500/20 bg-violet-500/10 text-violet-400",

  Support:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",

  "Product Manager":
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",

  Accountant:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
};

function AdminStaffPage() {
  return (
    <div className="space-y-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Staff
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Manage staff accounts, roles and permissions.
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

          Add Staff
        </button>

      </div>

      {/* ===================================== */}
      {/* STATS */}
      {/* ===================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Total Staff
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            28
          </p>

          <p className="mt-1 text-xs text-green-400">
            +4 this month
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Active Staff
          </p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            24
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Managers
          </p>

          <p className="mt-2 text-2xl font-bold text-violet-400">
            5
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-gray-400">
            Blocked
          </p>

          <p className="mt-2 text-2xl font-bold text-red-400">
            2
          </p>
        </div>

      </div>

      {/* ===================================== */}
      {/* SEARCH / FILTER */}
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
              placeholder="Search staff..."
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
              All Roles

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
      {/* STAFF TABLE */}
      {/* ===================================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1150px]">

            <thead className="border-b border-white/10 bg-slate-800/40">

              <tr className="text-left text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Staff Member
                </th>

                <th className="px-6 py-4">
                  Role
                </th>

                <th className="px-6 py-4">
                  Department
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

              {staff.map((member) => (

                <tr
                  key={member.id}
                  className="
                    transition
                    hover:bg-white/[0.02]
                  "
                >

                  {/* Staff */}

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
                        {member.name.charAt(0)}
                      </div>

                      <div>

                        <p className="font-medium text-white">
                          {member.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {member.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Role */}

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
                        ${roleStyles[member.role]}
                      `}
                    >
                      {member.role}
                    </span>

                  </td>

                  {/* Department */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {member.department}
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
                        ${statusStyles[member.status]}
                      `}
                    >
                      {member.status}
                    </span>

                  </td>

                  {/* Joined */}

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {member.joined}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="View staff"
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
                        title="Edit staff"
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
                        title="Delete staff"
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

export default AdminStaffPage;