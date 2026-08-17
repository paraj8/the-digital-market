import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";

import {useWishlist,} from "../../features/wishlist/hooks/useWishlist";

import type { WishlistItem } from "../../features/wishlist/types/wishlist";

import {useRemoveFromWishlist,} from "../../features/wishlist/hooks/useRemoveFromWishlist";

function WishlistPage() {
  const { data, isLoading } =
    useWishlist();

  const removeMutation =
    useRemoveFromWishlist();

  if (isLoading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-12
            text-center
          "
        >
          <FiHeart
            className="mx-auto"
            size={48}
          />

          <h2 className="mt-5 text-2xl font-bold">
            Your Wishlist is Empty
          </h2>

          <p className="mt-2 text-slate-400">
            Save products you love.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Wishlist
        </h1>

        <p className="mt-2 text-slate-400">
          Products you've saved
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {data.map((item: WishlistItem) => (
          <div
            key={item._id}
            className="
              rounded-2xl
              border border-white/10
              bg-[#121826]
              p-4
            "
          >
            <img
              src={
                item.product.images[0]
              }
              alt={
                item.product.title
              }
              className="
                aspect-square
                w-full
                rounded-xl
                object-cover
              "
            />

            <h2 className="mt-4 text-lg font-semibold">
              {item.product.title}
            </h2>

            <p className="mt-1 text-slate-400">
              {item.product.brand}
            </p>

            <div className="mt-3 flex items-center gap-3">

              <span className="text-xl font-bold">

                ₹
                {item.product.salePrice ||
                  item.product.price}

              </span>

            </div>

            <div className="mt-5 flex gap-3">

              <button
                className="
                  flex-1
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-blue-600
                  py-3
                  font-semibold
                "
              >
                <FiShoppingCart className="mr-2 inline" />
                Add To Cart
              </button>

              <button
                onClick={() =>
                  removeMutation.mutate(
                    item.product._id
                  )
                }
                className="
                  rounded-xl
                  border border-red-500/20
                  p-3
                  text-red-400
                "
              >
                <FiTrash2 />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default WishlistPage;