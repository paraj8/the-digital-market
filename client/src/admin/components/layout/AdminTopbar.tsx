
import {
  FiSearch,
  FiBell,
  FiMail,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {
  return (
    <header
      className="
        h-20

        bg-slate-950/90

        backdrop-blur-xl

        border-b
        border-white/10

        flex
        items-center
        justify-between

        px-4
        md:px-8
      "
    >
      {/* Left */}

      <div
        className="
          flex
          items-center
          gap-3
          md:gap-4
        "
      >
        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-11
            w-11
            shrink-0

            items-center
            justify-center

            rounded-xl

            border
            border-white/10

            bg-slate-900

            text-gray-300

            transition

            hover:border-violet-500
            hover:text-white

            md:hidden
          "
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        {/* Search */}

        <div
          className="
            relative

            w-[180px]
            sm:w-[280px]
            md:w-[420px]
          "
        >
          <FiSearch
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2

              text-gray-500
            "
          />

          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="
              w-full

              rounded-xl

              border
              border-white/10

              bg-slate-900

              py-3
              pl-12
              pr-4

              text-sm
              text-white

              outline-none

              transition

              focus:border-violet-500
            "
          />
        </div>
      </div>

      {/* Right */}

      <div
        className="
          flex
          items-center
          gap-2
          md:gap-4
        "
      >
        {/* Notifications */}

        <button
          type="button"
          className="
            relative

            h-11
            w-11

            shrink-0

            rounded-xl

            bg-slate-900

            border
            border-white/10

            flex
            items-center
            justify-center

            transition

            hover:border-violet-500
          "
        >
          <FiBell size={20} />

          <span
            className="
              absolute

              top-2
              right-2

              h-2.5
              w-2.5

              rounded-full

              bg-red-500
            "
          />
        </button>

        {/* Messages */}

        <button
          type="button"
          className="
            relative

            hidden
            sm:flex

            h-11
            w-11

            shrink-0

            rounded-xl

            bg-slate-900

            border
            border-white/10

            items-center
            justify-center

            transition

            hover:border-violet-500
          "
        >
          <FiMail size={20} />

          <span
            className="
              absolute

              top-2
              right-2

              h-2.5
              w-2.5

              rounded-full

              bg-green-500
            "
          />
        </button>

        {/* Profile */}

        <button
          type="button"
          className="
            ml-0
            md:ml-2

            flex
            items-center
            gap-2
            md:gap-3

            rounded-xl

            border
            border-white/10

            bg-slate-900

            px-2
            md:px-4

            py-2

            transition

            hover:border-violet-500
          "
        >
          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin"
            className="
              h-9
              w-9
              md:h-10
              md:w-10

              rounded-full
            "
          />

          <div
            className="
              hidden
              md:block

              text-left
            "
          >
            <p
              className="
                text-sm
                font-semibold
              "
            >
              Admin
            </p>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              Super Admin
            </p>
          </div>

          <FiChevronDown className="hidden sm:block" />
        </button>
      </div>
    </header>
  );
}

export default AdminTopbar;

