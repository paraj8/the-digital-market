import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiLayers,
  FiUsers,
  FiUserCheck,
  FiTag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const menu = [
  {
    title: "Dashboard",
    icon: FiGrid,
    href: "/admin",
  },
  {
    title: "Orders",
    icon: FiShoppingBag,
    href: "/admin/orders",
  },
  {
    title: "Products",
    icon: FiBox,
    href: "/admin/products",
  },
  {
    title: "Categories",
    icon: FiLayers,
    href: "/admin/categories",
  },
  {
    title: "Customers",
    icon: FiUsers,
    href: "/admin/customers",
  },
  {
    title: "Staff",
    icon: FiUserCheck,
    href: "/admin/staff",
  },
  {
    title: "Coupons",
    icon: FiTag,
    href: "/admin/coupons",
  },
  {
    title: "Analytics",
    icon: FiBarChart2,
    href: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: FiSettings,
    href: "/admin/settings",
  },
];

function AdminSidebar() {
  return (
    <aside
      className="
        w-72
        h-screen
        bg-slate-950
        border-r
        border-white/10
        flex
        flex-col
      "
    >
      {/* Logo */}

      <div
        className="
          h-20
          flex
          items-center
          justify-center
          border-b
          border-white/10
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-bold
              text-violet-400
            "
          >
            The Digital Market
          </h1>

          <p
            className="
              text-xs
              text-gray-400
              text-center
            "
          >
            Admin Panel
          </p>
        </div>
      </div>

      {/* Menu */}

      <nav
        className="
          flex-1
          py-6
          px-4
          space-y-2
        "
      >
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.title}
              href={item.href}
              className="
                flex
                items-center
                gap-4

                px-4
                py-3

                rounded-xl

                text-gray-300

                transition

                hover:bg-violet-600/20
                hover:text-white
              "
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </a>
          );
        })}
      </nav>

      {/* Logout */}

      <div
        className="
          p-4
          border-t
          border-white/10
        "
      >
        <button
          className="
            w-full

            flex
            items-center
            justify-center
            gap-3

            rounded-xl

            bg-red-600

            py-3

            font-medium

            transition

            hover:bg-red-500
          "
        >
          <FiLogOut />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;