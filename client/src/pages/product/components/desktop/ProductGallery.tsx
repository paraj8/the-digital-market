import { useState } from "react";

import type { ProductImage } from "../../../../features/products/types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

function ProductGallery({
  images,
  title,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const activeImage = images[selectedImage];

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121826]">
        <img
          src={activeImage?.url || "https://placehold.co/800x800"}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-auto">
          {images.map((image, index) => (
            <button
              type="button"
              key={image._id ?? `${image.publicId}-${index}`}
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-xl border ${
                selectedImage === index
                  ? "border-violet-500"
                  : "border-white/10"
              }`}
            >
              <img
                src={image.url}
                alt=""
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
