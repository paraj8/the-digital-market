import type { Product } from "../../../../../features/products/types/product";

export type AdminProduct = Product & {
  costPrice: number;

  gstRate: number;
  gstIncluded: boolean;

  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;

  weight: number;
  length: number;
  width: number;
  height: number;

  shippingRequired: boolean;
  shippingClass: "light" | "medium" | "heavy";

  isDigital: boolean;
  downloadUrl: string;

  hsnCode: string;

  isActive: boolean;

  tags: string[];

  views: number;
  salesCount: number;

  ratingsAverage: number;
  ratingsCount: number;

  seoTitle: string;
  seoDescription: string;
};