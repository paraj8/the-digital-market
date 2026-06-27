import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div
      className="
        flex w-full items-center
        rounded-xl
        border border-white/10
        bg-white/5
        px-4
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
          py-3
          outline-none
        "
      />
    </div>
  );
}

export default SearchBar;