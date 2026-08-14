export interface Product {
  _id: string;

  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  brand: string;

  sku: string;

  images: string[];

  price: number;

  salePrice: number;

  stock: number;

  isFeatured: boolean;

  returnable: boolean;

  codAvailable: boolean;

  category: {
    _id: string;
    name: string;
    slug: string;
  };
}