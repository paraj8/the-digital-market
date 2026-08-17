import type { Category } from "../../../../../features/categories/types/category";

export type CategoryFormMode = "create" | "edit";

export interface CategoryFormData {
  name: string;
  description: string;
  image: File | null;
  isActive: boolean;
  sortOrder: number;
}

export interface CategoryFormModalProps {
  isOpen: boolean;
  mode: CategoryFormMode;
  category?: Category | null;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
}