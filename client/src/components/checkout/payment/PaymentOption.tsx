import type { PaymentMethod } from "../../../types/checkout";

interface PaymentOptionProps {
  title: string;
  description: string;

  value: PaymentMethod;

  selected: boolean;

  onSelect: (value: PaymentMethod) => void;
}

function PaymentOption({
  title,
  description,
  value,
  selected,
  onSelect,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`
        w-full
        rounded-2xl
        border
        p-4
        text-left
        transition

        ${
          selected
            ? "border-violet-500 bg-violet-500/10"
            : "border-white/10 bg-[#121826] hover:border-violet-400"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`
            h-5
            w-5
            rounded-full
            border-2

            ${
              selected
                ? "border-violet-500 bg-violet-500"
                : "border-slate-500"
            }
          `}
        />
      </div>
    </button>
  );
}

export default PaymentOption;