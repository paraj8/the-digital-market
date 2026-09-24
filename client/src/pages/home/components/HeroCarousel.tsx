
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShoppingBag,
  FiZap,
} from "react-icons/fi";

function HeroCarousel() {
  return (
    <section className="px-4 py-3 lg:px-6">
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
            -left-28
            -top-28
            h-80
            w-80
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
            -bottom-32
            -right-20
            h-80
            w-80
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
            [background-size:40px_40px]
          "
        />

        <div
          className="
            relative
            z-10
            flex
            min-h-[260px]
            items-center
            px-8
            py-8
            sm:px-10
            lg:px-14
          "
        >
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-400/20
                bg-violet-500/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-violet-300
                backdrop-blur-sm
              "
            >
              <FiZap size={13} />
              <span>Discover Something Better</span>
            </div>

            {/* Heading */}
            <h1
              className="
                max-w-2xl
                text-4xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                text-white
                lg:text-5xl
              "
            >
              Everything You Need.
              <span
                className="
                  ml-2
                  inline
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
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-gray-400
              "
            >
              Shop electronics, accessories, packaging
              supplies, fashion and more — carefully
              selected for everyday needs.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-blue-600
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-violet-950/30
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:opacity-90
                "
              >
                <FiShoppingBag size={16} />
                Shop Now
                <FiArrowRight size={15} />
              </Link>

              <Link
                to="/categories"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-300
                  backdrop-blur-sm
                  transition
                  duration-200
                  hover:border-violet-500/30
                  hover:bg-white/10
                "
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Decorative right-side visual */}
          <div
            className="
              pointer-events-none
              absolute
              -right-16
              top-1/2
              hidden
              h-64
              w-64
              -translate-y-1/2
              rounded-full
              border
              border-white/5
              lg:block
            "
          >
            <div
              className="
                absolute
                inset-7
                rounded-full
                border
                border-violet-400/10
              "
            />

            <div
              className="
                absolute
                inset-16
                rounded-full
                bg-gradient-to-br
                from-violet-500/20
                via-blue-500/10
                to-cyan-400/20
                blur-2xl
              "
            />

            <div
              className="
                absolute
                right-12
                top-16
                h-3
                w-3
                rounded-full
                bg-cyan-300/70
                shadow-lg
                shadow-cyan-400/50
              "
            />

            <div
              className="
                absolute
                bottom-20
                left-12
                h-2
                w-2
                rounded-full
                bg-violet-300/70
                shadow-lg
                shadow-violet-400/50
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
