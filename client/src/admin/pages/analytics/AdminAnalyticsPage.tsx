import {
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";

const monthlyRevenue = [
  { month: "Jan", revenue: 82000 },
  { month: "Feb", revenue: 105000 },
  { month: "Mar", revenue: 98000 },
  { month: "Apr", revenue: 126000 },
  { month: "May", revenue: 142000 },
  { month: "Jun", revenue: 158000 },
  { month: "Jul", revenue: 176000 },
  { month: "Aug", revenue: 194000 },
];

const topProducts = [
  {
    name: "Samsung Galaxy S25",
    category: "Electronics",
    sales: 142,
    revenue: "₹1,42,000",
  },
  {
    name: "Wireless Mechanical Keyboard",
    category: "Electronics",
    sales: 118,
    revenue: "₹94,400",
  },
  {
    name: "Premium Hoodie",
    category: "Fashion",
    sales: 96,
    revenue: "₹57,600",
  },
  {
    name: "USB-C Fast Charger",
    category: "Electronics",
    sales: 84,
    revenue: "₹42,000",
  },
  {
    name: "Travel Backpack",
    category: "Fashion",
    sales: 72,
    revenue: "₹36,000",
  },
];

const trafficSources = [
  {
    source: "Direct",
    visitors: 4280,
    percentage: 42,
  },
  {
    source: "Google",
    visitors: 2860,
    percentage: 28,
  },
  {
    source: "Social Media",
    visitors: 1840,
    percentage: 18,
  },
  {
    source: "Referral",
    visitors: 1220,
    percentage: 12,
  },
];

function AdminAnalyticsPage() {
  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.revenue)
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Track your store performance and business growth.
        </p>
      </div>

      {/* DATE FILTER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="text-sm text-gray-400">
          Overview for the last 8 months
        </div>

        <select
          defaultValue="8-months"
          className="
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-4
            py-2.5
            text-sm
            text-gray-300
            outline-none
            focus:border-violet-500
          "
        >
          <option value="7-days">Last 7 days</option>
          <option value="30-days">Last 30 days</option>
          <option value="3-months">Last 3 months</option>
          <option value="8-months">Last 8 months</option>
          <option value="1-year">Last 1 year</option>
        </select>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
              <FiDollarSign size={20} />
            </div>

            <span className="flex items-center gap-1 text-xs text-green-400">
              <FiTrendingUp size={14} />
              12.8%
            </span>

          </div>

          <p className="mt-4 text-sm text-gray-400">
            Total Revenue
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            ₹10.81L
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <FiShoppingBag size={20} />
            </div>

            <span className="flex items-center gap-1 text-xs text-green-400">
              <FiTrendingUp size={14} />
              8.4%
            </span>

          </div>

          <p className="mt-4 text-sm text-gray-400">
            Total Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            1,284
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
              <FiUsers size={20} />
            </div>

            <span className="flex items-center gap-1 text-xs text-green-400">
              <FiTrendingUp size={14} />
              16.2%
            </span>

          </div>

          <p className="mt-4 text-sm text-gray-400">
            New Customers
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            486
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">

          <div className="flex items-center justify-between">

            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
              <FiPackage size={20} />
            </div>

            <span className="flex items-center gap-1 text-xs text-red-400">
              <FiTrendingDown size={14} />
              3.6%
            </span>

          </div>

          <p className="mt-4 text-sm text-gray-400">
            Products Sold
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            2,846
          </p>

        </div>

      </div>

      {/* REVENUE CHART */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">

        <div className="mb-6">

          <h2 className="text-lg font-semibold text-white">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monthly revenue performance.
          </p>

        </div>

        <div className="flex h-72 items-end gap-3 sm:gap-5">

          {monthlyRevenue.map((item) => {

            const height =
              (item.revenue / maxRevenue) * 100;

            return (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >

                <div className="relative flex h-full w-full items-end">

                  <div
                    className="
                      group
                      relative
                      w-full
                      rounded-t-lg
                      bg-violet-600
                      transition
                      hover:bg-violet-500
                    "
                    style={{
                      height: `${height}%`,
                    }}
                  >

                    <div
                      className="
                        absolute
                        bottom-full
                        left-1/2
                        mb-2
                        hidden
                        -translate-x-1/2
                        whitespace-nowrap
                        rounded-lg
                        bg-slate-800
                        px-3
                        py-2
                        text-xs
                        text-white
                        shadow-xl
                        group-hover:block
                      "
                    >
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </div>

                  </div>

                </div>

                <span className="text-xs text-gray-500">
                  {item.month}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* BOTTOM GRID */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* TOP PRODUCTS */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/60">

          <div className="border-b border-white/10 p-6">

            <h2 className="text-lg font-semibold text-white">
              Top Products
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Best performing products.
            </p>

          </div>

          <div className="divide-y divide-white/5">

            {topProducts.map((product, index) => (

              <div
                key={product.name}
                className="
                  flex
                  items-center
                  gap-4
                  px-6
                  py-4
                  transition
                  hover:bg-white/[0.02]
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-violet-500/10
                    text-sm
                    font-semibold
                    text-violet-400
                  "
                >
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate font-medium text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {product.category} • {product.sales} sales
                  </p>

                </div>

                <p className="text-sm font-semibold text-gray-200">
                  {product.revenue}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* TRAFFIC SOURCES */}

        <div className="rounded-2xl border border-white/10 bg-slate-900/60">

          <div className="border-b border-white/10 p-6">

            <h2 className="text-lg font-semibold text-white">
              Traffic Sources
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Where your visitors are coming from.
            </p>

          </div>

          <div className="space-y-6 p-6">

            {trafficSources.map((source) => (

              <div key={source.source}>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm text-gray-300">
                    {source.source}
                  </span>

                  <span className="text-sm font-medium text-white">
                    {source.percentage}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-violet-600
                    "
                    style={{
                      width: `${source.percentage}%`,
                    }}
                  />

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {source.visitors.toLocaleString("en-IN")} visitors
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminAnalyticsPage;