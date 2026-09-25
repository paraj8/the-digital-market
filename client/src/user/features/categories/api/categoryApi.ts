import api from "../../../../api/axios";
import type { Category } from "../../../../shared/types/category";

export type CategoryFormData = FormData;

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");

  return response.data.data;
};

export const getCategoryById = async (
  id: string
): Promise<Category> => {
  const response = await api.get(`/categories/${id}`);

  return response.data.data;
};

export const createCategory = async (
  data: CategoryFormData
): Promise<Category> => {
  const response = await api.post(
    "/categories",
    data
  );

  return response.data.data;
};

export const updateCategory = async (
  id: string,
  data: CategoryFormData
): Promise<Category> => {
  const response = await api.put(
    `/categories/${id}`,
    data
  );

  return response.data.data;
};

export const deleteCategory = async (
  id: string
): Promise<void> => {
  await api.delete(`/categories/${id}`);
};