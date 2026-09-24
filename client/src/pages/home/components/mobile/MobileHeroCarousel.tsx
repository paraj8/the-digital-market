
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShoppingBag,
  FiZap,
} from "react-icons/fi";

function MobileHeroCarousel() {
  return (
    <section className="px-4 py-2">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#0d1320]
        "
      >
        {/* Background gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-violet-600/20
            via-blue-600/10
            to-cyan-500/10
          "
        />

        {/* Violet glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-44
            w-44
            rounded-full
            bg-violet-600/20
            blur-3xl
          "
        />

        {/* Cyan glow */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-16
            h-52
            w-52
            rounded-full
            bg-cyan-500/15
            blur-3xl
          "
        />

        {/* Decorative grid */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        <div
          className="
            relative
            z-10
            flex
            min-h-[195px]
            flex-col
            justify-center
            px-5
            py-5
          "
        >
          {/* Badge */}
          <div
            className="
              mb-2.5
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-full
              border
              border-violet-400/20
              bg-violet-500/10
              px-2.5
              py-1
              text-[10px]
              font-medium
              text-violet-300
            "
          >
            <FiZap size={11} />
            <span>Discover Something Better</span>
          </div>

          {/* Heading */}
          <h1
            className="
              max-w-[330px]
              text-2xl
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-white
            "
          >
            Everything You Need.
            <span
              className="
                block
                bg-gradient-to-r
                from-violet-400
                via-blue-400
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              All in One Market.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-2.5
              max-w-[315px]
              text-xs
              leading-5
              text-gray-400
            "
          >
            Shop electronics, accessories, packaging,
            fashion and more — all in one place.
          </p>

          {/* CTA */}
          <div
            className="
              mt-4
              flex
              gap-2.5
            "
          >
            <Link
              to="/products"
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                px-3
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-violet-950/30
                transition
                active:scale-[0.98]
              "
            >
              <FiShoppingBag size={14} />
              Shop Now
              <FiArrowRight size={14} />
            </Link>

            <Link
              to="/categories"
              className="
                inline-flex
                flex-1
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-3
                py-2.5
                text-xs
                font-medium
                text-gray-300
                transition
                active:scale-[0.98]
              "
            >
              Categories
            </Link>
          </div>

          {/* Decorative orb */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -right-24
              h-48
              w-48
              rounded-full
              border
              border-violet-400/10
            "
          >
            <div
              className="
                absolute
                inset-6
                rounded-full
                border
                border-cyan-400/10
              "
            />

            <div
              className="
                absolute
                inset-12
                rounded-full
                bg-gradient-to-br
                from-violet-500/20
                to-cyan-400/10
                blur-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileHeroCarousel;

