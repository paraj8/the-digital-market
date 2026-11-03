/*
====================================
BUILD ORDER ITEMS
====================================
*/

const buildOrderItems = (
  checkoutItems
) => {
  let subtotal = 0;

  const orderItems =
    checkoutItems.map(
      (item) => {
        const product =
          item.product;
        const variant =
          item.variant ||
          (item.variantId
            ? product.variants.id(item.variantId)
            : null);
        const priceSource = variant || product;

        const price =
          priceSource.salePrice > 0
            ? priceSource.salePrice
            : priceSource.price;

        const itemSubtotal =
          price * item.quantity;

        subtotal += itemSubtotal;

        return {
          product:
            product._id,

          ...(variant
            ? {
                variantId: variant._id,
                attributes: Object.fromEntries(variant.attributes),
                sku: variant.sku,
              }
            : {
                sku: product.sku,
              }),

          title:
            product.title,

          image:
            product.images?.[0]?.url ||
            "",

          price,

          quantity:
            item.quantity,

          subtotal:
            itemSubtotal,
        };
      }
    );

  return {
    orderItems,
    subtotal,
  };
};

/*
====================================
CALCULATE ORDER TOTAL
====================================
*/

const calculateOrderTotal = ({
  subtotal,
  discount = 0,
  shippingCharge = 0,
}) => {
  const tax = 0;

  const totalAmount =
    subtotal -
    discount +
    shippingCharge;

  if (totalAmount <= 0) {
    throw new Error(
      "Invalid order amount"
    );
  }

  return {
    tax,
    totalAmount,
  };
};

module.exports = {
  buildOrderItems,
  calculateOrderTotal,
};