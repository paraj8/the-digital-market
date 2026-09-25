import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FiChevronDown } from "react-icons/fi";

interface FilterDropdownProps<T> {
  title: string;

  items: T[];

  selected: string[];

  getLabel: (item: T) => string;

  getValue: (item: T) => string;

  onApply: (values: string[]) => void;

  multiSelect?: boolean;

  searchable?: boolean;
}

function FilterDropdown<T>({
  title,
  items,
  selected,
  getLabel,
  getValue,
  onApply,
  multiSelect = true,
  searchable = true,
}: FilterDropdownProps<T>) {
  const [open, setOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [tempSelected, setTempSelected] =
    useState<string[]>(selected);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (
      e: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  const filteredItems =
    useMemo(() => {
      if (!search)
        return items;

      return items.filter((item) =>
        getLabel(item)
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [
      items,
      search,
      getLabel,
    ]);

  const toggleValue = (
    value: string
  ) => {
    if (!multiSelect) {
      setTempSelected([value]);
      return;
    }

    if (
      tempSelected.includes(value)
    ) {
      setTempSelected(
        tempSelected.filter(
          (v) => v !== value
        )
      );
    } else {
      setTempSelected([
        ...tempSelected,
        value,
      ]);
    }
  };

return (
  <div
    ref={dropdownRef}
    className="relative"
  >
    {/* Trigger */}

<button
  onClick={() => {
    if (!open) {
      setTempSelected(selected);
      setSearch("");
    }

    setOpen(!open);
  }}
  className="
    flex
    items-center
    gap-2

    whitespace-nowrap

    rounded-xl
    border border-white/10

    bg-[#121826]

    px-4
    py-2

    text-sm

    transition

    hover:border-violet-500
  "
>
  <span>
    {title}
    {selected.length > 0 &&
      ` (${selected.length})`}
  </span>

  <FiChevronDown
    className={`transition ${
      open ? "rotate-180" : ""
    }`}
  />
</button>

    {open && (
      <div
        className="
          absolute
          left-0
          top-full
          mt-2
          w-72
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-[#121826]
          shadow-2xl
          z-50
        "
      >
        {/* Search */}

        {searchable && (
          <div className="border-b border-white/10 p-3">
            <input
              type="text"
              placeholder={`Search ${title}`}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#1b2436]
                px-3
                py-2
                text-sm
                outline-none
              "
            />
          </div>
        )}

        {/* Options */}

        <div
          className="
            max-h-72
            overflow-y-auto
          "
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              No options found
            </div>
          ) : (
            filteredItems.map((item) => {
              const value = getValue(item);

              const label = getLabel(item);

              const checked =
                tempSelected.includes(value);

              return (
                <button
                  key={value}
                  onClick={() =>
                    toggleValue(value)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-white/5
                  "
                >
                  {multiSelect ? (
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                    />
                  ) : (
                    <input
                      type="radio"
                      checked={checked}
                      readOnly
                    />
                  )}

                  <span>{label}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t border-white/10
            p-3
          "
        >
          <button
            onClick={() => {
              setSearch("");
              setTempSelected([]);
            }}
            className="
              rounded-lg
              border border-white/10
              px-3
              py-2
              text-sm
              transition
              hover:bg-white/5
            "
          >
            Clear
          </button>

          <button
            onClick={() => {
              onApply(tempSelected);
              setOpen(false);
            }}
            className="
              rounded-lg
              bg-violet-600
              px-4
              py-2
              text-sm
              transition
              hover:bg-violet-500
            "
          >
            Apply
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default FilterDropdown;