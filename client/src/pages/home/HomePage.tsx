//import HeroCarousel from "./components/HeroCarousel";
import CategoryStrip from "./components/CategoryStrip";
import FeaturedProducts from "./components/FeaturedProducts";

function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* 
      Hero Carousel — currently disabled because it is not yet implemented. The carousel will be a horizontally scrollable component that displays featured products or promotions. It will include navigation controls and indicators for the current slide.
      
      <HeroCarousel /> 
      
      */}
      <CategoryStrip />
      <FeaturedProducts />
    </main>
  );
}

export default HomePage;

