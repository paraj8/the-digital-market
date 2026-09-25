import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { addToCart } from "../../features/cart/api/cartApi";
import { useProduct } from "../../features/products/hooks/useProduct";
import { useAddToWishlist } from "../../features/wishlist/hooks/useAddToWishlist";
import { useRemoveFromWishlist } from "../../features/wishlist/hooks/useRemoveFromWishlist";
import { useWishlist } from "../../features/wishlist/hooks/useWishlist";
import type { WishlistItem } from "../../features/wishlist/types/wishlist";

import ProductBreadcrumbs from "./components/desktop/ProductBreadcrumbs";
import ProductDescription from "./components/desktop/ProductDescription";
import ProductDetailsCard from "./components/desktop/ProductDetailsCard";
import ProductGallery from "./components/desktop/ProductGallery";
import ProductInfo from "./components/desktop/ProductInfo";
import MobileProductActions from "./components/mobile/MobileProductActions";
import MobileProductBreadcrumbs from "./components/mobile/MobileProductBreadcrumbs";
import MobileProductDescription from "./components/mobile/MobileProductDescription";
import MobileProductDetailsCard from "./components/mobile/MobileProductDetailsCard";
import MobileProductGallery from "./components/mobile/MobileProductGallery";
import MobileProductInfo from "./components/mobile/MobileProductInfo";
import RelatedProducts from "./components/RelatedProducts";

function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProduct(slug || "");
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { data: wishlist = [] } = useWishlist();
  const addWishlist = useAddToWishlist();
  const removeWishlist = useRemoveFromWishlist();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast("Please login to continue", { icon: "🔐" });
      return;
    }

    if (!data) return;

    navigate("/checkout", {
      state: {
        mode: "buyNow",
        productId: data._id,
        productSlug: data.slug,
        quantity,
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

      setAddingToCart(true);
      await addToCart(data._id, quantity);
      toast.success("Product added to cart 🛒");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
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

  if (!isMobile && typeof window !== "undefined") {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (!isDesktop) {
      return null;
    }
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
            onQuantityChange={setQuantity}
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
          />
          <MobileProductDetailsCard product={data} />
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
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onWishlist={handleWishlist}
                addingToCart={addingToCart}
                isWishlisted={isWishlisted}
                wishlistPending={
                  addWishlist.isPending || removeWishlist.isPending
                }
              />
              <ProductDetailsCard product={data} />
            </div>
          </div>

          <ProductDescription
            description={data.description}
            shortDescription={data.shortDescription}
          />
        </>
      )}

      <RelatedProducts
        categoryId={data.category?._id}
        currentProductId={data._id}
      />
    </section>
  );
}

export default ProductDetailsPage;
