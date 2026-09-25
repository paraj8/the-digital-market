import { useEffect, useRef, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { FiChevronDown } from "react-icons/fi";


export interface PriceValue {
  minPrice?: number;
  maxPrice?: number;
}

interface PriceFilterProps {
  min: number;
  max: number;

  value: PriceValue;

  onApply: (value: PriceValue) => void;
}

const STEP = 10;

function PriceFilter({
  min,
  max,
  value,
  onApply,
}: PriceFilterProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const [values, setValues] = useState([
    value.minPrice ?? min,
    value.maxPrice ?? max,
  ]);

    useEffect(() => {
    const handleOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
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
      setValues([
        value.minPrice ?? min,
        value.maxPrice ?? max,
      ]);
    }

    setOpen((prev) => !prev);
  };

  const handleApply = () => {
    onApply({
      minPrice: values[0],
      maxPrice: values[1],
    });

    setOpen(false);
  };

  const handleClear = () => {
    setValues([min, max]);

    onApply({
      minPrice: undefined,
      maxPrice: undefined,
    });

    setOpen(false);
  };

  const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

    return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={handleOpen}
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
        {value.minPrice !== undefined ||
        value.maxPrice !== undefined
          ? `${formatPrice(values[0])} - ${formatPrice(values[1])}`
          : "Price"}
      </span>

        <FiChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

{/*============ Dropdown ===============*/}
            {open && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50

            mt-2
            w-80

            rounded-2xl
            border border-white/10

            bg-[#121826]

            p-5

            shadow-2xl
          "
        >

          {/* Header */}

          <div className="mb-5">
            <h3 className="text-sm font-semibold">
              Price Range
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Drag both handles to choose your budget.
            </p>
          </div>

          {/* Current Values */}

          <div className="mb-6 flex items-center justify-between">
            <div className="rounded-lg bg-[#1b2436] px-3 py-2 text-sm font-medium">
              {formatPrice(values[0])}
            </div>

            <span className="text-slate-500">—</span>

            <div className="rounded-lg bg-[#1b2436] px-3 py-2 text-sm font-medium">
              {formatPrice(values[1])}
            </div>
          </div>

          {/* Slider */}

          <div className="px-2 py-4">
            <Range
              values={values}
              step={STEP}
              min={min}
              max={max}
              allowOverlap={false}
              onChange={(newValues) => setValues(newValues)}
              renderTrack={({ props, children }) => (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "36px",
                    alignItems: "center",
                  }}
                >
                  <div
                    ref={props.ref}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      height: "8px",
                      width: "100%",
                      borderRadius: "999px",
                      background: getTrackBackground({
                        values,
                        colors: [
                          "#334155",
                          "#7c3aed",
                          "#334155",
                        ],
                        min,
                        max,
                      }),
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, index }) => (
                <div
                  {...props}
                  key={index}
                  className="
                    h-5
                    w-5

                    rounded-full

                    border-2
                    border-violet-500

                    bg-white

                    shadow-lg

                    cursor-pointer

                    transition

                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    focus:ring-offset-2
                    focus:ring-offset-[#121826]
                  "
                />
              )}
            />
          </div>

          {/* Selected Range */}

          <div className="mt-5 rounded-xl bg-[#1b2436] p-3 text-center">
            <p className="text-xs text-slate-400">
              Selected Range
            </p>

              <p className="mt-1 text-sm font-semibold">
                {formatPrice(values[0])} — {formatPrice(values[1])}
              </p>
          </div>


          {/* Footer */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between

              border-t
              border-white/10

              pt-4
            "
          >
            <button
              type="button"
              onClick={handleClear}
              className="
                rounded-lg
                border
                border-white/10

                px-4
                py-2

                text-sm

                transition

                hover:bg-white/5
              "
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="
                rounded-lg
                bg-violet-600
                px-4
                py-2
                text-sm
                font-medium
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

export default PriceFilter;

