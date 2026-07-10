interface CheckoutHeaderProps {
  itemCount: number;
}

function CheckoutHeader({
  itemCount,
}: CheckoutHeaderProps) {
  return (
    <div className="mb-8">
      <h1
        className="
          text-3xl
          font-bold
          text-white
        "
      >
        Checkout
      </h1>

      <p
        className="
          mt-2
          text-slate-400
        "
      >
        Review your items, choose a delivery address,
        select a payment method, and place your order.
      </p>

      <div
        className="
          mt-4
          inline-flex
          items-center
          rounded-full
          border border-violet-500/30
          bg-violet-500/10
          px-4
          py-1.5
          text-sm
          text-violet-300
        "
      >
        {itemCount} {itemCount === 1 ? "Item" : "Items"}
      </div>
    </div>
  );
}

export default CheckoutHeader;