export interface CategoryImage {
  url: string;
  publicId: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: CategoryImage;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}