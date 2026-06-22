const Order = require("./order_model");
const Cart = require("../carts/cart_model");
const Address = require("../address/address_model");
const Coupon = require("../coupons/coupon_model");
const Product = require("../products/products_model");

const createOrder = async (
  userId,
  {
    addressId,
    couponCode,
    paymentMethod,
  }
) => {
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
          product.images?.[0] || "",
        price,
        quantity: item.quantity,
        subtotal: itemSubtotal,
      };
    });

  // Coupon

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
        coupon
          .maximumDiscountAmount >
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
  }

  // Tax

  const tax = 0;

  // Shipping

  const shippingCharge = 0;

  const totalAmount =
    subtotal -
    discount +
    tax +
    shippingCharge;

  // Validate Inventory

for (const item of cartItems) {
  const product = item.product;

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
  
  // Create Order

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
        paymentMethod || "cod",
    });

  // Reduce Stock & Increase Sales

  for (const item of cartItems) {
    await Product.findByIdAndUpdate(
      item.product._id,
      {
        $inc: {
          stock: -item.quantity,
          salesCount:
            item.quantity,
        },
      }
    );
  }

  // Update Coupon Usage

  if (coupon) {
    coupon.usedCount += 1;

    await coupon.save();
  }

  // Clear Cart

  await Cart.deleteMany({
    user: userId,
  });

  return order;
};

// Get User Orders

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

// Get Order By ID

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

// Get All Orders (Admin)
const getAllOrders = async () => {
  return await Order.find()
    .populate(
      "user",
      "fullName email"
    )
    .sort({
      createdAt: -1,
    });
};

// Update Order Status (Admin)
const updateOrderStatus =
  async (
    orderId,
    orderStatus
  ) => {
    const order =
      await Order.findById(
        orderId
      );

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    order.orderStatus =
      orderStatus;

    if (
      orderStatus ===
      "delivered"
    ) {
      order.paymentStatus =
        "paid";
    }

    await order.save();

    return order;
  };

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};