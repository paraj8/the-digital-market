function ProductCardSkeleton() {
  return (
    <div
      className="
        animate-pulse
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#121826]
      "
    >
      <div className="aspect-square bg-slate-800" />

      <div className="space-y-3 p-3">
        <div className="h-4 rounded bg-slate-700" />

        <div className="h-3 w-1/2 rounded bg-slate-700" />

        <div className="h-4 w-1/3 rounded bg-slate-700" />

        <div className="h-8 rounded bg-slate-700" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;