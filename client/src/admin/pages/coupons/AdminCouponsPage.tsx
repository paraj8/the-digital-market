import { useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

import type { Coupon } from "../../../shared/types/coupon";
import { useAdminCoupon, useAdminCoupons, useCreateAdminCoupon, useDeleteAdminCoupon, useUpdateAdminCoupon } from "../../hooks/useAdminCoupons";
import AdminCouponsDesktop from "./components/desktop/AdminCouponsDesktop";
import AdminCouponsMobile from "./components/mobile/AdminCouponsMobile";
import CouponDetailsModal from "./components/CouponDetailsModal";
import CouponFormModal from "./components/CouponFormModal";
import DeleteCouponModal from "./components/DeleteCouponModal";
import {
  getCouponStatus,
  type CouponDiscountTypeFilter,
  type CouponFormMode,
  type CouponFormValues,
  type CouponStatusFilter,
} from "./couponUtils";

function AdminCouponsPage() {
  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useAdminCoupons();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CouponStatusFilter>("all");
  const [discountTypeFilter, setDiscountTypeFilter] = useState<CouponDiscountTypeFilter>("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<CouponFormMode>("create");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewCouponId, setViewCouponId] = useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const createCouponMutation = useCreateAdminCoupon();
  const updateCouponMutation = useUpdateAdminCoupon();
  const deleteCouponMutation = useDeleteAdminCoupon();

  const { data: viewedCoupon, isLoading: isDetailsLoading } = useAdminCoupon(viewCouponId);

  const filteredCoupons = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return coupons.filter((coupon) => {
      const matchesSearch =
        !normalizedSearch ||
        coupon.code.toLowerCase().includes(normalizedSearch) ||
        coupon.description.toLowerCase().includes(normalizedSearch);

      const status = getCouponStatus(coupon).toLowerCase().replace(/ /g, "-");
      const matchesStatus =
        statusFilter === "all" || status === statusFilter;

      const matchesDiscountType =
        discountTypeFilter === "all" || coupon.discountType === discountTypeFilter;

      return matchesSearch && matchesStatus && matchesDiscountType;
    });
  }, [coupons, discountTypeFilter, search, statusFilter]);

  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleViewCoupon = (coupon: Coupon) => {
    setViewCouponId(coupon._id);
    setIsDetailsOpen(true);
  };

  const handleCloseForm = () => {
    if (createCouponMutation.isPending || updateCouponMutation.isPending) {
      return;
    }

    setIsFormOpen(false);
    setSelectedCoupon(null);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setViewCouponId(null);
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    if (deleteCouponMutation.isPending) {
      return;
    }

    setIsDeleteOpen(false);
    setCouponToDelete(null);
  };

  const handleFormSubmit = async (values: CouponFormValues) => {
    try {
      if (formMode === "create") {
        await createCouponMutation.mutateAsync(values);
        toast.success("Coupon created successfully");
      } else if (selectedCoupon) {
        await updateCouponMutation.mutateAsync({
          id: selectedCoupon._id,
          data: values,
        });
        toast.success("Coupon updated successfully");
      }

      handleCloseForm();
    } catch (submissionError: unknown) {
      const message = isAxiosError(submissionError)
        ? submissionError.response?.data?.message || "Failed to save coupon."
        : "Failed to save coupon.";

      toast.error(message);
    }
  };

  const handleToggleCouponActive = async (coupon: Coupon) => {
    try {
      await updateCouponMutation.mutateAsync({
        id: coupon._id,
        data: {
          isActive: !coupon.isActive,
        },
      });

      toast.success(
        coupon.isActive ? "Coupon deactivated successfully" : "Coupon activated successfully"
      );
    } catch (toggleError: unknown) {
      const message = isAxiosError(toggleError)
        ? toggleError.response?.data?.message || "Failed to update coupon status."
        : "Failed to update coupon status.";

      toast.error(message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!couponToDelete) {
      return;
    }

    try {
      await deleteCouponMutation.mutateAsync(couponToDelete._id);
      toast.success("Coupon deleted successfully");
      setIsDeleteOpen(false);
      setCouponToDelete(null);
    } catch (deleteError: unknown) {
      const message = isAxiosError(deleteError)
        ? deleteError.response?.data?.message || "Failed to delete coupon."
        : "Failed to delete coupon.";

      toast.error(message);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDiscountTypeFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <AdminCouponsDesktop
          coupons={filteredCoupons}
          isLoading={isLoading}
          isError={isError}
          search={search}
          status={statusFilter}
          discountType={discountTypeFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onDiscountTypeChange={setDiscountTypeFilter}
          onClearFilters={handleClearFilters}
          onAdd={handleAddCoupon}
          onView={handleViewCoupon}
          onEdit={handleEditCoupon}
          onToggleActive={handleToggleCouponActive}
          onDelete={handleDeleteCoupon}
        />
      </div>

      <div className="block md:hidden">
        <AdminCouponsMobile
          coupons={filteredCoupons}
          isLoading={isLoading}
          isError={isError}
          search={search}
          status={statusFilter}
          discountType={discountTypeFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onDiscountTypeChange={setDiscountTypeFilter}
          onClearFilters={handleClearFilters}
          onAdd={handleAddCoupon}
          onView={handleViewCoupon}
          onEdit={handleEditCoupon}
          onToggleActive={handleToggleCouponActive}
          onDelete={handleDeleteCoupon}
        />
      </div>

      {isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error instanceof Error ? error.message : "Failed to load coupons."}
        </div>
      )}

      {isFormOpen && (
        <CouponFormModal
          key={`${formMode}-${selectedCoupon?._id ?? "new"}`}
          isOpen={isFormOpen}
          mode={formMode}
          coupon={selectedCoupon}
          isSubmitting={createCouponMutation.isPending || updateCouponMutation.isPending}
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />
      )}

      <CouponDetailsModal
        isOpen={isDetailsOpen}
        coupon={viewedCoupon ?? null}
        isLoading={isDetailsLoading}
        onClose={handleCloseDetails}
      />

      <DeleteCouponModal
        isOpen={isDeleteOpen}
        coupon={couponToDelete}
        isDeleting={deleteCouponMutation.isPending}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AdminCouponsPage;