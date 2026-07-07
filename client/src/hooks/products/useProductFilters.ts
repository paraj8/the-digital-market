import { useMemo, useState } from "react";

import type { ProductFiltersState } from "../../types/filter";

export function useProductFilters() {
  /* Search */

  const [search, setSearch] =
    useState("");

  /* Pagination */

  const [page, setPage] =
    useState(1);

  const limit = 12;

  /* Filters */

  const [filters, setFilters] =
    useState<ProductFiltersState>({
      categories: [],
      brands: [],
      ratings: [],
      availability: [],
      sort: [],
      minPrice: undefined,
      maxPrice: undefined,
    });

  /* Update one filter */

  const updateFilter = <
    K extends keyof ProductFiltersState
  >(
    key: K,
    value: ProductFiltersState[K]
  ) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* Update price */

  const updatePrice = (
    minPrice?: number,
    maxPrice?: number
  ) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
    }));
  };

  /* Reset */

  const clearFilters = () => {
    setPage(1);

    setSearch("");

    setFilters({
      categories: [],
      brands: [],
      ratings: [],
      availability: [],
      sort: [],
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  /* Backend Query */

  const query = useMemo(() => {
    return {
      page,
      limit,

      search:
        search.trim() || undefined,

      category:
        filters.categories.length > 0
          ? filters.categories.join(",")
          : undefined,

      brand:
        filters.brands.length > 0
          ? filters.brands.join(",")
          : undefined,

      rating:
        filters.ratings.length > 0
          ? filters.ratings[0]
          : undefined,

      inStock:
        filters.availability.includes(
          "true"
        )
          ? true
          : undefined,

      sort:
        filters.sort.length > 0
          ? filters.sort[0]
          : undefined,

      minPrice:
        filters.minPrice,

      maxPrice:
        filters.maxPrice,
    };
  }, [
    page,
    limit,
    search,
    filters,
  ]);

  return {
    /* state */

    search,

    page,

    limit,

    filters,

    query,

    /* actions */

    setSearch,

    setPage,

    updateFilter,

    updatePrice,

    clearFilters,
  };
}