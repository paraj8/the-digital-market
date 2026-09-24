
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHeart,
  FiShoppingBag,
  FiShield,
  FiLogOut,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  role?: string;
  profileImage?: string;
  isVerified?: boolean;
  isBlocked?: boolean;
  authProvider?: string;
  wishlistCount?: number;
  orderCount?: number;
  createdAt?: string;
}

function ProfilePage() {
  const navigate = useNavigate();

  const storedUser =
    localStorage.getItem("user");

  const user: User | null = storedUser
    ? JSON.parse(storedUser)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-6
            text-center
          "
        >
          <FiUser
            size={32}
            className="mx-auto text-gray-500"
          />

          <h1 className="mt-3 text-xl font-semibold text-white">
            Please log in
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            You need to be logged in to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="
              mt-5
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:opacity-90
            "
          >
            Login
          </button>
        </div>
      </section>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const joinedDate = user.createdAt
    ? new Date(
        user.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account and personal information
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-[#121826]
        "
      >
        {/* Background glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-violet-600/15
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-20
            h-72
            w-72
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-5
            p-5
            sm:flex-row
            sm:items-center
            sm:p-7
          "
        >
          {/* Avatar */}
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="
                h-20
                w-20
                shrink-0
                rounded-2xl
                border border-white/10
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-600
                to-blue-600
                text-2xl
                font-bold
                text-white
                shadow-lg
                shadow-violet-900/20
              "
            >
              {initials}
            </div>
          )}

          {/* User information */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                {user.fullName}
              </h2>

              {user.isVerified && (
                <FiCheckCircle
                  size={17}
                  className="text-cyan-400"
                  title="Verified account"
                />
              )}
            </div>

            <p className="mt-1 break-all text-sm text-gray-400">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className="
                  rounded-full
                  border border-violet-500/20
                  bg-violet-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  capitalize
                  text-violet-300
                "
              >
                {user.role || "customer"}
              </span>

              {user.authProvider && (
                <span
                  className="
                    rounded-full
                    border border-white/10
                    bg-white/5
                    px-3
                    py-1
                    text-xs
                    capitalize
                    text-gray-400
                  "
                >
                  {user.authProvider} account
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* Orders */}
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-blue-500/10
              text-blue-400
            "
          >
            <FiShoppingBag size={18} />
          </div>

          <p className="mt-3 text-xl font-bold text-white">
            {user.orderCount ?? 0}
          </p>

          <p className="text-xs text-gray-500">
            Orders
          </p>
        </div>

        {/* Wishlist */}
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-pink-500/10
              text-pink-400
            "
          >
            <FiHeart size={18} />
          </div>

          <p className="mt-3 text-xl font-bold text-white">
            {user.wishlistCount ?? 0}
          </p>

          <p className="text-xs text-gray-500">
            Wishlist
          </p>
        </div>

        {/* Verification */}
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-400
            "
          >
            <FiShield size={18} />
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            {user.isVerified
              ? "Verified"
              : "Not Verified"}
          </p>

          <p className="text-xs text-gray-500">
            Account status
          </p>
        </div>

        {/* Joined */}
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-violet-500/10
              text-violet-400
            "
          >
            <FiCalendar size={18} />
          </div>

          <p className="mt-3 text-sm font-semibold text-white">
            {joinedDate}
          </p>

          <p className="text-xs text-gray-500">
            Joined
          </p>
        </div>
      </div>

      {/* Account Information */}
      <div
        className="
          mt-4
          rounded-3xl
          border border-white/10
          bg-[#121826]
          p-5
          sm:p-6
        "
      >
        <h2 className="text-lg font-semibold text-white">
          Account Information
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FiUser
                size={18}
                className="text-violet-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Full Name
                </p>

                <p className="mt-1 truncate text-sm font-medium text-white">
                  {user.fullName}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FiMail
                size={18}
                className="text-blue-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Email Address
                </p>

                <p className="mt-1 truncate text-sm font-medium text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FiPhone
                size={18}
                className="text-cyan-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Phone Number
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {user.phone || "Not added"}
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FiShield
                size={18}
                className="text-violet-400"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">
                  Account Type
                </p>

                <p className="mt-1 text-sm font-medium capitalize text-white">
                  {user.role || "Customer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:justify-end
        "
      >
        <button
          type="button"
          onClick={handleLogout}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-5
            py-2.5
            text-sm
            font-medium
            text-red-400
            transition
            hover:bg-red-500/15
            active:scale-[0.98]
          "
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </section>
  );
}

export default ProfilePage;

