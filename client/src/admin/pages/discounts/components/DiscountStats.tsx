import { FiClock, FiTag, FiTrendingUp, FiLayers } from "react-icons/fi";

interface DiscountStatsProps {
  active: number;
  scheduled: number;
  expired: number;
  total: number;
}

function DiscountStats({ active, scheduled, expired, total }: DiscountStatsProps) {
  const stats = [
    { label: "Active Discounts", value: active, icon: FiTrendingUp, color: "text-green-400" },
    { label: "Scheduled Discounts", value: scheduled, icon: FiClock, color: "text-blue-400" },
    { label: "Expired Discounts", value: expired, icon: FiTag, color: "text-gray-400" },
    { label: "Total Discounts", value: total, icon: FiLayers, color: "text-violet-400" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{label}</p>
            <Icon className={color} size={18} />
          </div>
          <p className={`mt-3 text-2xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}

export default DiscountStats;
