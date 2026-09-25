interface ProductDescriptionProps {
  description: string;
  shortDescription: string;
}

function ProductDescription({
  description,
  shortDescription,
}: ProductDescriptionProps) {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-[#121826] p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Description
      </h2>
      <p className="leading-7 text-slate-300">
        {description || shortDescription}
      </p>
    </div>
  );
}

export default ProductDescription;
