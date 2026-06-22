import {
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        className="
          hidden sm:flex
          h-10 w-10
          items-center
          justify-center
          rounded-xl
          hover:bg-white/10
          transition
        "
      >
        <FiHeart size={20} />
      </button>

      <button
        className="
          relative
          flex h-10 w-10
          items-center
          justify-center
          rounded-xl
          hover:bg-white/10
          transition
        "
      >
        <FiShoppingCart size={20} />

        <span
          className="
            absolute
            -right-1
            -top-1
            flex h-5 w-5
            items-center
            justify-center
            rounded-full
            bg-violet-600
            text-xs
          "
        >
          0
        </span>
      </button>

      <button
        className="
          flex h-10 w-10
          items-center
          justify-center
          rounded-xl
          hover:bg-white/10
          transition
        "
      >
        <FiUser size={20} />
      </button>
    </div>
  );
}

export default NavActions;