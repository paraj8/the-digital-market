const Product = require(
  "../../products/products_model"
);

const Cart = require(
  "../../carts/cart_model"
);

/*
====================================
VALIDATE CHECKOUT INVENTORY
====================================
*/

const validateCheckoutInventory =
  async (
    checkoutItems
  ) => {
    for (const item of checkoutItems) {
      const product =
        item.product;

      if (!product) {
        throw new Error(
          "Product no longer exists"
        );
      }

      if (product.stock <= 0) {
        throw new Error(
          `${product.title} is out of stock`
        );
      }

      if (
        item.quantity >
        product.stock
      ) {
        throw new Error(
          `Only ${product.stock} units available for ${product.title}`
        );
      }
    }
  };

/*
====================================
VALIDATE ORDER INVENTORY
====================================
====================================

This is called again after
payment succeeds because stock
could have changed while the
customer was paying.
====================================
*/

const validateOrderInventory =
  async (order) => {
    for (const item of order.items) {
      const product =
        await Product.findById(
          item.product
        );

      if (!product) {
        throw new Error(
          `${item.title} is no longer available`
        );
      }

      if (
        product.stock <
        item.quantity
      ) {
        throw new Error(
          `Insufficient stock for ${item.title}`
        );
      }
    }
  };

/*
====================================
REDUCE STOCK
====================================
*/

const reduceOrderStock =
  async (order) => {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock:
              -item.quantity,

            salesCount:
              item.quantity,
          },
        }
      );
    }
  };

/*
====================================
CART CLEANUP
====================================
*/

const cleanupCartAfterOrder =
  async (order) => {
    /*
    ------------------------------------
    CART CHECKOUT
    ------------------------------------
    */

    if (
      order.checkoutMode ===
      "cart"
    ) {
      await Cart.deleteMany({
        user: order.user,
      });

      return;
    }

    /*
    ------------------------------------
    BUY NOW CHECKOUT
    ------------------------------------
    */

    if (
      order.checkoutMode ===
      "buyNow"
    ) {
      for (const item of order.items) {
        await Cart.deleteOne({
          user: order.user,

          product:
            item.product,
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