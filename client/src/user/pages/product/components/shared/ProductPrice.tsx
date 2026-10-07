interface ProductPriceProps {
  price: number;
  salePrice: number;
  className?: string;
}

function ProductPrice({
  price,
  salePrice,
  className = "",
}: ProductPriceProps) {
  const hasDiscount =
    salePrice > 0 && salePrice < price;
  const displayPrice = salePrice > 0 ? salePrice : price;
  const discount = hasDiscount ? price - salePrice : 0;
  const discountPercent = hasDiscount
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-white">
          {formatPrice(displayPrice)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg text-slate-400">
              MRP{" "}
              <span className="line-through">
                {formatPrice(price)}
              </span>
            </span>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>
      {hasDiscount && (
        <p className="mt-2 text-sm font-medium text-emerald-300">
          You Save {formatPrice(discount)}
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
