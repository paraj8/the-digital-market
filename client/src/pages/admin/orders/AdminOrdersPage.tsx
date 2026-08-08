import { useState } from "react";

import { useAdminOrders } from "../../../hooks/admin/useAdminOrders";

import OrderStats from "./components/OrderStats";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";

function AdminOrdersPage() {
  const {
    orders,
    loading,
    error,
  } = useAdminOrders();

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // Search + status filtering
  const filteredOrders = orders.filter(
    (order) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        order._id
          .toLowerCase()
          .includes(searchValue) ||
        order.user.fullName
          .toLowerCase()
          .includes(searchValue) ||
        order.user.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  // View order
  const handleViewOrder = (
    orderId: string
  ) => {
    console.log(
      "View order:",
      orderId
    );

    // Order details will be connected later.
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          Orders
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-gray-400
          "
        >
          Manage and track customer
          orders.
        </p>
      </div>

      {/* Stats */}

      <OrderStats
        orders={orders}
      />

      {/* Filters */}

      <OrderFilters
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Loading */}

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

      {/* Error */}

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

      {/* Orders Table */}

      {!loading && !error && (
        <OrdersTable
          orders={filteredOrders}
          onView={handleViewOrder}
        />
      )}

    </div>
  );
}

export default AdminOrdersPage;

