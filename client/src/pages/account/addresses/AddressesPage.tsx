import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import AddressList from "../../../components/address/AddressList";
import AddressFormModal from "../../../components/address/AddressFormModal";
import AddressDeleteModal from "../../../components/address/AddressDeleteModal";

import { useAddresses } from "../../../features/addresses/hooks/useAddresses";

import {
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
} from "../../../features/addresses/hooks/useAddressMutations";

import type { Address } from "../../../features/addresses/types/address";

function AddressesPage() {
  /* ===================================== */
  /* MODAL STATE */
  /* ===================================== */

  const [isFormModalOpen, setIsFormModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(null);

  const [formMode, setFormMode] =
    useState<"create" | "edit">("create");

  /* ===================================== */
  /* ADDRESSES */
  /* ===================================== */

  const {
    data: addresses = [],
    isLoading,
    isError,
    error,
  } = useAddresses();

  /* ===================================== */
  /* MUTATIONS */
  /* ===================================== */

  const createAddressMutation =
    useCreateAddress();

  const updateAddressMutation =
    useUpdateAddress();

  const deleteAddressMutation =
    useDeleteAddress();

  const setDefaultAddressMutation =
    useSetDefaultAddress();

  /* ===================================== */
  /* ADD ADDRESS */
  /* ===================================== */

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setFormMode("create");
    setIsFormModalOpen(true);
  };

  /* ===================================== */
  /* EDIT ADDRESS */
  /* ===================================== */

  const handleEditAddress = (
    address: Address
  ) => {
    setSelectedAddress(address);
    setFormMode("edit");
    setIsFormModalOpen(true);
  };

  /* ===================================== */
  /* DELETE ADDRESS */
  /* ===================================== */

  const handleDeleteAddress = (
    address: Address
  ) => {
    setSelectedAddress(address);
    setIsDeleteModalOpen(true);
  };

  /* ===================================== */
  /* SET DEFAULT */
  /* ===================================== */

  const handleSetDefaultAddress = async (
    address: Address
  ) => {
    if (
      address.isDefault ||
      setDefaultAddressMutation.isPending
    ) {
      return;
    }

    try {
      await setDefaultAddressMutation.mutateAsync(
        address._id
      );
    } catch {
      /*
       * React Query handles the mutation error.
       */
    }
  };

  /* ===================================== */
  /* CLOSE FORM MODAL */
  /* ===================================== */

  const handleCloseFormModal = () => {
    if (
      createAddressMutation.isPending ||
      updateAddressMutation.isPending
    ) {
      return;
    }

    setIsFormModalOpen(false);
    setSelectedAddress(null);
  };

  /* ===================================== */
  /* FORM SUBMIT */
  /* ===================================== */

  const handleFormSubmit = async (
    data: Omit<
      Address,
      | "_id"
      | "user"
      | "createdAt"
      | "updatedAt"
    >
  ) => {
    try {
      if (formMode === "create") {
        await createAddressMutation.mutateAsync(
          data
        );
      } else if (
        formMode === "edit" &&
        selectedAddress
      ) {
        await updateAddressMutation.mutateAsync({
          id: selectedAddress._id,
          data,
        });
      }

      setIsFormModalOpen(false);
      setSelectedAddress(null);
    } catch {
      /*
       * Keep modal open if the request fails.
       */
    }
  };

  /* ===================================== */
  /* CLOSE DELETE MODAL */
  /* ===================================== */

  const handleCloseDeleteModal = () => {
    if (deleteAddressMutation.isPending) {
      return;
    }

    setIsDeleteModalOpen(false);
    setSelectedAddress(null);
  };

  /* ===================================== */
  /* CONFIRM DELETE */
  /* ===================================== */

  const handleConfirmDelete = async () => {
    if (!selectedAddress?._id) {
      return;
    }

    try {
      await deleteAddressMutation.mutateAsync(
        selectedAddress._id
      );

      setIsDeleteModalOpen(false);
      setSelectedAddress(null);
    } catch {
      /*
       * Keep modal open if deletion fails.
       */
    }
  };

  /* ===================================== */
  /* SUBMITTING */
  /* ===================================== */

  const isFormSubmitting =
    createAddressMutation.isPending ||
    updateAddressMutation.isPending;

  /* ===================================== */
  /* RENDER */
  /* ===================================== */

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            Addresses
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddAddress}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-violet-500
          "
        >
          <FiPlus size={18} />
          Add Address
        </button>
      </div>

      {/* ERROR */}

      {isError ? (
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/5
            p-6
            text-center
          "
        >
          <p className="text-sm text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to load addresses."}
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <AddressList
            addresses={addresses}
            isLoading={isLoading}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
            onSetDefault={
              handleSetDefaultAddress
            }
            settingDefaultId={
              setDefaultAddressMutation.isPending
                ? selectedAddress?._id ?? null
                : null
            }
          />
        </div>
      )}

      {/* ADDRESS FORM */}

      <AddressFormModal
        isOpen={isFormModalOpen}
        address={selectedAddress}
        isSubmitting={isFormSubmitting}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
      />

      {/* DELETE MODAL */}

      <AddressDeleteModal
        isOpen={isDeleteModalOpen}
        address={selectedAddress}
        isDeleting={
          deleteAddressMutation.isPending
        }
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}

export default AddressesPage;
