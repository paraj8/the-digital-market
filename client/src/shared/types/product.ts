export interface ProductImage {
  _id?: string;
  url: string;
  publicId: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  
  shortDescription: string;
  description: string;

  category: {
    _id: string;
    name: string;
    slug: string;
  };

  sku: string;
  brand: string;

  images: ProductImage[];

  // Pricing
  costPrice: number;
  price: number;
  salePrice: number;
  gstRate: number;
  gstIncluded: boolean;

  // Inventory
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;

  // Shipping
  weight: number;
  length: number;
  width: number;
  height: number;
  shippingRequired: boolean;
  shippingClass: "light" | "medium" | "heavy";

  // Product Type
  isDigital: boolean;
  downloadUrl: string;

  // Tax & Compliance
  hsnCode: string;

  // Status
  isActive: boolean;
  isFeatured: boolean;
  returnable: boolean;
  codAvailable: boolean;

  // Tags
  tags: string[];

  // Analytics
  views: number;
  salesCount: number;

  // Ratings
  ratingsAverage: number;
  ratingsCount: number;

  // SEO
  seoTitle: string;
  seoDescription: string;

  createdAt: string;
  updatedAt: string;
}