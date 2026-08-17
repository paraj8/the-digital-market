import {
  FiSearch,
  FiBell,
  FiMail,
  FiChevronDown,
} from "react-icons/fi";

function AdminTopbar() {
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

        px-8
      "
    >
      {/* Left */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            relative
            w-[420px]
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
          gap-4
        "
      >
        {/* Notifications */}

        <button
          className="
            relative

            h-11
            w-11

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
          className="
            relative

            h-11
            w-11

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
          className="
            ml-2

            flex
            items-center
            gap-3

            rounded-xl

            border
            border-white/10

            bg-slate-900

            px-4
            py-2

            transition

            hover:border-violet-500
          "
        >
          <img
            src="https://ui-avatars.com/api/?name=Admin"
            alt="Admin"
            className="
              h-10
              w-10

              rounded-full
            "
          />

          <div
            className="
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

          <FiChevronDown />
        </button>
      </div>
    </header>
  );
}

export default AdminTopbar;