interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  className?: string;
  max?: number;
}

function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  className = "",
  max,
}: ProductQuantitySelectorProps) {
  return (
    <div className={`mt-6 ${className}`}>
      <p className="mb-2 text-sm text-slate-400">
        Quantity
      </p>

      <div className="flex w-fit items-center rounded-xl border border-white/10 bg-[#121826]">
        <button
          type="button"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="px-4 py-2"
        >
          -
        </button>

        <span className="px-4">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={max !== undefined && quantity >= max}
          className="px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductQuantitySelector;
