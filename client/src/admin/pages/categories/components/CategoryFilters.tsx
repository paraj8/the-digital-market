import { FiChevronDown, FiSearch } from "react-icons/fi";

interface CategoryFiltersProps {
  search: string;
  status: "all" | "active" | "inactive";
  onSearchChange: (value: string) => void;
  onStatusChange: (
    value: "all" | "active" | "inactive"
  ) => void;
}

function CategoryFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: CategoryFiltersProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <FiSearch
            size={18}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search categories..."
            className="
              w-full rounded-xl border border-white/10
              bg-slate-800/70 py-2.5 pl-10 pr-4
              text-sm text-white outline-none
              placeholder:text-gray-500
              focus:border-violet-500
            "
          />
        </div>

        <div className="relative">
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as
                  | "all"
                  | "active"
                  | "inactive"
              )
            }
            className="
              appearance-none rounded-xl
              border border-white/10
              bg-slate-800/70
              px-4 py-2.5 pr-10
              text-sm text-gray-300
              outline-none
              focus:border-violet-500
            "
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <FiChevronDown
            size={15}
            className="
              pointer-events-none
              absolute right-3 top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryFilters;