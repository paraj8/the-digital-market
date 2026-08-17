interface CategoryStatusBadgeProps {
  isActive: boolean;
}

function CategoryStatusBadge({
  isActive,
}: CategoryStatusBadgeProps) {
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
        ${
          isActive
            ? "border-green-500/20 bg-green-500/10 text-green-400"
            : "border-gray-500/20 bg-gray-500/10 text-gray-400"
        }
      `}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

export default CategoryStatusBadge;