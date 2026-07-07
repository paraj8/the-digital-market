import React from "react";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          rounded-xl
          border border-white/10
          bg-[#121826]
          px-4
          py-2
          text-sm
          transition
          hover:border-violet-500
          hover:bg-white/5
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        ← Previous
      </button>

      {/* Page Numbers */}

      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`
            h-10
            w-10
            rounded-xl
            border
            text-sm
            transition

            ${
              number === page
                ? "border-violet-500 bg-violet-600 text-white"
                : "border-white/10 bg-[#121826] hover:border-violet-500 hover:bg-white/5"
            }
          `}
        >
          {number}
        </button>
      ))}

      {/* Next */}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          rounded-xl
          border border-white/10
          bg-[#121826]
          px-4
          py-2
          text-sm
          transition
          hover:border-violet-500
          hover:bg-white/5
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next →
      </button>
    </div>
  );
}

export default ProductPagination;