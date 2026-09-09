import {
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
} from "react-icons/fi";

interface MobileProductStatsProps {
  total: number;
  active: number;
  lowStock: number;
  outOfStock: number;
}

function MobileProductStats({
  total,
  active,
  lowStock,
  outOfStock,
}: MobileProductStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">

      {/* TOTAL */}

      <div
        className="
          rounded-2xl
          border
          border-white/10
          bg-slate-900/70
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <FiPackage
            size={15}
            className="text-violet-400"
          />

          <p className="text-xs text-gray-500">
            Total Products
          </p>
        </div>

        <p
          className="
            mt-2
            text-xl
            font-bold
            text-white
          "
        >
          {total}
        </p>
      </div>

      {/* ACTIVE */}

      <div
        className="
          rounded-2xl
          border
          border-emerald-500/10
          bg-slate-900/70
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <FiCheckCircle
            size={15}
            className="text-emerald-400"
          />

          <p className="text-xs text-gray-500">
            Active
          </p>
        </div>

        <p
          className="
            mt-2
            text-xl
            font-bold
            text-emerald-400
          "
        >
          {active}
        </p>
      </div>

      {/* LOW STOCK */}

      <div
        className="
          rounded-2xl
          border
          border-amber-500/10
          bg-slate-900/70
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <FiAlertCircle
            size={15}
            className="text-amber-400"
          />

          <p className="text-xs text-gray-500">
            Low Stock
          </p>
        </div>

        <p
          className="
            mt-2
            text-xl
            font-bold
            text-amber-400
          "
        >
          {lowStock}
        </p>
      </div>

      {/* OUT OF STOCK */}

      <div
        className="
          rounded-2xl
          border
          border-red-500/10
          bg-slate-900/70
          p-4
        "
      >
        <div className="flex items-center gap-2">
          <FiXCircle
            size={15}
            className="text-red-400"
          />

          <p className="text-xs text-gray-500">
            Out of Stock
          </p>
        </div>

        <p
          className="
            mt-2
            text-xl
            font-bold
            text-red-400
          "
        >
          {outOfStock}
        </p>
      </div>

    </div>
  );
}

export default MobileProductStats;