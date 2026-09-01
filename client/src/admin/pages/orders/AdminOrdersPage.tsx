import { useAdminOrders } from "../../../admin/hooks/useAdminOrders";

import OrderStats from "./components/OrderStats";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";

function AdminOrdersPage() {
  const {
    orders,
    pagination,

    page,
    setPage,

    limit,
    setLimit,

    status,
    setStatus,

    search,
    setSearch,

    loading,
    error,

    updateStatus,
    updating,
  } = useAdminOrders();

  // =====================================
  // VIEW ORDER
  // =====================================

  const handleViewOrder = (
    orderId: string
  ) => {
    console.log(
      "View order:",
      orderId
    );

    // Order details will be connected later.
  };

  // =====================================
  // LIMIT CHANGE
  // =====================================

  const handleLimitChange = (
    value: number
  ) => {
    setPage(1);
    setLimit(value);
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <div className="space-y-6">

      {/* =====================================
          STATS
      ===================================== */}

      <OrderStats
        orders={orders}
      />

      {/* =====================================
          FILTERS
      ===================================== */}

      <OrderFilters
        search={search}
        status={status}
        onSearchChange={(value) => {
          setPage(1);
          setSearch(value);
        }}
        onStatusChange={(value) => {
          setPage(1);
          setStatus(value);
        }}
      />

      {/* =====================================
          LOADING
      ===================================== */}

      {loading && (
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-900/60
            p-10
            text-center
            text-sm
            text-gray-400
          "
        >
          Loading orders...
        </div>
      )}

      {/* =====================================
          ERROR
      ===================================== */}

      {!loading && error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            p-6
            text-center
            text-sm
            text-red-400
          "
        >
          Failed to load orders.
        </div>
      )}

      {/* =====================================
          ORDERS TABLE
      ===================================== */}

      {!loading && !error && (
        <OrdersTable
          orders={orders}
          onView={handleViewOrder}
          onUpdateStatus={(
            orderId,
            orderStatus
          ) =>
            updateStatus({
              orderId,
              orderStatus,
            })
          }
          updating={updating}
        />
      )}

      {/* =====================================
          PAGINATION
      ===================================== */}

      {!loading &&
        !error &&
        pagination.totalOrders > 0 && (
          <div
            className="
              flex
              flex-col
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-slate-900/60
              px-5
              py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              <p className="text-sm text-gray-400">
                Page{" "}
                {pagination.currentPage}{" "}
                of{" "}
                {pagination.totalPages}
              </p>

              <p className="text-sm text-gray-500">
                {pagination.totalOrders} orders
              </p>

            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              {/* LIMIT */}

              <div className="flex items-center gap-2">

                <span className="text-sm text-gray-500">
                  Show
                </span>

                <select
                  value={limit}
                  onChange={(e) =>
                    handleLimitChange(
                      Number(e.target.value)
                    )
                  }
                  className="
                    rounded-lg
                    border
                    border-white/10
                    bg-slate-800/70
                    px-3
                    py-2
                    text-sm
                    text-gray-300
                    outline-none
                    focus:border-violet-500
                  "
                >
                  <option value={10}>
                    10
                  </option>

                  <option value={20}>
                    20
                  </option>

                  <option value={50}>
                    50
                  </option>

                  <option value={100}>
                    100
                  </option>
                </select>

              </div>

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
                className="
                  rounded-lg
                  border
                  border-white/10
                  px-4
                  py-2
                  text-sm
                  text-gray-300
                  transition
                  hover:bg-white/5
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Previous
              </button>

              {/* NEXT */}

              <button
                type="button"
                disabled={
                  page >=
                  pagination.totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
                className="
                  rounded-lg
                  border
                  border-white/10
                  px-4
                  py-2
                  text-sm
                  text-gray-300
                  transition
                  hover:bg-white/5
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
              </button>

            </div>
          </div>
        )}

    </div>
  );
}

export default AdminOrdersPage;
