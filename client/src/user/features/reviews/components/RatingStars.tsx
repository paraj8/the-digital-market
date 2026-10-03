import type { ReviewRating } from "../types/review";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (value: ReviewRating) => void;
  disabled?: boolean;
}

function RatingStars({
  rating,
  size = "sm",
  interactive = false,
  onChange,
  disabled = false,
}: RatingStarsProps) {
  const starSize = size === "md" ? "text-2xl" : "text-xl";

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        const isActive = value <= rating;

        return interactive ? (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(value as ReviewRating)}
            className="transition hover:scale-110 disabled:cursor-not-allowed"
            aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
          >
            <span
              className={`${starSize} ${
                isActive ? "text-amber-400" : "text-slate-600"
              }`}
            >
              ★
            </span>
          </button>
        ) : (
          <span key={value} className={`${starSize} ${isActive ? "text-amber-400" : "text-slate-600"}`}>
            ★
          </span>
        );
      })}
    </div>
  );
}

export default RatingStars;
