
import { FiMail, FiArrowRight } from "react-icons/fi";

function MobileNewsletter() {
  return (
    <section className="px-4 py-3">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#121826]
          px-5
          py-5
          text-center
        "
      >
        {/* Background glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-violet-600/15
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -right-20
            h-56
            w-56
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon */}
          <div
            className="
              mb-2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
            "
          >
            <FiMail size={17} />
          </div>

          {/* Heading */}
          <h2
            className="
              text-xl
              font-bold
              leading-tight
              text-white
            "
          >
            Stay in the Loop
          </h2>

          {/* Description */}
          <p
            className="
              mt-1
              max-w-sm
              text-xs
              leading-5
              text-gray-400
            "
          >
            Get updates about new products, special
            offers, and the latest deals.
          </p>

          {/* Form */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="
              mt-3
              w-full
              max-w-sm
              space-y-2
            "
          >
            <div className="relative">
              <FiMail
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  pl-10
                  pr-4
                  text-xs
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
                flex
                h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                text-xs
                font-semibold
                text-white
                shadow-lg
                shadow-violet-900/20
                transition
                active:scale-[0.98]
              "
            >
              Subscribe
              <FiArrowRight size={15} />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="mt-2 text-[10px] text-gray-600">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MobileNewsletter;
