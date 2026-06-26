import {
  FiUser,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiMessageCircle,
  FiMapPin,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

type Props = {
  user: {
    fullName: string;
    email: string;
  };
  onClose: () => void;
};

function ProfileDropdown({
  user,
  onClose,
}: Props) {
  const navigate = useNavigate();

  const handleNavigate = (
    path: string
  ) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    onClose();
  };

  return (
    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-72
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#121826]
        shadow-2xl
        shadow-black/40
      "
    >
      {/* Header */}

      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-12 w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              font-bold
              text-lg
            "
          >
            {user.fullName?.[0]?.toUpperCase()}
          </div>

          <div>
            <p className="font-semibold">
              {user.fullName}
            </p>

            <p className="text-xs text-slate-400">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <div className="p-2">
        <MenuItem
          icon={<FiUser />}
          text="My Profile"
          onClick={() =>
            handleNavigate("/profile")
          }
        />

        <MenuItem
          icon={<FiPackage />}
          text="Orders"
          onClick={() =>
            handleNavigate("/orders")
          }
        />

        <MenuItem
          icon={<FiHeart />}
          text="Wishlist"
          onClick={() =>
            handleNavigate("/wishlist")
          }
        />

        <MenuItem
          icon={<FiShoppingCart />}
          text="Cart"
          onClick={() =>
            handleNavigate("/cart")
          }
        />

        <MenuItem
          icon={<FiMessageCircle />}
          text="Messages"
          onClick={() =>
            handleNavigate("/messages")
          }
        />

        <MenuItem
          icon={<FiMessageCircle />}
          text="AI Assistant"
          onClick={() =>
            handleNavigate("/ai")
          }
        />

        <MenuItem
          icon={<FiMapPin />}
          text="Addresses"
          onClick={() =>
            handleNavigate("/addresses")
          }
        />

        <MenuItem
          icon={<FiSettings />}
          text="Settings"
          onClick={() =>
            handleNavigate("/settings")
          }
        />

        <div className="my-2 border-t border-white/10" />

        <MenuItem
          icon={<FiLogOut />}
          text="Logout"
          danger
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
};

function MenuItem({
  icon,
  text,
  onClick,
  danger,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        text-sm
        transition

        ${
          danger
            ? "text-red-400 hover:bg-red-500/10"
            : "hover:bg-white/5"
        }
      `}
    >
      {icon}

      <span>{text}</span>
    </button>
  );
}

export default ProfileDropdown;