import type { Product } from "../../../../../features/products/types/product";

export type AdminProduct = Partial<
  Omit<
    Product,
    | "_id"
    | "slug"
    | "images"
    | "views"
    | "salesCount"
    | "ratingsAverage"
    | "ratingsCount"
    | "createdAt"
    | "updatedAt"
  >
>;