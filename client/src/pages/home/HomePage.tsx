
import { useEffect, useState } from "react";

import HeroCarousel from "./components/HeroCarousel";
import CategoryStrip from "./components/CategoryStrip";
import FeaturedProducts from "./components/FeaturedProducts";
import BestSellers from "./components/BestSellers";
import CategorySection from "./components/CategorySection";
import NewArrivals from "./components/NewArrivals";
import Newsletter from "./components/Newsletter";
import PromotionalBanner from "./components/PromotionalBanner";

import MobileHeroCarousel from "./components/mobile/MobileHeroCarousel";
import MobileCategoryStrip from "./components/mobile/MobileCategoryStrip";
import MobileFeaturedProducts from "./components/mobile/MobileFeaturedProducts";
import MobileBestSellers from "./components/mobile/MobileBestSellers";
import MobileCategorySection from "./components/mobile/MobileCategorySection";
import MobileNewArrivals from "./components/mobile/MobileNewArrivals";
import MobileNewsletter from "./components/mobile/MobileNewsletter";

function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    mediaQuery.addEventListener(
      "change",
      updateIsMobile
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateIsMobile
      );
    };
  }, []);

  // Prevent rendering either version until
  // the viewport has been detected.
  if (!isMobile && typeof window !== "undefined") {
    const isDesktop = window.matchMedia(
      "(min-width: 768px)"
    ).matches;

    if (!isDesktop) {
      return null;
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-0 py-4 sm:px-4 sm:py-8">
      {isMobile ? (
        <>
          <MobileHeroCarousel />

          <MobileCategoryStrip />

          <MobileFeaturedProducts />

          <MobileBestSellers />

          <MobileCategorySection />

          <MobileNewArrivals />

          <MobileNewsletter />
        </>
      ) : (
        <>
          <HeroCarousel />

          <CategoryStrip />

          <FeaturedProducts />

          <BestSellers />

          <CategorySection />

          <NewArrivals />

          <PromotionalBanner />

          <Newsletter />
        </>
      )}
    </main>
  );
}

export default HomePage;
