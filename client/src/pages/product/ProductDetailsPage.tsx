import { useState } from "react";
import { useParams } from "react-router-dom";

import { useProduct } from "../../hooks/useProduct";
import { addToCart } from "../../api/cartApi";
import toast from "react-hot-toast";

import RelatedProducts from "./components/RelatedProducts";

function ProductDetailsPage() {
  const { slug } = useParams<{
    slug: string;
  }>();

  const {
    data,
    isLoading,
    error,
  } = useProduct(slug || "");

  const [selectedImage, setSelectedImage] =
  useState(0);

const [quantity, setQuantity] =
  useState(1);

const [addingToCart, setAddingToCart] =
  useState(false);

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast("Please login to add items to cart", {
        icon: "🔐",
      });
      return;
    }

    if (!data) return;

    setAddingToCart(true);

    await addToCart(data._id, quantity);

    toast.success("Product added to cart 🛒");
  } catch (error) {
    console.error(error);

    toast.error("Failed to add product to cart");
  } finally {
    setAddingToCart(false);
  }
};

  if (isLoading) {
    return (
      <div className="p-6">
        Loading product...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6">
        Product not found
      </div>
    );
  }

  const displayPrice =
    data.salePrice > 0
      ? data.salePrice
      : data.price;

  const discountPercent =
    data.salePrice > 0
      ? Math.round(
          ((data.price -
            data.salePrice) /
            data.price) *
            100
        )
      : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div
        className="
          grid
          gap-10
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}

        <div>
          {/* Main Image */}

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-white/10
              bg-[#121826]
            "
          >
            <img
              src={
                data.images?.[
                  selectedImage
                ] ||
                "https://placehold.co/800x800"
              }
              alt={data.title}
              className="
                aspect-square
                w-full
                object-cover
              "
            />
          </div>

          {/* Thumbnails */}

          {data.images?.length >
            1 && (
            <div className="mt-4 flex gap-3 overflow-auto">
              {data.images.map(
                (
                  image: string,
                  index: number
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(
                        index
                      )
                    }
                    className={`
                      overflow-hidden
                      rounded-xl
                      border
                      ${
                        selectedImage ===
                        index
                          ? "border-violet-500"
                          : "border-white/10"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt=""
                      className="
                        h-20
                        w-20
                        object-cover
                      "
                    />
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}

        <div>

 {/* Breadcrumbs */}

        <div className="mb-4 text-sm text-slate-400">
  Home /
  <span className="mx-2">
    Products
  </span>
  /
  <span className="ml-2 text-white">
    {data.title}
  </span>
</div>  

          {/* Brand */}

          <p className="text-sm text-slate-300 ">
            {data.brand}
          </p>
          {/* Title */}

          <h1
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            {data.title}
          </h1>

          {/* Price */}

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">
                ₹{displayPrice}
              </span>

              {data.salePrice >
                0 && (
                <>
                  <span
                    className="
                      text-lg
                      text-slate-500
                      line-through
                    "
                  >
                    ₹{data.price}
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-green-500/20
                      px-3
                      py-1
                      text-sm
                      text-green-400
                    "
                  >
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock */}

          <div className="mt-6">
            {data.stock > 0 ? (
              <div
                className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-green-500/10
                    px-3
                    py-1
                    text-sm
                    text-green-400
                "
                >
                <span className="h-2 w-2 rounded-full bg-green-400" />
                In Stock ({data.stock})
                </div>
            ) : (
              <span className="text-red-400">
                Out of Stock
              </span>
            )}
          </div>

    {/* Quantity Selector */}

<div className="mt-6">
  <p className="mb-2 text-sm text-slate-400">
    Quantity
  </p>

  <div
    className="
      flex
      w-fit
      items-center
      rounded-xl
      border border-white/10
      bg-[#121826]
    "
  >
<button
  onClick={() =>
    setQuantity((prev) =>
      Math.max(1, prev - 1)
    )
  }
  className="px-4 py-2"
>
  -
</button>

<span className="px-4">
  {quantity}
</span>

<button
  onClick={() =>
    setQuantity((prev) =>
      prev + 1
    )
  }
  className="px-4 py-2"
>
  +
</button>
  </div>
</div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="
                flex-1
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                py-3
                font-semibold
                hover:scale-[1.02]
                transition
                disabled:opacity-50
              "
            >
              {addingToCart
                ? "Adding..."
                : "Add To Cart"}
            </button>

            <button
              className="
                flex-1
                rounded-xl
                border
                border-white/10
                bg-[#121826]
                py-3
                font-semibold
                hover:border-violet-500/50 hover:scale-[1.02] 
                transition
                
              "
            >
              Buy Now
            </button>
          </div>

          {/* Product Details */}

<div
  className="
    mt-8
    rounded-2xl
    border border-white/10
    bg-[#121826]
    p-5
  "
>
  <h3
    className="
      mb-4
      text-lg
      font-semibold
    "
  >
    Product Details
  </h3>

  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-slate-400">
        SKU
      </span>

      <span>{data.sku}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-400">
        Brand
      </span>

      <span>{data.brand}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-400">
        Stock
      </span>

      <span>{data.stock}</span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-400">
        Returnable
      </span>

      <span>
        {data.returnable
          ? "Yes"
          : "No"}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-400">
        COD
      </span>

      <span>
        {data.codAvailable
          ? "Available"
          : "Unavailable"}
      </span>
    </div>
  </div>
</div>
        </div>
</div>

{/* Description Section */}

<div
  className="
    mt-12
    rounded-2xl
    border border-white/10
    bg-[#121826]
    p-6
  "
>
  <h2
    className="
      mb-4
      text-xl
      font-semibold
    "
  >
    Description
  </h2>

  <p
    className="
      leading-7
      text-slate-300
    "
  >
    {data.description ||
      data.shortDescription}
  </p>
</div>

<RelatedProducts
  categoryId={
    data.category?._id
  }
  currentProductId={
    data._id
  }
/>

</section>



  );
}

export default ProductDetailsPage;