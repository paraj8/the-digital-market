import { useState } from "react";

import type { Category } from "../../../../../features/categories/types/category";
import { useCreateCategory } from "../../../../../features/categories/hooks/useCreateCategory";
import { useUpdateCategory } from "../../../../../features/categories/hooks/useUpdateCategory";

import CategoryFormFields from "./CategoryFormFields";
import CategoryFormActions from "./CategoryFormActions";

interface CategoryFormProps {
  mode: "create" | "edit";
  category?: Category | null;
  onSuccess: (category: Category) => void;
  onCancel: () => void;
}

function CategoryForm({
  mode,
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const [name, setName] = useState(
    category?.name ?? ""
  );

  const [description, setDescription] = useState(
    category?.description ?? ""
  );

  const [isActive, setIsActive] = useState(
    category?.isActive ?? true
  );

  const [sortOrder, setSortOrder] = useState(
    category?.sortOrder ?? 0
  );

  const [image, setImage] = useState<File | null>(
    null
  );

  const [error, setError] = useState("");

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setError("");

    const formData = new FormData();

    formData.append("name", name.trim());

    formData.append(
      "description",
      description.trim()
    );

    formData.append(
      "isActive",
      String(isActive)
    );

    formData.append(
      "sortOrder",
      String(sortOrder)
    );

    if (image) {
      formData.append("image", image);
    }

    try {
      let result: Category;

      if (mode === "create") {
        result =
          await createMutation.mutateAsync(
            formData
          );
      } else {
        if (!category?._id) {
          throw new Error(
            "Category ID is missing."
          );
        }

        result =
          await updateMutation.mutateAsync({
            id: category._id,
            data: formData,
          });
      }

      onSuccess(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  };

  const existingImageUrl =
    category?.image?.url || undefined;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div
          className="
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            px-4 py-3
            text-sm text-red-400
          "
        >
          {error}
        </div>
      )}

      <CategoryFormFields
        name={name}
        description={description}
        isActive={isActive}
        sortOrder={sortOrder}
        image={image}
        existingImageUrl={existingImageUrl}
        onNameChange={setName}
        onDescriptionChange={setDescription}
        onIsActiveChange={setIsActive}
        onSortOrderChange={setSortOrder}
        onImageChange={setImage}
        disabled={isSubmitting}
      />

      <CategoryFormActions
        mode={mode}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
}

export default CategoryForm;