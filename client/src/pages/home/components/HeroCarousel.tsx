import { Link } from "react-router-dom";

function HeroCarousel() {
  return (
    <section className="px-4 py-4 lg:px-6">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-gradient-to-r
          from-violet-700
          via-blue-700
          to-cyan-700
        "
      >
        {/* Glow */}

        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div
          className="
            relative
            flex
            min-h-[350px]
            flex-col
            justify-center
            px-8
            py-12
            lg:px-16
          "
        >
          <span
            className="
              mb-4
              w-fit
              rounded-full
              bg-white/20
              px-4
              py-2
              text-sm
              backdrop-blur
            "
          >
            Limited Time Offer
          </span>

          <h1
            className="
              max-w-2xl
              text-4xl
              font-extrabold
              md:text-6xl
            "
          >
            Up To 70% Off
            Electronics & Gadgets
          </h1>

          <p
            className="
              mt-4
              max-w-xl
              text-slate-100
            "
          >
            Explore trending gadgets,
            accessories and daily essentials
            at unbeatable prices.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/products"
              className="
                rounded-xl
                bg-white
                px-6
                py-3
                font-semibold
                text-black
                transition
                hover:scale-105
              "
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="
                rounded-xl
                border border-white/30
                px-6
                py-3
                font-semibold
                backdrop-blur
              "
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;