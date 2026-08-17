import { useEffect, useRef } from "react";
import { FiImage, FiTrash2, FiUpload } from "react-icons/fi";

interface CategoryImageUploadProps {
  value: File | null;
  existingImageUrl?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

function CategoryImageUpload({
  value,
  existingImageUrl,
  onChange,
  disabled = false,
}: CategoryImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  /*
   * Create an object URL for the newly selected file.
   * This effect only handles the external browser URL resource
   * and does not synchronize React state.
   */
  const previewUrl = value
    ? URL.createObjectURL(value)
    : existingImageUrl || null;

  useEffect(() => {
    if (!value || !previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [value, previewUrl]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChooseImage = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium text-gray-300">
          Category Image
        </label>

        <p className="mt-1 text-xs text-gray-500">
          Upload an image up to 5 MB.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50">
          <div className="aspect-video w-full">
            <img
              src={previewUrl}
              alt="Category preview"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-slate-900/80 p-3">
            <button
              type="button"
              onClick={handleChooseImage}
              disabled={disabled}
              className="
                inline-flex items-center gap-2
                rounded-lg border border-white/10
                px-3 py-2
                text-sm text-gray-300
                transition
                hover:bg-white/5
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FiUpload size={15} />
              Change Image
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled}
              className="
                inline-flex items-center gap-2
                rounded-lg border border-red-500/20
                px-3 py-2
                text-sm text-red-400
                transition
                hover:bg-red-500/10
                hover:text-red-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FiTrash2 size={15} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleChooseImage}
          disabled={disabled}
          className="
            flex w-full flex-col items-center
            justify-center gap-3
            rounded-2xl border border-dashed
            border-white/15
            bg-slate-800/40
            px-6 py-10
            text-center
            transition
            hover:border-violet-500/50
            hover:bg-violet-500/5
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-xl
              bg-violet-500/10
              text-violet-400
            "
          >
            <FiImage size={22} />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-300">
              Choose category image
            </p>

            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, JPEG or WebP · Max 5 MB
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

export default CategoryImageUpload;