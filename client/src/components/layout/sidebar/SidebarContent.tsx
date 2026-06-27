import {
  FiHome,
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiHelpCircle,
} from "react-icons/fi";

const links = [
  {
    icon: <FiHome />,
    label: "Home",
  },
  {
    icon: <FiGrid />,
    label: "Categories",
  },
  {
    icon: <FiPackage />,
    label: "Products",
  },
  {
    icon: <FiShoppingCart />,
    label: "Orders",
  },
  {
    icon: <FiHeart />,
    label: "Wishlist",
  },
  {
    icon: <FiUser />,
    label: "Profile",
  },
];

function SidebarContent() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}

      <div
        className="
          border-b border-white/10
          p-5
        "
      >
        <h2 className="text-lg font-bold">
          Hello, User
        </h2>

        <p className="text-sm text-slate-400">
          Welcome to TDM
        </p>
      </div>

      {/* Navigation */}

      <div className="p-3">
        {links.map((item) => (
          <button
            key={item.label}
            className="
              flex w-full items-center
              gap-3
              rounded-xl
              px-4 py-3
              text-left
              hover:bg-white/10
              transition
            "
          >
            {item.icon}

            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-4 border-t border-white/10 p-3">
        <button
          className="
            flex w-full items-center
            gap-3
            rounded-xl
            px-4 py-3
            hover:bg-white/10
          "
        >
          <FiHelpCircle />

          Help Center
        </button>
      </div>
    </div>
  );
}

export default SidebarContent;