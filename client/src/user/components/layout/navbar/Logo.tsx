
import { Link } from "react-router-dom";

/**
 * The Digital Market (TDM) logo.
 *
 * Cyberpunk animation:
 * - Neon pink ambient glow
 * - Periodic pink shine sweep
 * - Animated purple → pink checkmark wave
 * - Neon checkmark glow
 * - Stronger glow on hover
 * - Respects prefers-reduced-motion
 */
interface LogoProps {
  theme?: "dark" | "light";
}

function Logo({ theme = "dark" }: LogoProps) {
  const inkColorClass =
    theme === "dark" ? "text-white" : "text-black";

  return (
    <>
      <style>
        {`
          /* =========================================
             TDM CYBERPUNK LOGO
          ========================================= */

          .tdm-logo {
            --tdm-purple: #6645fa;
            --tdm-pink: #ff2bd6;
            --tdm-hot-pink: #ff4fd8;
          }

          /* -----------------------------------------
             Ambient neon pink glow
          ----------------------------------------- */

          .tdm-logo .tdm-mark {
            filter:
              drop-shadow(0 0 2px rgba(255, 43, 214, 0.35))
              drop-shadow(0 0 5px rgba(255, 43, 214, 0.16));

            transition:
              filter 300ms ease,
              transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .tdm-logo:hover .tdm-mark {
            filter:
              drop-shadow(0 0 3px rgba(255, 43, 214, 0.8))
              drop-shadow(0 0 8px rgba(255, 43, 214, 0.42))
              drop-shadow(0 0 18px rgba(255, 43, 214, 0.2));
          }

          /* -----------------------------------------
             Checkmark
             Purple → Pink animated neon wave
          ----------------------------------------- */

          .tdm-logo .tdm-check {
            filter:
              drop-shadow(0 0 2px rgba(102, 69, 250, 0.9))
              drop-shadow(0 0 5px rgba(255, 43, 214, 0.45));

            animation:
              tdm-check-glow 3.8s ease-in-out infinite;
          }

          @keyframes tdm-check-glow {
            0%,
            100% {
              filter:
                drop-shadow(0 0 2px rgba(102, 69, 250, 0.9))
                drop-shadow(0 0 5px rgba(255, 43, 214, 0.4));
            }

            50% {
              filter:
                drop-shadow(0 0 3px rgba(102, 69, 250, 1))
                drop-shadow(0 0 8px rgba(255, 43, 214, 0.75))
                drop-shadow(0 0 15px rgba(255, 43, 214, 0.3));
            }
          }

          /* -----------------------------------------
             Cyberpunk shine sweep
          ----------------------------------------- */

          .tdm-logo .tdm-shine {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0;

            animation:
              tdm-shine-sweep 5.5s
              cubic-bezier(0.4, 0, 0.2, 1)
              infinite;
          }

          @keyframes tdm-shine-sweep {
            0%,
            60% {
              transform: translateX(-115%);
              opacity: 0;
            }

            64% {
              opacity: 0.65;
            }

            69% {
              opacity: 0.95;
            }

            74% {
              transform: translateX(115%);
              opacity: 0;
            }

            100% {
              transform: translateX(115%);
              opacity: 0;
            }
          }

          /* -----------------------------------------
             Wordmark subtle neon response
          ----------------------------------------- */

          .tdm-logo .tdm-wordmark {
            transition:
              filter 300ms ease,
              opacity 300ms ease;
          }

          .tdm-logo:hover .tdm-wordmark {
            filter:
              drop-shadow(0 0 3px rgba(255, 43, 214, 0.25));
          }

          /* -----------------------------------------
             Reduced motion
          ----------------------------------------- */

          @media (prefers-reduced-motion: reduce) {
            .tdm-logo .tdm-check,
            .tdm-logo .tdm-shine,
            .tdm-logo .tdm-check-gradient-wave {
              animation: none;
            }

            .tdm-logo .tdm-shine {
              display: none;
            }

            .tdm-logo .tdm-mark {
              transition: none;
            }
          }
        `}
      </style>

      <Link
        to="/"
        aria-label="The Digital Market"
        className={`
          tdm-logo
          group
          relative
          inline-flex
          shrink-0
          select-none
          items-center
          gap-2
          overflow-visible
          rounded-lg
          outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-600
          focus-visible:ring-offset-2
          ${inkColorClass}
        `}
      >
        {/* =========================================
            LOGO MARK
        ========================================== */}

        <svg
          className="
            tdm-mark
            relative
            h-10
            w-auto
            shrink-0
            overflow-visible
            transition-transform
            duration-300
            ease-out
            group-hover:scale-[1.025]
          "
          viewBox="0 0 748 608"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            {/* =====================================
                CHECKMARK PURPLE → PINK WAVE
            ===================================== */}

            <linearGradient
              id="tdm-check-gradient"
              className="tdm-check-gradient-wave"
              gradientUnits="userSpaceOnUse"
              x1="-520"
              y1="0"
              x2="-20"
              y2="0"
              spreadMethod="pad"
            >
              <stop
                offset="0%"
                stopColor="#6645FA"
              />

              <stop
                offset="30%"
                stopColor="#8B45FA"
              />

              <stop
                offset="52%"
                stopColor="#FF2BD6"
              />

              <stop
                offset="72%"
                stopColor="#FF4FD8"
              />

              <stop
                offset="100%"
                stopColor="#6645FA"
              />

              {/* The gradient itself travels across
                  the checkmark, creating the wave. */}

              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="
                  -520 0;
                  420 0;
                  -520 0
                "
                dur="3.6s"
                repeatCount="indefinite"
                calcMode="easeInOut"
              />
            </linearGradient>

            {/* ---------------------------------------
                Shine gradient
            --------------------------------------- */}

            <linearGradient
              id="tdm-shine-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="#ff2bd6"
                stopOpacity="0"
              />

              <stop
                offset="42%"
                stopColor="#ff2bd6"
                stopOpacity="0"
              />

              <stop
                offset="50%"
                stopColor="#ffffff"
                stopOpacity="0.95"
              />

              <stop
                offset="55%"
                stopColor="#ff4fd8"
                stopOpacity="0.8"
              />

              <stop
                offset="100%"
                stopColor="#ff2bd6"
                stopOpacity="0"
              />
            </linearGradient>

            {/* ---------------------------------------
                Shine mask
            --------------------------------------- */}

            <mask id="tdm-shine-mask">
              <rect
                x="-200"
                y="-100"
                width="1200"
                height="900"
                fill="black"
              />

              <rect
                className="tdm-shine"
                x="-180"
                y="-150"
                width="110"
                height="900"
                rx="55"
                fill="url(#tdm-shine-gradient)"
                transform="rotate(18 374 304)"
              />
            </mask>
          </defs>

          {/* =========================================
              MAIN LOGO SHAPES
          ========================================== */}

          {/* Top bar */}

          <g transform="translate(5 83)">
            <path
              id="tdm-bar"
              className="tdm-bar"
              d="M41.5 41.5L242.5 41.5"
              stroke="currentColor"
              strokeWidth="83"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* D */}

          <g transform="translate(112 83)">
            <path
              id="tdm-d"
              className="tdm-d"
              d="M141 41.5H123H41.5V465.5C118.833 469.833 261.5 490.5 325.5 378.5C370.237 300.211 364.167 216.5 357.5 185.5"
              stroke="currentColor"
              strokeWidth="83"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* =========================================
              CHECKMARK
              Purple → Pink animated gradient
          ========================================== */}

          <g transform="translate(245 5)">
            <path
              id="tdm-check"
              className="tdm-check"
              d="M477.08 2.41396C477.08 2.41417 477.08 2.4142 477.081 2.41403C479.846 0.43027 483.344 -0.362634 486.762 0.153589C486.766 0.154221 486.77 0.153944 486.774 0.154565C490.19 0.677014 493.244 2.46363 495.309 5.17996L495.499 5.43679C497.432 8.1142 498.285 11.4546 497.915 14.8225C497.53 18.2966 495.873 21.5137 493.265 23.7073L482.002 33.1702C478.248 36.3247 474.493 39.4781 470.738 42.6331L200.743 269.473L195.356 273.343C186.85 279.453 175.142 278.362 167.911 270.785L164.88 267.607L164.749 267.47L164.608 267.343L33.2109 148.991C25.944 142.446 18.6086 135.839 11.3418 129.294L11.3398 129.292L10.6904 128.694C4.0709 122.43 0.191192 113.891 0.00683594 104.699L0 103.761C0.0588202 94.5818 3.80053 85.5424 10.3384 78.6599C10.3387 78.6597 10.3387 78.6592 10.3384 78.659C10.3381 78.6587 10.3381 78.6582 10.3384 78.658L10.9785 78.0022C17.6628 71.2948 26.5234 67.3632 35.6055 67.177L36.5303 67.1702C45.5835 67.2297 54.089 71.0196 60.4043 77.6438L60.4062 77.6458L80.7422 98.9583C112.049 131.768 143.358 164.578 174.665 197.387C181.896 204.964 193.604 206.055 202.109 199.945C285.807 139.819 369.506 79.6928 453.203 19.5667C457.183 16.7073 461.161 13.849 465.141 10.9905C469.119 8.13306 473.099 5.27348 477.078 2.4155C477.078 2.41537 477.078 2.41521 477.078 2.41501L477.079 2.41412C477.079 2.41374 477.079 2.41366 477.08 2.41396Z"
              fill="url(#tdm-check-gradient)"
            />
          </g>

          {/* Divider */}

          <g transform="translate(622 124)">
            <path
              id="tdm-divider-line"
              className="tdm-divider-line"
              d="M52.688 -4.74362e-06C43.0631 0.0200892 33.4381 0.0401831 23.8131 0.060277C20.6214 8.05031 17.7506 16.0397 15.2006 24.0284C5.00064 55.9831 -0.0660172 87.9272 0.000649471 119.861C0.233983 231.627 7.45434 343.379 21.6617 455.117C22.6765 463.098 23.727 471.079 24.8131 479.06C34.4381 479.04 44.0631 479.02 53.688 479C54.7408 471.014 55.7579 463.029 56.7394 455.044C70.4801 343.248 77.2338 231.466 77.0005 119.7C76.9338 87.7664 71.7338 55.8438 61.4005 23.9319C58.8172 15.9539 55.913 7.97663 52.688 -4.74362e-06Z"
              fill="currentColor"
            />
          </g>

          {/* =========================================
              PINK SHINE LAYER
          ========================================== */}

          <g
            className="tdm-shine-layer"
            mask="url(#tdm-shine-mask)"
            pointerEvents="none"
            opacity="0.9"
          >
            <rect
              x="0"
              y="0"
              width="748"
              height="608"
              fill="url(#tdm-shine-gradient)"
            />
          </g>
        </svg>

        {/* =========================================
            WORDMARK
        ========================================== */}

        <svg
          className="
            tdm-wordmark
            hidden
            h-10
            w-auto
            shrink-0
            sm:block
            sm:h-11
            md:h-12
          "
          viewBox="0 0 260 190"
          fill="none"
          aria-hidden="true"
        >
          <text
            id="tdm-wordmark-top"
            className="tdm-wordmark-top"
            x="0"
            y="46"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="38"
            letterSpacing="2"
            fill="currentColor"
          >
            THE
          </text>

          <text
            id="tdm-wordmark-middle"
            className="tdm-wordmark-middle"
            x="0"
            y="104"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="38"
            letterSpacing="1"
            fill="currentColor"
          >
            DIGITAL
          </text>

          <text
            id="tdm-wordmark-bottom"
            className="tdm-wordmark-bottom"
            x="0"
            y="162"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="700"
            fontSize="38"
            letterSpacing="1"
            fill="currentColor"
          >
            MARKET
          </text>
        </svg>
      </Link>
    </>
  );
}

export default Logo;

