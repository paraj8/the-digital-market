interface ProductCardPriceProps {
  price: number;
  salePrice: number;
}

function ProductCardPrice({
  price,
  salePrice,
}: ProductCardPriceProps) {
  const displayPrice =
    salePrice > 0
      ? salePrice
      : price;

  const hasDiscount =
    salePrice > 0 &&
    salePrice < price;

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="text-base font-bold">
        ₹{displayPrice}
      </span>

      {hasDiscount && (
        <span
          className="
            text-xs
            text-slate-500
            line-through
          "
        >
          ₹{price}
        </span>
      )}
    </div>
  );
}

export default ProductCardPrice;