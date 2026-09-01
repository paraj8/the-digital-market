const Order = require("./order_model");
const Cart = require("../carts/cart_model");
const Address = require("../address/address_model");
const Coupon = require("../coupons/coupon_model");
const Product = require("../products/products_model");

/*
====================================
CREATE PENDING ORDER
====================================
*/

const createOrder = async (
  userId,
  {
    addressId,
    couponCode,
    paymentMethod,
  }
) => {
  // Validate payment method

  if (paymentMethod !== "CashFree") {
    throw new Error(
      "Only CashFree payment is supported"
    );
  }

  // Validate Address

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

  // Get Cart Items

  const cartItems =
    await Cart.find({
      user: userId,
    }).populate("product");

  if (
    !cartItems ||
    cartItems.length === 0
  ) {
    throw new Error(
      "Cart is empty"
    );
  }

  let subtotal = 0;

  /*
  ====================================
  VALIDATE PRODUCTS & INVENTORY
  ====================================
  */

  for (const item of cartItems) {
    const product = item.product;

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
      item.quantity > product.stock
    ) {
      throw new Error(
        `Only ${product.stock} units available for ${product.title}`
      );
    }
  }

  /*
  ====================================
  ORDER ITEMS
  ====================================
  */

  const orderItems =
    cartItems.map((item) => {
      const product =
        item.product;

      const price =
        product.salePrice > 0
          ? product.salePrice
          : product.price;

      const itemSubtotal =
        price * item.quantity;

      subtotal += itemSubtotal;

      return {
        product: product._id,

        title: product.title,

        image:
          product.images?.[0]?.url ||
          "",

        price,

        quantity:
          item.quantity,

        subtotal:
          itemSubtotal,
      };
    });

  /*
  ====================================
  COUPON
  ====================================
  */

  let coupon = null;
  let discount = 0;

  if (couponCode) {
    coupon =
      await Coupon.findOne({
        code:
          couponCode.toUpperCase(),
        isActive: true,
      });

    if (!coupon) {
      throw new Error(
        "Invalid coupon"
      );
    }

    const now = new Date();

    if (
      now < coupon.startDate ||
      now > coupon.endDate
    ) {
      throw new Error(
        "Coupon expired"
      );
    }

    if (
      subtotal <
      coupon.minimumOrderAmount
    ) {
      throw new Error(
        `Minimum order amount is ₹${coupon.minimumOrderAmount}`
      );
    }

    if (
      coupon.discountType ===
      "percentage"
    ) {
      discount =
        (subtotal *
          coupon.discountValue) /
        100;

      if (
        coupon.maximumDiscountAmount >
          0 &&
        discount >
          coupon.maximumDiscountAmount
      ) {
        discount =
          coupon.maximumDiscountAmount;
      }
    } else {
      discount =
        coupon.discountValue;
    }

    /*
    Prevent discount from
    exceeding subtotal.
    */

    discount = Math.min(
      discount,
      subtotal
    );
  }

  /*
  ====================================
  TAX
  ====================================

  GST is already included
  inside the product prices.
  */

  const tax = 0;

  /*
  ====================================
  SHIPPING
  ====================================

  Delhivery shipping calculation
  will be added later.
  */

  const shippingCharge = 0;

  /*
  ====================================
  TOTAL
  ====================================
  */

  const totalAmount =
    subtotal -
    discount +
    shippingCharge;

  if (totalAmount <= 0) {
    throw new Error(
      "Invalid order amount"
    );
  }

  /*
  ====================================
  CREATE PENDING ORDER
  ====================================

  We DO NOT:

  - reduce stock
  - increase sales
  - update coupon usage
  - clear cart

  until CashFree confirms
  successful payment.
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

      paymentMethod:
        "CashFree",

      paymentStatus:
        "pending",

      orderStatus:
        "pending",
    });

  return order;
};

/*
====================================
COMPLETE PAID ORDER
====================================

Called after CashFree confirms
successful payment.
====================================
*/

const completePaidOrder =
  async (orderId) => {
    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    /*
    Prevent duplicate processing.
    */

    if (
      order.paymentStatus ===
      "paid"
    ) {
      return order;
    }

    /*
    ====================================
    VALIDATE INVENTORY AGAIN
    ====================================
    */

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

    /*
    ====================================
    REDUCE STOCK
    ====================================
    */

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

    /*
    ====================================
    UPDATE COUPON USAGE
    ====================================
    */

    if (order.coupon) {
      await Coupon.findByIdAndUpdate(
        order.coupon,
        {
          $inc: {
            usedCount: 1,
          },
        }
      );
    }

    /*
    ====================================
    CLEAR CART
    ====================================
    */

    await Cart.deleteMany({
      user: order.user,
    });

    /*
    ====================================
    UPDATE PAYMENT
    ====================================
    */

    order.paymentStatus =
      "paid";

    order.orderStatus =
      "confirmed";

    await order.save();

    return order;
  };

/*
====================================
GET USER ORDERS
====================================
*/

const getOrders = async (
  userId
) => {
  return await Order.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .select(
      "totalAmount orderStatus paymentStatus paymentMethod createdAt"
    );
};

/*
====================================
GET ORDER BY ID
====================================
*/

const getOrderById = async (
  userId,
  orderId
) => {
  const order =
    await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .populate(
        "shippingAddress"
      )
      .populate(
        "coupon",
        "code discountType discountValue"
      );

  if (!order) {
    throw new Error(
      "Order not found"
    );
  }

  return order;
};

module.exports = {
  createOrder,
  completePaidOrder,
  getOrders,
  getOrderById,
};