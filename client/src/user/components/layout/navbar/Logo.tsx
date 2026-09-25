import { Link } from "react-router-dom";

/**
 * The Digital Market (TDM) logo.
 *
 * Structure (all real, animation-ready SVG — no raster image, no CSS shapes):
 *
 * Logo
 * ├── Logo Mark        (tdm-mark)      — one <svg>, viewBox 0 0 573 563
 * │   ├── D            (tdm-d)         — <path>, stroked outline (traced
 * │   │                                  from source vector, stroke-width 61)
 * │   └── Checkmark    (tdm-check)     — <path>, filled chevron (traced
 * │                                       from source vector, #6645FA)
 * ├── Divider          (tdm-divider)   — one <svg>, viewBox 0 0 80 446,
 * │                                       tapered organic bar (tdm-divider-line)
 * └── Wordmark         (tdm-wordmark)  — one <svg>, viewBox 0 0 260 190
 *     ├── THE          (tdm-wordmark-top)
 *     ├── DIGITAL      (tdm-wordmark-middle)
 *     └── MARKET       (tdm-wordmark-bottom)
 *
 * The mark, divider, and wordmark are separate <svg> elements (rather than
 * one nested SVG) so the wordmark can be hidden on small screens with plain
 * Tailwind classes without uniformly scaling down the mark as well. Each
 * internal shape keeps its own class/id so individual pieces (the D, the
 * checkmark, each wordmark line) can be targeted later with CSS transitions,
 * stroke-dasharray draw-ins, or Framer Motion — no redesign needed.
 *
 * The D, divider, and wordmark are drawn in `currentColor` (not a hardcoded
 * black) so the logo can sit on either a light or dark navbar. The
 * checkmark stays the fixed brand blue in both cases. Pass `theme="dark"`
 * (the default) when the logo sits on a dark/black background — this
 * renders the D/divider/wordmark in white, matching the reference mark on
 * black. Pass `theme="light"` for a light background, which renders them
 * in black.
 */
interface LogoProps {
  theme?: "dark" | "light";
}

function Logo({ theme = "dark" }: LogoProps) {
  const inkColorClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <Link
      to="/"
      aria-label="The Digital Market"
      className={`
        tdm-logo
        group
        inline-flex
        shrink-0
        select-none
        items-center
        gap-2
        sm:gap-3
        rounded-lg
        outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-600
        focus-visible:ring-offset-2
        ${inkColorClass}
      `}
    >
      {/* =========================
          LOGO MARK — always visible
          viewBox tightly cropped (10px pad) around the traced D + check
          geometry from the source vectors, so translate() offsets below
          are the source bounding-box positions shifted by (-153, -66).
      ========================== */}
      <svg
        className="
          tdm-mark
          h-10 w-10
          sm:h-11 sm:w-11
          shrink-0
          overflow-visible
          transition-transform
          duration-200
          ease-out
          group-hover:scale-[1.03]
        "
        viewBox="0 0 573 563"
        fill="none"
        aria-hidden="true"
      >
        {/* D — open-top stroked outline, follows theme via currentColor */}
        <g transform="translate(10 65)">
          <path
            id="tdm-d"
            className="tdm-d"
            d="M130 30.5H112H30.5V454.5C107.833 458.833 250.5 479.5 314.5 367.5C359.237 289.211 353.167 205.5 346.5 174.5"
            stroke="currentColor"
            strokeWidth="61"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Checkmark — crosses the D's open top, fixed brand blue-violet */}
        <g transform="translate(135 10)">
          <path
            id="tdm-check"
            className="tdm-check"
            d="M410.929 2.05685C413.313 0.365528 416.327 -0.308979 419.271 0.131064C422.216 0.574216 424.85 2.09534 426.631 4.41134C428.412 6.72736 429.205 9.66352 428.876 12.6242C428.545 15.5821 427.118 18.3226 424.87 20.1916C418.403 25.5646 411.935 30.9378 405.468 36.3108L172.914 229.504L155.491 241.88L141.901 227.797L28.6056 126.895C22.3267 121.303 16.0476 115.71 9.76871 110.118C3.72076 104.738 0.164172 97.2408 0.00601634 89.1496C-0.159236 81.0662 3.08655 73.05 8.90543 66.9934C14.7246 60.9367 22.6057 57.3721 30.6896 57.2141C38.7803 57.0487 46.4123 60.3025 52.0304 66.1301C57.8692 72.1804 63.7083 78.2311 69.547 84.2815C100.134 115.977 130.721 147.672 161.308 179.367C237.66 125.133 314.012 70.8988 390.363 16.6643C397.218 11.795 404.074 6.92608 410.929 2.05685Z"
            fill="#6645FA"
          />

          <path
            id="tdm-divider-line"
            className="tdm-divider-line"
            d="M43.5322 0.294277C35.9078 0.196186 28.2835 0.0980949 20.6591 3.55853e-06C18.026 7.09231 15.647 14.1879 13.5222 21.2867C5.02284 49.6821 0.58984 78.1298 0.223173 106.63C-1.06016 206.38 3.19123 306.201 12.9774 406.093C13.6764 413.229 14.4036 420.364 15.1591 427.5C22.7835 427.598 30.4078 427.696 38.0322 427.794C38.971 420.68 39.8816 413.566 40.7639 406.451C53.1167 306.843 59.9348 207.164 61.2181 107.415C61.5848 78.9145 57.8851 50.3622 50.1191 21.7576C48.1776 14.6064 45.982 7.45198 43.5322 0.294277Z"
            transform="translate(345 115)"
            fill="currentColor"
            
          />
        </g>

        
      </svg>

      {/* =========================
          WORDMARK — hidden on small screens, mark stays visible
      ========================== */}
      <svg
        className="tdm-wordmark hidden h-10 shrink-0 sm:block sm:h-11 md:h-12"
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
  );
}

export default Logo;
