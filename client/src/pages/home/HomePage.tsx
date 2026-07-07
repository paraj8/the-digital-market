import HeroCarousel from "./components/HeroCarousel";
import CategoryStrip from "./components/CategoryStrip";
import FeaturedProducts from "./components/FeaturedProducts";

function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <HeroCarousel />
      <CategoryStrip />
      <FeaturedProducts />
    </main>
  );
}

export default HomePage;

