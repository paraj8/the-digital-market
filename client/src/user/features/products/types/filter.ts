export interface FilterCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface FilterOptions {
  categories: FilterCategory[];
  brands: string[];

  priceRange: {
    min: number;
    max: number;
  };

  ratings: number[];

  sortOptions: SortOption[];
}

/* -------------------- */
/* Product Listing */
/* -------------------- */

export interface ProductFiltersState {
  categories: string[];
  brands: string[];
  ratings: string[];
  availability: string[];
  sort: string[];

  minPrice?: number;
  maxPrice?: number;
}

export type ArrayFilterKey =
  | "categories"
  | "brands"
  | "ratings"
  | "availability"
  | "sort";

export interface PriceValue {
  minPrice?: number;
  maxPrice?: number;
}