import api from "../../../api/axios";
import type { Address } from "../types/address";

interface AddressResponse {
  success: boolean;
  message?: string;
  data: Address;
}

interface AddressesResponse {
  success: boolean;
  data: Address[];
}

interface DeleteAddressResponse {
  success: boolean;
  message: string;
}

// Get all addresses
export const getAddresses = async (): Promise<
  Address[]
> => {
  const response =
    await api.get<AddressesResponse>(
      "/addresses"
    );

  return response.data.data;
};

// Add address
export const createAddress = async (
  data: Omit<
    Address,
    | "_id"
    | "user"
    | "createdAt"
    | "updatedAt"
  >
): Promise<Address> => {
  const response =
    await api.post<AddressResponse>(
      "/addresses",
      data
    );

  return response.data.data;
};

// Update address
export const updateAddress = async (
  id: string,
  data: Partial<
    Omit<
      Address,
      | "_id"
      | "user"
      | "createdAt"
      | "updatedAt"
    >
  >
): Promise<Address> => {
  const response =
    await api.patch<AddressResponse>(
      `/addresses/${id}`,
      data
    );

  return response.data.data;
};

// Delete address
export const deleteAddress = async (
  id: string
): Promise<DeleteAddressResponse> => {
  const response =
    await api.delete<DeleteAddressResponse>(
      `/addresses/${id}`
    );

  return response.data;
};

// Set default address
export const setDefaultAddress = async (
  id: string
): Promise<Address> => {
  const response =
    await api.patch<AddressResponse>(
      `/addresses/${id}/default`
    );

  return response.data.data;
};