interface ProductStockProps {
  stock: number;
  className?: string;
  available?: boolean;
  showCount?: boolean;
  availableLabel?: string;
}

function ProductStock({
  stock,
  className = "",
  available = stock > 0,
  showCount = true,
  availableLabel = "In Stock",
}: ProductStockProps) {
  return (
    <div className={`mt-6 ${className}`}>
      {available ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          {showCount ? `${availableLabel} (${stock})` : availableLabel}
        </div>
      ) : (
        <span className="text-red-400">
          Out of Stock
        </span>
      )}
    </div>
  );
}

export default ProductStock;
