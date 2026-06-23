export interface Product {
  _id: string;

  title: string;

  slug: string;

  shortDescription: string;

  price: number;

  salePrice: number;

  images: string[];

  stock: number;

  brand: string;

  isFeatured: boolean;

  category: string;
}