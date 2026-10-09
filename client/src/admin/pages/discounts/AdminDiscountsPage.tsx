import { useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { FiPlus, FiTag } from "react-icons/fi";
import { toast } from "react-toastify";

import type { Discount, DiscountPayload } from "../../../shared/types/discount";
import {
  useCreateDiscount,
  useDeleteDiscount,
  useDiscounts,
  useUpdateDiscount,
} from "../../hooks/useDiscounts";
import AdminDiscountsMobile from "./AdminDiscountsMobile";
import DiscountDeleteModal from "./components/DiscountDeleteModal";
import DiscountFilters, { type DiscountStatusFilter } from "./components/DiscountFilters";
import DiscountFormModal from "./components/DiscountFormModal";
import DiscountStats from "./components/DiscountStats";
import DiscountsTable from "./components/DiscountsTable";
import { getDiscountStatus } from "./discountUtils";

function AdminDiscountsPage() {
  const { data: discounts = [], isLoading, isError, error } = useDiscounts();
  const createMutation = useCreateDiscount();
  const updateMutation = useUpdateDiscount();
  const deleteMutation = useDeleteDiscount();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<DiscountStatusFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [discountToDelete, setDiscountToDelete] = useState<Discount | null>(null);

  const stats = useMemo(() => {
    const statuses = discounts.map(getDiscountStatus);
    return {
      active: statuses.filter((value) => value === "Active").length,
      scheduled: statuses.filter((value) => value === "Scheduled").length,
      expired: statuses.filter((value) => value === "Expired").length,
      total: discounts.length,
    };
  }, [discounts]);

  const filteredDiscounts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return discounts.filter((discount) => {
      const matchesSearch =
        !normalizedSearch ||
        discount.name.toLowerCase().includes(normalizedSearch) ||
        discount.description.toLowerCase().includes(normalizedSearch);
      const matchesStatus = status === "all" || getDiscountStatus(discount) === status;
      return matchesSearch && matchesStatus;
    });
  }, [discounts, search, status]);

  const closeForm = () => {
    if (createMutation.isPending || updateMutation.isPending) return;
    setFormOpen(false);
    setSelectedDiscount(null);
  };

  const handleFormSubmit = async (payload: DiscountPayload) => {
    try {
      if (selectedDiscount) {
        await updateMutation.mutateAsync({ id: selectedDiscount._id, data: payload });
        toast.success("Discount updated successfully");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Discount created successfully");
      }
      closeForm();
    } catch (submitError: unknown) {
      toast.error(
        isAxiosError(submitError)
          ? submitError.response?.data?.message || "Failed to save discount."
          : "Failed to save discount."
      );
    }
  };

  const handleToggle = async (discount: Discount) => {
    try {
      await updateMutation.mutateAsync({
        id: discount._id,
        data: { isActive: !discount.isActive },
      });
      toast.success(discount.isActive ? "Discount deactivated" : "Discount activated");
    } catch (toggleError: unknown) {
      toast.error(
        isAxiosError(toggleError)
          ? toggleError.response?.data?.message || "Failed to update discount."
          : "Failed to update discount."
      );
    }
  };

  const confirmDelete = async () => {
    if (!discountToDelete) return;
    try {
      await deleteMutation.mutateAsync(discountToDelete._id);
      toast.success("Discount deleted successfully");
      setDiscountToDelete(null);
    } catch (deleteError: unknown) {
      toast.error(
        isAxiosError(deleteError)
          ? deleteError.response?.data?.message || "Failed to delete discount."
          : "Failed to delete discount."
      );
    }
  };

  const openCreate = () => {
    setSelectedDiscount(null);
    setFormOpen(true);
  };

  const openEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Discounts</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage additional promotional discounts for your store.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <FiPlus size={18} />
          Create Discount
        </button>
      </header>

      <DiscountStats {...stats} />

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error instanceof Error ? error.message : "Failed to load discounts."}
        </div>
      )}

      {discounts.length === 0 && !isLoading && !isError ? (
        <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-900/40 px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
            <FiTag size={26} />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-white">No additional discounts yet.</h2>
          <p className="mt-2 max-w-md text-sm text-gray-400">
            Create a promotional discount to get started. Coupon codes remain managed separately in Coupons.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden md:block">
            <DiscountFilters search={search} status={status} onSearchChange={setSearch} onStatusChange={setStatus} />
            <div className="mt-4">
              <DiscountsTable
                discounts={filteredDiscounts}
                isLoading={isLoading}
                onEdit={openEdit}
                onDelete={setDiscountToDelete}
                onToggle={handleToggle}
              />
            </div>
          </div>
          <div className="md:hidden">
            <AdminDiscountsMobile
              discounts={filteredDiscounts}
              isLoading={isLoading}
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
              onEdit={openEdit}
              onDelete={setDiscountToDelete}
              onToggle={handleToggle}
            />
          </div>
        </>
      )}

      {formOpen && (
        <DiscountFormModal
          key={selectedDiscount?._id ?? "new-discount"}
          discount={selectedDiscount}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
        />
      )}
      <DiscountDeleteModal
        discount={discountToDelete}
        isDeleting={deleteMutation.isPending}
        onClose={() => {
          if (!deleteMutation.isPending) setDiscountToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AdminDiscountsPage;
