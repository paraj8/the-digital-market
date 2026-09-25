export type AddressType =
  | "home"
  | "office"
  | "other";

export interface Address {
  _id: string;
  user: string;

  fullName: string;
  phone: string;

  addressLine1: string;
  addressLine2?: string;
  landmark?: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  addressType: AddressType;
  isDefault: boolean;

  createdAt: string;
  updatedAt: string;
}