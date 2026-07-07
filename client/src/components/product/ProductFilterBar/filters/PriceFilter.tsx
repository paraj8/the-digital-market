import { useEffect, useRef, useState } from "react";

interface PriceValue {
  minPrice?: number;
  maxPrice?: number;
}

interface PriceFilterProps {
  value: PriceValue;
  onApply: (value: PriceValue) => void;
}

function PriceFilter({
  value,
  onApply,
}: PriceFilterProps) {
  const [open, setOpen] = useState(false);

  const [minPrice, setMinPrice] = useState(
    value.minPrice?.toString() ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    value.maxPrice?.toString() ?? ""
  );

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

  const handleOpen = () => {
    if (!open) {
      setMinPrice(
        value.minPrice?.toString() ?? ""
      );

      setMaxPrice(
        value.maxPrice?.toString() ?? ""
      );
    }

    setOpen((prev) => !prev);
  };

  const handleApply = () => {
    onApply({
      minPrice: minPrice
        ? Number(minPrice)
        : undefined,

      maxPrice: maxPrice
        ? Number(maxPrice)
        : undefined,
    });

    setOpen(false);
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");

    onApply({
      minPrice: undefined,
      maxPrice: undefined,
    });

    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={handleOpen}
        className="
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
        Price ▼
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50
            mt-2
            w-72
            rounded-2xl
            border border-white/10
            bg-[#121826]
            shadow-2xl
          "
        >
          <div className="space-y-4 p-4">
            <div>
              <label className="mb-1 block text-xs text-slate-400">
                Minimum Price
              </label>

              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value
                  )
                }
                placeholder="0"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-[#1b2436]
                  px-3
                  py-2
                  outline-none
                "
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-400">
                Maximum Price
              </label>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value
                  )
                }
                placeholder="10000"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-[#1b2436]
                  px-3
                  py-2
                  outline-none
                "
              />
            </div>
          </div>

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
              onClick={handleClear}
              className="
                rounded-lg
                border border-white/10
                px-3
                py-2
                text-sm
                hover:bg-white/5
              "
            >
              Clear
            </button>

            <button
              onClick={handleApply}
              className="
                rounded-lg
                bg-violet-600
                px-4
                py-2
                text-sm
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

export default PriceFilter;