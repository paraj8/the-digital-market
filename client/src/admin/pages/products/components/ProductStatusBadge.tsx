interface ProductStatusBadgeProps {
  stock: number;
  isActive: boolean;
}

function ProductStatusBadge({
  stock,
  isActive,
}: ProductStatusBadgeProps) {
  let status = "Active";
  let styles =
    "border-green-500/20 bg-green-500/10 text-green-400";

  if (!isActive) {
    status = "Inactive";
    styles =
      "border-gray-500/20 bg-gray-500/10 text-gray-400";
  } else if (stock === 0) {
    status = "Out of Stock";
    styles =
      "border-red-500/20 bg-red-500/10 text-red-400";
  } else if (stock < 10) {
    status = "Low Stock";
    styles =
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${styles}
      `}
    >
      {status}
    </span>
  );
}

export default ProductStatusBadge;