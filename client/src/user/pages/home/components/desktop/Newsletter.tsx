import { FiMail, FiArrowRight } from "react-icons/fi";

function Newsletter() {
  return (
    <section className="px-4 py-6 lg:px-6">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#121826]
          px-6
          py-10
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
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-violet-600/15
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-20
            h-72
            w-72
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-3xl
            text-center
          "
        >
          {/* Icon */}
          <div
            className="
              mx-auto
              mb-5
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
            "
          >
            <FiMail size={21} />
          </div>

          {/* Heading */}
          <h2
            className="
              text-2xl
              font-bold
              leading-tight
              text-white
              sm:text-3xl
              lg:text-4xl
            "
          >
            Stay in the Loop
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-gray-400
              sm:text-base
            "
          >
            Get updates about new products, special offers,
            and the latest deals from The Digital Market.
          </p>

          {/* Newsletter form */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="
              mx-auto
              mt-7
              flex
              max-w-xl
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <div className="relative flex-1">
              <FiMail
                size={17}
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                required
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                  transition
                  focus:border-violet-500/50
                  focus:bg-white/[0.07]
                  focus:ring-2
                  focus:ring-violet-500/10
                "
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                px-6
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-violet-900/20
                transition
                duration-200
                hover:-translate-y-0.5
                hover:opacity-90
                active:translate-y-0
              "
            >
              Subscribe
              <FiArrowRight size={16} />
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-600">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;