import { useMemo, useState } from "react";

import type {
  CheckoutAddress,
  CheckoutItem,
  CheckoutSummary,
  PaymentMethod,
} from "../../types/checkout";

interface BuyNowState {
  mode?: "buyNow";
  productId?: string;
  quantity?: number;
}

export function useCheckout(state?: BuyNowState) {
  /*
  ====================================
  Temporary Mock Data
  Replace with API later
  ====================================
  */

  const isBuyNow =
  state?.mode === "buyNow";

const buyNowItems: CheckoutItem[] = [
  {
    productId: state?.productId || "1",

    title: "Samsung Galaxy S25 Ultra",

    slug: "samsung-galaxy-s25-ultra",

    image: "https://placehold.co/300x300",

    brand: "Samsung",

    price: 129999,

    salePrice: 119999,

    quantity: state?.quantity || 1,
  },
];

const cartItems: CheckoutItem[] = [
  {
    productId: "1",

    title: "Samsung Galaxy S25 Ultra",

    slug: "samsung-galaxy-s25-ultra",

    image: "https://placehold.co/300x300",

    brand: "Samsung",

    price: 129999,

    salePrice: 119999,

    quantity: 1,
  },
  {
    productId: "2",

    title: "Boat Airdopes",

    slug: "boat-airdopes",

    image: "https://placehold.co/300x300",

    brand: "Boat",

    price: 2999,

    salePrice: 2499,

    quantity: 2,
  },
];

const [items] = useState<CheckoutItem[]>(
  isBuyNow
    ? buyNowItems
    : cartItems
);

  const [addresses] = useState<
    CheckoutAddress[]
  >([
    {
      _id: "1",
      fullName: "Paraj Mandal",
      phone: "+91 9876543210",

      addressLine1:
        "Village Gokhul Chak",

      city: "Bhagalpur",

      state: "Bihar",

      postalCode: "812001",

      country: "India",

      isDefault: true,
    },
  ]);

  /*
  ====================================
  Selected Address
  ====================================
  */

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] = useState(
    addresses[0]?._id
  );

  /*
  ====================================
  Payment
  ====================================
  */

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<PaymentMethod>(
      "razorpay"
    );

  /*
  ====================================
  Summary
  ====================================
  */

  const summary =
    useMemo<CheckoutSummary>(() => {
      const subtotal = items.reduce(
        (sum, item) =>
          sum +
          item.salePrice *
            item.quantity,
        0
      );

      const shipping =
        subtotal > 5000 ? 0 : 99;

      const discount = items.reduce(
        (sum, item) =>
          sum +
          (item.price -
            item.salePrice) *
            item.quantity,
        0
      );

      const tax = Math.round(
        subtotal * 0.18
      );

      const total =
        subtotal +
        shipping +
        tax;

      return {
        subtotal,
        shipping,
        discount,
        tax,
        total,
      };
    }, [items]);

  /*
  ====================================
  Place Order
  ====================================
  */

  const placeOrder = () => {
    console.log({
      items,

      address:
        selectedAddressId,

      paymentMethod,

      summary,
    });

    alert(
      "Order Placed Successfully"
    );
  };

  return {
    /*
    Data
    */

    items,

    addresses,

    summary,

    /*
    Address
    */

    selectedAddressId,
    setSelectedAddressId,

    /*
    Payment
    */

    paymentMethod,
    setPaymentMethod,

    /*
    Actions
    */

    placeOrder,
  };
}