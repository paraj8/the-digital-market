import { useState } from "react";

import type { ProductImage } from "../../../../../shared/types/product";

interface MobileProductGalleryProps {
  images: ProductImage[];
  title: string;
}

function MobileProductGallery({
  images,
  title,
}: MobileProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const activeImage = images[selectedImage];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121826]">
        <img
          src={activeImage?.url || "https://placehold.co/800x800"}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              type="button"
              key={image._id ?? `${image.publicId}-${index}`}
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`aspect-square overflow-hidden rounded-xl border p-0.5 ${
                selectedImage === index
                  ? "border-violet-500"
                  : "border-white/10"
              }`}
            >
              <img
                src={image.url}
                alt=""
                className="h-full w-full rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileProductGallery;
