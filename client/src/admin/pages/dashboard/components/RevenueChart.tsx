{/*

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 180000 },
  { month: "Feb", revenue: 210000 },
  { month: "Mar", revenue: 260000 },
  { month: "Apr", revenue: 240000 },
  { month: "May", revenue: 310000 },
  { month: "Jun", revenue: 380000 },
  { month: "Jul", revenue: 420000 },
];

function RevenueChart() {
  return (
    <div
      className="
        rounded-2xl

        border
        border-white/10

        bg-slate-900

        p-6
      "
    >
      {/* Header *------------------------------------/}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monthly sales performance
          </p>
        </div>

        <div
          className="
            rounded-lg

            bg-violet-500/10

            px-3
            py-1

            text-sm

            text-violet-400
          "
        >
          2026
        </div>
      </div>

      {/* Chart *------------------/}

      <div className="mt-8 h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#1f2937"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              stroke="#9ca3af"
            />

            <YAxis
              stroke="#9ca3af"
              tickFormatter={(value) =>
                `₹${value / 1000}k`
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value: number) => [
                `₹${value.toLocaleString(
                  "en-IN"
                )}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;


*/}