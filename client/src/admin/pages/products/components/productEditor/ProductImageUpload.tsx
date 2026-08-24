import {
  useRef,
  useState,
} from "react";
import {
  FiImage,
  FiX,
} from "react-icons/fi";

interface ProductImage {
  _id?: string;
  url: string;
  publicId: string;
}

interface ProductImageUploadProps {
  existingImages?: ProductImage[];
  onChange: (files: File[]) => void;
}

function ProductImageUpload({
  existingImages = [],
  onChange,
}: ProductImageUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  /*
   * Existing Cloudinary images
   */
  const existingPreviews =
    existingImages.map(
      (image) => image.url
    );

  /*
   * New local images
   *
   * These URLs are generated directly from
   * the selected files.
   */
  const newPreviews = selectedFiles.map(
    (file) => URL.createObjectURL(file)
  );

  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files ?? []
    ).filter((file) =>
      file.type.startsWith("image/")
    );

    if (!files.length) {
      return;
    }

    const updatedFiles = [
      ...selectedFiles,
      ...files,
    ];

    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveNewImage = (
    index: number
  ) => {
    const updatedFiles =
      selectedFiles.filter(
        (_, fileIndex) =>
          fileIndex !== index
      );

    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-semibold text-white">
          Product Images
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          Upload product images. You can select
          multiple images.
        </p>
      </div>

      {/* Existing Images */}
      {existingPreviews.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium text-gray-400">
            Existing Images
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {existingImages.map(
              (image, index) => (
                <div
                  key={
                    image._id ??
                    `${image.publicId}-${index}`
                  }
                  className="
                    group relative aspect-square
                    overflow-hidden rounded-xl
                    border border-white/10
                    bg-slate-800
                  "
                >
                  <img
                    src={image.url}
                    alt={`Product ${
                      index + 1
                    }`}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute inset-x-0
                      bottom-0
                      bg-black/60
                      px-2 py-1
                      text-[10px]
                      text-gray-300
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  >
                    Existing
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* New Images */}
      {newPreviews.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-medium text-gray-400">
            New Images
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {newPreviews.map(
              (preview, index) => (
                <div
                  key={`${preview}-${index}`}
                  className="
                    group relative aspect-square
                    overflow-hidden rounded-xl
                    border border-violet-500/30
                    bg-slate-800
                  "
                >
                  <img
                    src={preview}
                    alt={`New product ${
                      index + 1
                    }`}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveNewImage(
                        index
                      )
                    }
                    className="
                      absolute right-2 top-2
                      flex h-7 w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-black/70
                      text-white
                      opacity-0
                      transition
                      group-hover:opacity-100
                      hover:bg-red-500
                    "
                  >
                    <FiX size={15} />
                  </button>

                  <div
                    className="
                      absolute inset-x-0
                      bottom-0
                      bg-violet-600/80
                      px-2 py-1
                      text-[10px]
                      text-white
                    "
                  >
                    New
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Add Images */}
      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="
          flex aspect-square
          w-full max-w-[180px]
          flex-col
          items-center
          justify-center
          rounded-xl
          border border-dashed
          border-white/20
          bg-white/5
          text-gray-400
          transition
          hover:border-violet-500/50
          hover:bg-violet-500/5
          hover:text-violet-400
        "
      >
        <FiImage size={24} />

        <span className="mt-2 text-xs font-medium">
          Add Images
        </span>
      </button>

      {/* File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFiles}
      />
    </section>
  );
}

export default ProductImageUpload;