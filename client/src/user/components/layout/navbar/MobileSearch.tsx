import {
  useState,
} from "react";
import type { FormEvent } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function MobileSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(
    () =>
      new URLSearchParams(location.search).get(
        "search"
      ) ?? ""
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearch = search.trim();
    const searchParams = new URLSearchParams(
      location.search
    );

    searchParams.delete("search");

    const query = searchParams.toString();
    const encodedSearch = trimmedSearch
      ? `search=${encodeURIComponent(trimmedSearch)}`
      : "";
    const nextQuery = [query, encodedSearch]
      .filter(Boolean)
      .join("&");

    navigate(
      `/products${nextQuery ? `?${nextQuery}` : ""}`
    );
  };

  return (
    <div className="border-t border-white/10 p-3 md:hidden">
      <form
        onSubmit={handleSubmit}
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
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="
            w-full
            bg-transparent
            px-3
            py-2
            outline-none
          "
        />
      </form>
    </div>
  );
}

export default MobileSearch;