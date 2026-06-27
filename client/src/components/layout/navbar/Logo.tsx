import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          via-blue-500
          to-cyan-500
          font-bold
          text-white
          shadow-lg
        "
      >
        TDM
      </div>

      <span
        className="
          hidden md:block
          text-lg
          font-bold
          tracking-tight
        "
      >
        The Digital Market
      </span>
    </Link>
  );
}

export default Logo;