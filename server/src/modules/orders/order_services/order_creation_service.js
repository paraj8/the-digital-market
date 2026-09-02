const Order = require(
  "../order_model"
);

const Cart = require(
  "../../carts/cart_model"
);

const Address = require(
  "../../address/address_model"
);

const Product = require(
  "../../products/products_model"
);

const {
  validateCheckoutInventory,
} = require(
  "./order_inventory_service"
);

const {
  validateCoupon,
} = require(
  "./order_coupon_service"
);

const {
  buildOrderItems,
  calculateOrderTotal,
} = require(
  "./order_calculation_service"
);

/*
====================================
CREATE PENDING ORDER
====================================
*/

const createPendingOrder =
  async (
    userId,
    {
      addressId,
      couponCode,
      paymentMethod,
      mode = "cart",
      productId,
      quantity = 1,
    }
  ) => {
    /*
    ====================================
    VALIDATE CHECKOUT MODE
    ====================================
    */

    if (
      mode !== "cart" &&
      mode !== "buyNow"
    ) {
      throw new Error(
        "Invalid checkout mode"
      );
    }

    /*
    ====================================
    VALIDATE PAYMENT METHOD
    ====================================
    */

    if (
      paymentMethod !==
      "CashFree"
    ) {
      throw new Error(
        "Only CashFree payment is supported"
      );
    }

    /*
    ====================================
    VALIDATE ADDRESS
    ====================================
    */

    const address =
      await Address.findOne({
        _id: addressId,
        user: userId,
      });

    if (!address) {
      throw new Error(
        "Address not found"
      );
    }

    /*
    ====================================
    GET CHECKOUT ITEMS
    ====================================
    */

    let checkoutItems = [];

    /*
    ------------------------------------
    CART CHECKOUT
    ------------------------------------
    */

    if (mode === "cart") {
      checkoutItems =
        await Cart.find({
          user: userId,
        }).populate("product");

      if (
        !checkoutItems ||
        checkoutItems.length === 0
      ) {
        throw new Error(
          "Cart is empty"
        );
      }
    }

    /*
    ------------------------------------
    BUY NOW CHECKOUT
    ------------------------------------
    */

    if (mode === "buyNow") {
      /*
      Product ID required.
      */

      if (!productId) {
        throw new Error(
          "Product ID is required for Buy Now"
        );
      }

      /*
      Validate quantity.
      */

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        throw new Error(
          "Invalid product quantity"
        );
      }

      /*
      Get selected product.
      */

      const product =
        await Product.findById(
          productId
        );

      if (!product) {
        throw new Error(
          "Product not found"
        );
      }

      /*
      Convert Buy Now product
      into cart-like structure.
      */

      checkoutItems = [
        {
          product,
          quantity,
        },
      ];
    }

    /*
    ====================================
    VALIDATE INVENTORY
    ====================================
    */

    await validateCheckoutInventory(
      checkoutItems
    );

    /*
    ====================================
    BUILD ORDER ITEMS
    ====================================
    */

    const {
      orderItems,
      subtotal,
    } =
      buildOrderItems(
        checkoutItems
      );

    /*
    ====================================
    COUPON
    ====================================
    */

    const {
      coupon,
      discount,
    } =
      await validateCoupon({
        couponCode,
        subtotal,
      });

    /*
    ====================================
    SHIPPING
    ====================================
    */

    /*
    Delhivery calculation will
    be added later.
    */

    const shippingCharge = 0;

    /*
    ====================================
    TOTAL
    ====================================
    */

    const {
      tax,
      totalAmount,
    } =
      calculateOrderTotal({
        subtotal,
        discount,
        shippingCharge,
      });

    /*
    ====================================
    CREATE PENDING ORDER
    ====================================
    */

    const order =
      await Order.create({
        user: userId,

        items: orderItems,

        shippingAddress:
          address._id,

        coupon: coupon
          ? coupon._id
          : null,

        subtotal,

        discount,

        tax,

        shippingCharge,

        totalAmount,

        checkoutMode:
          mode,

        paymentMethod:
          "CashFree",

        paymentStatus:
          "pending",

        orderStatus:
          "pending",
      });

    return order;
  };

module.exports = {
  createPendingOrder,
};