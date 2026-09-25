interface ProductStockProps {
  stock: number;
  className?: string;
}

function ProductStock({
  stock,
  className = "",
}: ProductStockProps) {
  return (
    <div className={`mt-6 ${className}`}>
      {stock > 0 ? (
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          In Stock ({stock})
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
