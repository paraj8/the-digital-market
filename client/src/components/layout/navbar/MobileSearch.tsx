import { FiSearch } from "react-icons/fi";

function MobileSearch() {
  return (
    <div className="border-t border-white/10 p-3 md:hidden">
      <div
        className="
          flex items-center
          rounded-xl
          border border-white/10
          bg-white/5
          px-3
        "
      >
        <FiSearch />

        <input
          type="text"
          placeholder="Search products..."
          className="
            w-full
            bg-transparent
            px-3
            py-2
            outline-none
          "
        />
      </div>
    </div>
  );
}

export default MobileSearch;