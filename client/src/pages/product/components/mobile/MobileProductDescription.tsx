interface MobileProductDescriptionProps {
  description: string;
  shortDescription: string;
}

function MobileProductDescription({
  description,
  shortDescription,
}: MobileProductDescriptionProps) {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#121826] p-4">
      <h2 className="mb-3 text-lg font-semibold">
        Description
      </h2>
      <p className="max-w-prose text-sm leading-7 text-slate-300">
        {description || shortDescription}
      </p>
    </section>
  );
}

export default MobileProductDescription;
