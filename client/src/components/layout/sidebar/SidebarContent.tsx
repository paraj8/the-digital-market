import {
  FiHome,
  FiGrid,
  FiPackage,
  FiTag,
  FiZap,
  FiStar,
  FiHelpCircle,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const links = [
  {
    icon: <FiHome />,
    label: "Home",
    path: "/",
  },
  {
    icon: <FiPackage />,
    label: "Products",
    path: "/products",
  },
  {
    icon: <FiGrid />,
    label: "Categories",
    path: "/products",
  },
  {
    icon: <FiTag />,
    label: "Brands",
    path: "/products",
  },
  {
    icon: <FiZap />,
    label: "Deals",
    path: "/products?deal=true",
  },
  {
    icon: <FiStar />,
    label: "New Arrivals",
    path: "/products?sort=newest",
  },
];

function SidebarContent() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}

      <div className="border-b border-white/10 p-5">
        <h2 className="text-lg font-bold">
          🛍 Shop
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Discover amazing products
        </p>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto p-3">
        {links.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="
              mb-2
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              transition
              hover:bg-white/10
              hover:text-violet-400
            "
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t border-white/10 p-3">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            transition
            hover:bg-white/10
          "
        >
          <FiHelpCircle />

          <span>Help Center</span>
        </button>
      </div>
    </div>
  );
}

export default SidebarContent;