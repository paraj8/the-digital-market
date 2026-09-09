import { useNavigate, useLocation } from "react-router-dom";
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
  FiX,
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

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function AdminSidebar({
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black/60
          backdrop-blur-sm
          transition-opacity
          duration-300
          md:hidden

          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onClose}
      />

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50

          flex
          h-screen
          w-72
          flex-col

          border-r
          border-white/10

          bg-slate-950

          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:static
          md:z-auto
          md:translate-x-0
        `}
      >
        {/* =====================================
            LOGO
        ===================================== */}

        <div
          className="
            relative

            flex
            h-20
            shrink-0
            items-center
            justify-center

            border-b
            border-white/10

            px-4
          "
        >
          <div>
            <h1
              className="
                text-center
                text-xl
                font-bold
                text-violet-400
              "
            >
              The Digital Market
            </h1>

            <p
              className="
                text-center
                text-xs
                text-gray-400
              "
            >
              Admin Panel
            </p>
          </div>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-4
              top-5

              rounded-lg
              p-2

              text-gray-400

              transition

              hover:bg-white/5
              hover:text-white

              md:hidden
            "
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* =====================================
            MENU
        ===================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto

            px-4
            py-6
          "
        >
          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(
                      item.href
                    );

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.href)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4

                    rounded-xl

                    px-4
                    py-3

                    text-left

                    transition

                    ${
                      isActive
                        ? "bg-violet-600/20 text-violet-400"
                        : "text-gray-300 hover:bg-violet-600/20 hover:text-white"
                    }
                  `}
                >
                  <Icon size={20} />

                  <span>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* =====================================
            LOGOUT
        ===================================== */}

        <div
          className="
            shrink-0

            border-t
            border-white/10

            p-4
          "
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3

              rounded-xl

              bg-red-600

              py-3

              font-medium
              text-white

              transition

              hover:bg-red-500
            "
          >
            <FiLogOut />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;