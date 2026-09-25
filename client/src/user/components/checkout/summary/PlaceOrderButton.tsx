interface PlaceOrderButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function PlaceOrderButton({
  loading = false,
  disabled = false,
  onClick,
}: PlaceOrderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="
        mt-6
        w-full

        rounded-xl

        bg-gradient-to-r
        from-violet-600
        to-blue-600

        py-3

        text-sm
        font-semibold
        text-white

        transition

        hover:opacity-90

        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading
        ? "Placing Order..."
        : "Place Order"}
    </button>
  );
}

export default PlaceOrderButton;