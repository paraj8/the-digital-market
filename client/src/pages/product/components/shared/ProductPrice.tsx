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
  const displayPrice = salePrice > 0 ? salePrice : price;
  const discountPercent = salePrice > 0
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold">
          ₹{displayPrice}
        </span>

        {salePrice > 0 && (
          <>
            <span className="text-lg text-slate-500 line-through">
              ₹{price}
            </span>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
              {discountPercent}% OFF
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPrice;
