import api from "./axios";
import type { FilterOptions } from "../types/filter";

interface FilterResponse {
  success: boolean;
  data: FilterOptions;
}

export async function getFilterOptions(): Promise<FilterOptions> {
  const response =
    await api.get<FilterResponse>(
      "/products/filter/options"
    );

  return response.data.data;
}