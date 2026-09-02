import {
  useMemo,
  useState,
} from "react";

import {
  useMutation,
} from "@tanstack/react-query";

import { useCart } from "../../cart/hooks/useCart";
import { useProduct } from "../../products/hooks/useProduct";
import { useAddresses } from "../../addresses/hooks/useAddresses";

import {
  createCheckoutOrder,
} from "../api/checkoutApi";

import type {
  CheckoutAddress,
  CheckoutItem,
  CheckoutSummary,
  PaymentMethod,
} from "../types/checkout";

interface CheckoutState {
  mode?: "buyNow" | "cart";
  productId?: string;
  productSlug?: string;
  quantity?: number;
}

export function useCheckout(
  state?: CheckoutState
) {
  /*
  ====================================
  CHECKOUT MODE
  ====================================
  */

  const isBuyNow =
    state?.mode === "buyNow";

  /*
  ====================================
  CART
  ====================================
  */

  const {
    data: cart,
    isLoading: isCartLoading,
    error: cartError,
  } = useCart();

  /*
  ====================================
  BUY NOW PRODUCT
  ====================================
  */

  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useProduct(
    isBuyNow
      ? state?.productSlug || ""
      : ""
  );

  /*
  ====================================
  ADDRESSES
  ====================================
  */

  const {
    data: savedAddresses = [],
    isLoading: isAddressesLoading,
    error: addressesError,
  } = useAddresses();

  /*
  ====================================
  CHECKOUT ITEMS
  ====================================
  */

  const items =
    useMemo<CheckoutItem[]>(
      () => {
        /*
        ====================================
        BUY NOW
        ====================================
        */

        if (isBuyNow) {
          if (!product) {
            return [];
          }

          const quantity =
            state?.quantity &&
            state.quantity > 0
              ? state.quantity
              : 1;

          const salePrice =
            product.salePrice > 0
              ? product.salePrice
              : product.price;

          return [
            {
              productId:
                product._id,

              title:
                product.title,

              slug:
                product.slug,

              image:
                product.images?.[0]?.url ||
                "https://placehold.co/300x300",

              brand:
                product.brand,

              price:
                product.price,

              salePrice,

              quantity,
            },
          ];
        }

        /*
        ====================================
        CART
        ====================================
        */

        if (!cart) {
          return [];
        }

        return cart.items.map(
          (item) => {
            const product =
              item.product;

            const salePrice =
              product.salePrice > 0
                ? product.salePrice
                : product.price;

            return {
              productId:
                product._id,

              title:
                product.title,

              slug:
                product.slug,

              image:
                product.images?.[0]?.url ||
                "https://placehold.co/300x300",

              brand:
                product.brand,

              price:
                product.price,

              salePrice,

              quantity:
                item.quantity,
            };
          }
        );
      },
      [
        isBuyNow,
        product,
        cart,
        state?.quantity,
      ]
    );

  /*
  ====================================
  ADDRESSES
  ====================================
  */

  const addresses =
    useMemo<CheckoutAddress[]>(
      () =>
        savedAddresses.map(
          (address) => ({
            _id:
              address._id,

            fullName:
              address.fullName,

            phone:
              address.phone,

            addressLine1:
              address.addressLine1,

            addressLine2:
              address.addressLine2,

            city:
              address.city,

            state:
              address.state,

            postalCode:
              address.postalCode,

            country:
              address.country,

            isDefault:
              address.isDefault,
          })
        ),
      [savedAddresses]
    );

  /*
  ====================================
  SELECTED ADDRESS
  ====================================
  */

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] =
    useState<string | null>(
      null
    );

  const defaultAddress =
    addresses.find(
      (address) =>
        address.isDefault
    ) ??
    addresses[0];

  const effectiveSelectedAddressId =
    selectedAddressId ??
    defaultAddress?._id ??
    null;

  const selectedAddress =
    addresses.find(
      (address) =>
        address._id ===
        effectiveSelectedAddressId
    ) ?? null;

  /*
  ====================================
  PAYMENT METHOD
  ====================================
  */

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<PaymentMethod>(
      "CashFree"
    );

  /*
  ====================================
  SUMMARY
  ====================================
  */

  const summary =
    useMemo<CheckoutSummary>(
      () => {
        const subtotal =
          items.reduce(
            (sum, item) =>
              sum +
              item.salePrice *
                item.quantity,
            0
          );

        const discount =
          items.reduce(
            (sum, item) =>
              sum +
              (item.price -
                item.salePrice) *
                item.quantity,
            0
          );

        /*
        GST is already included
        inside product prices.
        */

        const tax =
          Math.round(
            (subtotal * 18) /
              118
          );

        /*
        Shipping will be
        calculated later.
        */

        const shipping = 0;

        const total =
          subtotal +
          shipping;

        return {
          subtotal,
          shipping,
          discount,
          tax,
          total,
        };
      },
      [items]
    );

  /*
  ====================================
  CREATE PENDING ORDER
  ====================================
  */

  const createOrderMutation =
    useMutation({
      mutationFn:
        createCheckoutOrder,
    });

  /*
  ====================================
  PLACE ORDER
  ====================================
  */

  const placeOrder =
    async (
      couponCode?: string
    ) => {
      /*
      --------------------------------
      VALIDATE ITEMS
      --------------------------------
      */

      if (
        items.length === 0
      ) {
        throw new Error(
          "No items available for checkout"
        );
      }

      /*
      --------------------------------
      VALIDATE ADDRESS
      --------------------------------
      */

      if (
        !effectiveSelectedAddressId
      ) {
        throw new Error(
          "Please select a delivery address"
        );
      }

      /*
      --------------------------------
      VALIDATE BUY NOW DATA
      --------------------------------
      */

      if (
        isBuyNow &&
        !items[0]?.productId
      ) {
        throw new Error(
          "Product information is missing"
        );
      }

      /*
      Prevent duplicate
      requests.
      */

      if (
        createOrderMutation.isPending
      ) {
        return;
      }

      /*
      ====================================
      CREATE PENDING ORDER
      ====================================
      */

      const response =
        await createOrderMutation.mutateAsync(
          {
            addressId:
              effectiveSelectedAddressId,

            couponCode:
              couponCode?.trim() ||
              undefined,

            paymentMethod,

            /*
            --------------------------------
            CHECKOUT MODE
            --------------------------------
            */

            mode: isBuyNow
              ? "buyNow"
              : "cart",

            /*
            --------------------------------
            BUY NOW DATA
            --------------------------------

            These fields are only sent
            for Buy Now checkout.
            */

            ...(isBuyNow
              ? {
                  productId:
                    items[0].productId,

                  quantity:
                    items[0].quantity,
                }
              : {}),
          }
        );

      /*
      ====================================
      RETURN CREATED ORDER
      ====================================

      CashFree payment is handled
      separately by useCashfree().
      */

      return response.data;
    };

  /*
  ====================================
  LOADING
  ====================================
  */

  const isLoading =
    isBuyNow
      ? isProductLoading ||
        isAddressesLoading
      : isCartLoading ||
        isAddressesLoading;

  /*
  ====================================
  ERROR
  ====================================
  */

  const error =
    isBuyNow
      ? productError ||
        addressesError
      : cartError ||
        addressesError;

  /*
  ====================================
  ORDER CREATION ERROR
  ====================================
  */

  const orderError =
    createOrderMutation.error;

  /*
  ====================================
  RETURN
  ====================================
  */

  return {
    /*
    Checkout data
    */

    items,

    addresses,

    selectedAddress,

    summary,

    /*
    Address
    */

    selectedAddressId:
      effectiveSelectedAddressId,

    setSelectedAddressId,

    /*
    Payment
    */

    paymentMethod,

    setPaymentMethod,

    /*
    Order
    */

    placeOrder,

    creatingOrder:
      createOrderMutation.isPending,

    orderError,

    /*
    General loading/error
    */

    isLoading,

    error,
  };
}