import HeroCarousel from "./components/HeroCarousel";
import CategoryStrip from "./components/CategoryStrip";
import FeaturedProducts from "./components/FeaturedProducts";

function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoryStrip />
      <FeaturedProducts />
    </>
  );
}

export default HomePage;