interface ProductResultsInfoProps {
  page: number;
  limit: number;
  total: number;
  currentCount: number;
}

function ProductResultsInfo({
  page,
  limit,
  total,
  currentCount,
}: ProductResultsInfoProps) {
  if (total === 0) {
    return (
      <div className="mb-5 text-sm text-slate-400">
        No products found.
      </div>
    );
  }

  const start =
    (page - 1) * limit + 1;

  const end =
    start + currentCount - 1;

  return (
    <div
      className="
        mb-5

        flex
        items-center
        justify-between

        text-sm
        text-slate-400
      "
    >
      <span>
        Showing{" "}
        <span className="font-medium text-white">
          {start}
        </span>
        –
        <span className="font-medium text-white">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-white">
          {total}
        </span>{" "}
        products
      </span>
    </div>
  );
}

export default ProductResultsInfo;