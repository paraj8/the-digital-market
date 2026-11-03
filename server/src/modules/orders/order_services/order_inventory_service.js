const Product = require("../../products/products_model");
const Cart = require("../../carts/cart_model");

const resolveVariant = (product, item) =>
  item.variant ||
  (item.variantId
    ? product.variants.id(item.variantId)
    : null);

const checkAvailableStock = (
  product,
  variant,
  quantity,
  itemTitle
) => {
  const stock = variant ? variant.stock : product.stock;
  if (
    product.trackInventory &&
    !product.allowBackorder &&
    (stock <= 0 || quantity > stock)
  ) {
    throw new Error(
      stock > 0
        ? `Only ${stock} units available for ${itemTitle}`
        : `${itemTitle} is out of stock`
    );
  }
};

const validateCheckoutInventory = async (checkoutItems) => {
  for (const item of checkoutItems) {
    const product = item.product;
    if (!product) {
      throw new Error("Product no longer exists");
    }
    if (!product.isActive) {
      throw new Error(`${product.title} is not available`);
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Invalid product quantity");
    }

    const variant = resolveVariant(product, item);
    if (item.variantId && !variant) {
      throw new Error(`${product.title} variant is no longer available`);
    }
    if (product.hasVariants && !variant) {
      throw new Error(`Select a variant for ${product.title}`);
    }
    if (variant && (!product.hasVariants || !variant.isActive)) {
      throw new Error(`${product.title} variant is not available`);
    }

    checkAvailableStock(
      product,
      variant,
      item.quantity,
      product.title
    );
  }
};

const validateOrderInventory = async (order) => {
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) {
      throw new Error(`${item.title} is no longer available`);
    }

    const variant = item.variantId
      ? product.variants.id(item.variantId)
      : null;
    if (item.variantId && (!variant || !variant.isActive)) {
      throw new Error(`${item.title} variant is no longer available`);
    }
    checkAvailableStock(product, variant, item.quantity, item.title);
  }
};

const reduceOrderStock = async (order) => {
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`${item.title} is no longer available`);
    }

    const variant = item.variantId
      ? product.variants.id(item.variantId)
      : null;
    if (item.variantId && (!variant || !variant.isActive)) {
      throw new Error(`${item.title} variant is no longer available`);
    }

    const quantity = item.quantity;
    const filter = {
      _id: item.product,
      isActive: true,
    };
    let update;

    if (product.trackInventory && !product.allowBackorder) {
      if (variant) {
        filter.variants = {
          $elemMatch: {
            _id: variant._id,
            isActive: true,
            stock: { $gte: quantity },
          },
        };
        update = {
          $inc: {
            "variants.$.stock": -quantity,
            salesCount: quantity,
          },
        };
      } else {
        filter.stock = { $gte: quantity };
        update = {
          $inc: {
            stock: -quantity,
            salesCount: quantity,
          },
        };
      }

      const result = await Product.updateOne(filter, update);
      if (!result.matchedCount) {
        throw new Error(`Insufficient stock for ${item.title}`);
      }
      continue;
    }

    if (product.trackInventory && product.allowBackorder) {
      if (variant) {
        filter.variants = {
          $elemMatch: {
            _id: variant._id,
            isActive: true,
          },
        };
        update = [
          {
            $set: {
              variants: {
                $map: {
                  input: "$variants",
                  as: "variant",
                  in: {
                    $cond: [
                      { $eq: ["$$variant._id", variant._id] },
                      {
                        $mergeObjects: [
                          "$$variant",
                          {
                            stock: {
                              $max: [
                                0,
                                {
                                  $subtract: [
                                    { $ifNull: ["$$variant.stock", 0] },
                                    quantity,
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                      "$$variant",
                    ],
                  },
                },
              },
              salesCount: {
                $add: [{ $ifNull: ["$salesCount", 0] }, quantity],
              },
            },
          },
        ];
      } else {
        update = [
          {
            $set: {
              stock: {
                $max: [
                  0,
                  {
                    $subtract: [
                      { $ifNull: ["$stock", 0] },
                      quantity,
                    ],
                  },
                ],
              },
              salesCount: {
                $add: [{ $ifNull: ["$salesCount", 0] }, quantity],
              },
            },
          },
        ];
      }

      const result = await Product.updateOne(filter, update);
      if (!result.matchedCount) {
        throw new Error(`${item.title} is no longer available`);
      }
      continue;
    }

    const result = await Product.updateOne(
      {
        _id: item.product,
        isActive: true,
        ...(variant
          ? {
              variants: {
                $elemMatch: {
                  _id: variant._id,
                  isActive: true,
                },
              },
            }
          : {}),
      },
      { $inc: { salesCount: quantity } }
    );
    if (!result.matchedCount) {
      throw new Error(`${item.title} is no longer available`);
    }
  }
};

const cleanupCartAfterOrder = async (order) => {
  if (order.checkoutMode === "cart") {
    await Cart.deleteMany({ user: order.user });
    return;
  }

  if (order.checkoutMode === "buyNow") {
    for (const item of order.items) {
      await Cart.deleteOne({
        user: order.user,
        product: item.product,
        variantId: item.variantId ?? null,
      });
    }
  }
};

module.exports = {
  validateCheckoutInventory,
  validateOrderInventory,
  reduceOrderStock,
  cleanupCartAfterOrder,
};
