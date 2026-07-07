import { FiTrash2 } from "react-icons/fi";

import { useCart } from "../../hooks/cart/useCart";

import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../hooks/cart/useCartMutations";

function CartPage() {
  const {
    data,
    isLoading,
    error,
  } = useCart();

  const removeMutation =
    useRemoveCartItem();

  const updateMutation =
    useUpdateCartItem();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        Failed to load cart
      </div>
    );
  }

  if (
    !data ||
    data.items.length === 0
  ) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div
          className="
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-10
            text-center
          "
        >
          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="mt-3 text-slate-400">
            Start adding products to
            your cart.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Shopping Cart
        </h1>

        <p className="mt-2 text-slate-400">
          Review your items before
          checkout
        </p>
      </div>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-[1fr_350px]
        "
      >
        {/* Cart Items */}

        <div className="space-y-4">
          {data.items.map(
            (item) => (
              <div
                key={item._id}
                className="
                  flex
                  gap-4
                  rounded-2xl
                  border border-white/10
                  bg-[#121826]
                  p-4
                "
              >
                <img
                  src={
                    item.product
                      .images?.[0] ||
                    "https://placehold.co/300x300"
                  }
                  alt={
                    item.product.title
                  }
                  className="
                    h-24
                    w-24
                    rounded-xl
                    object-cover
                  "
                />

                <div className="flex flex-1 flex-col">
                  <h3 className="font-semibold">
                    {
                      item.product
                        .title
                    }
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {
                      item.product
                        .brand
                    }
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold">
                      ₹
                      {
                        item.subtotal
                      }
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateMutation.mutate(
                            {
                              itemId:
                                item._id,
                              quantity:
                                Math.max(
                                  1,
                                  item.quantity -
                                    1
                                ),
                            }
                          )
                        }
                        className="
                          rounded-lg
                          border border-white/10
                          px-3 py-1
                        "
                      >
                        -
                      </button>

                      <span>
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>
                          updateMutation.mutate(
                            {
                              itemId:
                                item._id,
                              quantity:
                                item.quantity +
                                1,
                            }
                          )
                        }
                        className="
                          rounded-lg
                          border border-white/10
                          px-3 py-1
                        "
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeMutation.mutate(
                            item._id
                          )
                        }
                        className="
                          rounded-lg
                          p-2
                          text-red-400
                          hover:bg-red-500/10
                        "
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Summary */}

        <div
          className="
            h-fit
            rounded-2xl
            border border-white/10
            bg-[#121826]
            p-6
          "
        >
          <h2
            className="
              mb-6
              text-xl
              font-semibold
            "
          >
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">
                Items
              </span>

              <span>
                {
                  data.totalItems
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                Shipping
              </span>

              <span>Free</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>
                  ₹
                  {
                    data.totalAmount
                  }
                </span>
              </div>
            </div>
          </div>

          <button
            className="
              mt-6
              w-full
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              py-3
              font-semibold
            "
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default CartPage;