interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
}

function SectionHeader({
  title,
  subtitle,
  actionText,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && (
        <button
          className="
            text-sm
            font-medium
            text-violet-400
            hover:text-violet-300
          "
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default SectionHeader;