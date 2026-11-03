import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { addToCart } from "../../features/cart/api/cartApi";
import { useProduct } from "../../features/products/hooks/useProduct";
import { useAddToWishlist } from "../../features/wishlist/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../features/wishlist/hooks/useRemoveFromWishlist";
import { useWishlist } from "../../features/wishlist/hooks/useWishlist";
import type { WishlistItem } from "../../features/wishlist/types/wishlist";
import type { ProductVariant } from "../../../shared/types/product";

import ProductBreadcrumbs from "./components/desktop/ProductBreadcrumbs";
import ProductDescription from "./components/desktop/ProductDescription";
import ProductDetailsCard from "./components/desktop/ProductDetailsCard";
import ProductGallery from "./components/desktop/ProductGallery";
import ProductInfo from "./components/desktop/ProductInfo";
import ProductOffers from "./components/desktop/ProductOffers";
import MobileProductActions from "./components/mobile/MobileProductActions";
import MobileProductBreadcrumbs from "./components/mobile/MobileProductBreadcrumbs";
import MobileProductDescription from "./components/mobile/MobileProductDescription";
import MobileProductDetailsCard from "./components/mobile/MobileProductDetailsCard";
import MobileProductGallery from "./components/mobile/MobileProductGallery";
import MobileProductInfo from "./components/mobile/MobileProductInfo";
import MobileProductOffers from "./components/mobile/MobileProductOffers";
import RelatedProducts from "./components/RelatedProducts";
import ReviewList from "../../features/reviews/components/ReviewList";

function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProduct(slug || "");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 767px)").matches;
  });

  const [addingToCart, setAddingToCart] = useState(false);
  const [purchaseSelection, setPurchaseSelection] = useState<{
    productId: string | null;
    quantity: number;
    attributes: Record<string, string>;
  }>({
    productId: null,
    quantity: 1,
    attributes: {},
  });
  const currentProductId = data?._id ?? null;
  const isCurrentSelection =
    purchaseSelection.productId === currentProductId;
  const quantity = isCurrentSelection
    ? purchaseSelection.quantity
    : 1;
  const selectedAttributes = isCurrentSelection
    ? purchaseSelection.attributes
    : {};

  const variantAttributes = data?.variantAttributes?.length
    ? data.variantAttributes
    : data?.variants?.length
      ? Object.keys(data.variants[0].attributes).map((name) => ({
          name,
          values: [
            ...new Set(
              (data.variants ?? [])
                .map((variant) => variant.attributes[name])
                .filter(Boolean)
            ),
          ],
        }))
      : [];
  const selectedVariant: ProductVariant | null =
    data?.hasVariants &&
    variantAttributes.length > 0 &&
    Object.keys(selectedAttributes).length === variantAttributes.length
      ? (data.variants ?? []).find(
          (variant) =>
            variant.isActive &&
            variantAttributes.every(
              ({ name }) =>
                variant.attributes[name] === selectedAttributes[name]
            )
        ) ?? null
      : null;
  const canPurchase = Boolean(
    data?.isActive &&
      (!data.hasVariants ||
        (selectedVariant &&
          (!data.trackInventory ||
            data.allowBackorder ||
            selectedVariant.stock >= quantity))) &&
      (data.hasVariants ||
        !data.trackInventory ||
        data.allowBackorder ||
        data.stock >= quantity)
  );

  const handleQuantityChange = (nextQuantity: number) => {
    setPurchaseSelection((previous) => ({
      productId: currentProductId,
      quantity: nextQuantity,
      attributes:
        previous.productId === currentProductId
          ? previous.attributes
          : {},
    }));
  };

  const handleAttributeChange = (
    attributeName: string,
    value: string
  ) => {
    setPurchaseSelection((previous) => {
      const currentAttributes =
        previous.productId === currentProductId
          ? previous.attributes
          : {};
      const next = {
        ...currentAttributes,
        [attributeName]: value,
      };

      for (const { name } of variantAttributes) {
        if (name === attributeName || !next[name]) {
          continue;
        }
        const hasMatchingVariant = (data?.variants ?? []).some(
          (variant) =>
            variant.isActive &&
            variant.attributes[attributeName] === value &&
            Object.entries(next).every(
              ([selectedName, selectedValue]) =>
                selectedName === name ||
                variant.attributes[selectedName] === selectedValue
            )
        );
        if (!hasMatchingVariant) {
          delete next[name];
        }
      }

      return {
        productId: currentProductId,
        quantity:
          previous.productId === currentProductId
            ? previous.quantity
            : 1,
        attributes: next,
      };
    });
  };

  const { data: wishlist = [] } = useWishlist();
  const addWishlist = useAddToWishlist();
  const removeWishlist = useRemoveFromWishlist();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);

      return () => {
        mediaQuery.removeEventListener("change", updateIsMobile);
      };
    }

    mediaQuery.addListener(updateIsMobile);

    return () => {
      mediaQuery.removeListener(updateIsMobile);
    };
  }, []);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast("Please login to continue", { icon: "🔐" });
      return;
    }

    if (!data) return;
    if (!canPurchase) {
      toast.error(
        data.hasVariants
          ? "Select an available variant and quantity"
          : "The requested quantity is not available"
      );
      return;
    }

    navigate("/checkout", {
      state: {
        mode: "buyNow",
        productId: data._id,
        productSlug: data.slug,
        quantity,
        ...(selectedVariant?._id
          ? { variantId: selectedVariant._id }
          : {}),
      },
    });
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast("Please login to add items to cart", { icon: "🔐" });
        return;
      }

      if (!data) return;
      if (!canPurchase) {
        toast.error(
          data.hasVariants
            ? "Select an available variant and quantity"
            : "The requested quantity is not available"
        );
        return;
      }

      setAddingToCart(true);
      await addToCart(data._id, quantity, selectedVariant?._id);
      toast.success("Product added to cart 🛒");
    } catch (error) {
      console.error(error);
      toast.error(
        axios.isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ??
              "Failed to add product to cart"
          : error instanceof Error
            ? error.message
            : "Failed to add product to cart"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (error || !data) {
    return <div className="p-6">Product not found</div>;
  }

  const isWishlisted = wishlist.some(
    (item: WishlistItem) => item.product._id === data._id
  );

  const handleWishlist = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast("Please login first", { icon: "🔒" });
      return;
    }

    if (isWishlisted) {
      removeWishlist.mutate(data._id);
    } else {
      addWishlist.mutate(data._id);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      {isMobile ? (
        <>
          <MobileProductBreadcrumbs title={data.title} />
          <MobileProductGallery images={data.images} title={data.title} />
          <MobileProductInfo
            product={data}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            selectedAttributes={selectedAttributes}
            selectedVariant={selectedVariant}
            onAttributeChange={handleAttributeChange}
          />
          <MobileProductActions
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onWishlist={handleWishlist}
            addingToCart={addingToCart}
            isWishlisted={isWishlisted}
            wishlistPending={
              addWishlist.isPending || removeWishlist.isPending
            }
            canPurchase={canPurchase}
          />
          <MobileProductOffers productId={data._id} />
          <MobileProductDetailsCard
            product={data}
            selectedVariant={selectedVariant}
          />
          <MobileProductDescription
            description={data.description}
            shortDescription={data.shortDescription}
          />
        </>
      ) : (
        <>
          <div className="grid gap-10 lg:grid-cols-2">
            <ProductGallery images={data.images} title={data.title} />

            <div>
              <ProductBreadcrumbs title={data.title} />
              <ProductInfo
                product={data}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onWishlist={handleWishlist}
                addingToCart={addingToCart}
                isWishlisted={isWishlisted}
                wishlistPending={
                  addWishlist.isPending || removeWishlist.isPending
                }
                selectedAttributes={selectedAttributes}
                selectedVariant={selectedVariant}
                onAttributeChange={handleAttributeChange}
                canPurchase={canPurchase}
              />
              <ProductOffers productId={data._id} />
              <ProductDetailsCard
                product={data}
                selectedVariant={selectedVariant}
              />
            </div>
          </div>

          <ProductDescription
            description={data.description}
            shortDescription={data.shortDescription}
          />
        </>
      )}

      <ReviewList productId={data._id} />

      <RelatedProducts
        categoryId={data.category?._id}
        currentProductId={data._id}
      />
    </section>
  );
}

export default ProductDetailsPage;
