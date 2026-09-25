
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";

function PromotionalBanner() {
  return (
    <section className="px-4 py-6 lg:px-6">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-violet-500/20
          bg-gradient-to-r
          from-violet-600/20
          via-blue-600/15
          to-cyan-500/10
          px-6
          py-10
          shadow-2xl
          sm:px-10
          lg:px-14
          lg:py-12
        "
      >
        {/* Background glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-violet-500/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            left-1/3
            h-64
            w-64
            rounded-full
            bg-blue-500/15
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Content */}
          <div className="max-w-2xl">
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-violet-400/20
                bg-violet-500/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-violet-300
              "
            >
              <FiZap size={14} />

              <span>Limited Time Offer</span>
            </div>

            <h2
              className="
                text-2xl
                font-bold
                leading-tight
                sm:text-3xl
                lg:text-4xl
              "
            >
              Upgrade Your Setup
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
                Without Breaking the Bank
              </span>
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-gray-400
                sm:text-base
              "
            >
              Discover quality electronics, accessories,
              packaging supplies, fashion, and more at
              prices made for you.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
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
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-violet-900/20
                transition
                duration-200
                hover:-translate-y-0.5
                hover:opacity-90
              "
            >
              Shop Now

              <FiArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotionalBanner;
