interface ProductStatsProps {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

function ProductStats({
  total,
  active,
  lowStock,
  outOfStock,
}: ProductStatsProps) {
  const stats = [
    {
      label: "Total Products",
      value: total,
      suffix: "+12 this month",
      suffixClass: "text-green-400",
    },
    {
      label: "Active Products",
      value: active,
      valueClass: "text-green-400",
    },
    {
      label: "Low Stock",
      value: lowStock,
      valueClass: "text-yellow-400",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      valueClass: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-2xl
            border border-white/10
            bg-slate-900/60
            p-5
          "
        >
          <p className="text-sm text-gray-400">
            {stat.label}
          </p>

          <p
            className={`
              mt-2
              text-2xl
              font-bold
              ${stat.valueClass ?? "text-white"}
            `}
          >
            {stat.value}
          </p>

          {stat.suffix && (
            <p
              className={`
                mt-1
                text-xs
                ${stat.suffixClass ?? "text-gray-400"}
              `}
            >
              {stat.suffix}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductStats;