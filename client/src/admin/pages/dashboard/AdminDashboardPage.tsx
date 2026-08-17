function AdminDashboardPage() {
  return (
    <div className="space-y-8">
    
      {/* Stats */}

      <div
        className="
          grid
          gap-6

          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {[
          {
            title: "Total Revenue",
            value: "₹4,82,500",
          },
          {
            title: "Orders",
            value: "1,245",
          },
          {
            title: "Customers",
            value: "824",
          },
          {
            title: "Products",
            value: "152",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="
              rounded-2xl

              border
              border-white/10

              bg-slate-900

              p-6
            "
          >
            <p
              className="
                text-sm
                text-gray-400
              "
            >
              {card.title}
            </p>

            <h2
              className="
                mt-3

                text-3xl

                font-bold

                text-violet-400
              "
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div
        className="
          grid
          gap-6

          xl:grid-cols-[2fr_1fr]
        "
      >
        {/* Revenue */}

        <div
          className="
            rounded-2xl

            border
            border-white/10

            bg-slate-900

            p-6

            h-[380px]
          "
        >
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            Revenue Overview
          </h2>

          <div
            className="
              mt-6

              flex
              items-center
              justify-center

              h-[280px]

              rounded-xl

              border
              border-dashed
              border-white/10

              text-gray-500
            "
          >
            Revenue Chart
          </div>
        </div>

        {/* Low Stock */}

        <div
          className="
            rounded-2xl

            border
            border-white/10

            bg-slate-900

            p-6

            h-[380px]
          "
        >
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            Low Stock
          </h2>

          <div className="mt-6 space-y-4">
            {[
              "Wireless Mouse",
              "Keyboard",
              "Samsung S25",
              "Boat Airdopes",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  justify-between

                  rounded-xl

                  bg-slate-800

                  p-3
                "
              >
                <span>{item}</span>

                <span className="text-red-400">
                  3 Left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}

      <div
        className="
          rounded-2xl

          border
          border-white/10

          bg-slate-900

          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Recent Orders
        </h2>

        <div
          className="
            mt-6

            overflow-x-auto
          "
        >
          <table className="w-full">
            <thead>
              <tr
                className="
                  border-b
                  border-white/10
                "
              >
                <th className="py-3 text-left">
                  Order ID
                </th>

                <th className="text-left">
                  Customer
                </th>

                <th className="text-left">
                  Amount
                </th>

                <th className="text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr
                  key={i}
                  className="
                    border-b
                    border-white/5
                  "
                >
                  <td className="py-4">
                    #ORD-100{i}
                  </td>

                  <td>
                    Customer {i}
                  </td>

                  <td>
                    ₹12,499
                  </td>

                  <td>
                    <span
                      className="
                        rounded-full

                        bg-green-500/20

                        px-3
                        py-1

                        text-sm

                        text-green-400
                      "
                    >
                      Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;