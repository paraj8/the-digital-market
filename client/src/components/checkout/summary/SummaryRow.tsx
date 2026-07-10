interface SummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  negative?: boolean;
}

function SummaryRow({
  label,
  value,
  highlight = false,
  negative = false,
}: SummaryRowProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        py-2
      "
    >
      <span
        className="
          text-sm
          text-slate-400
        "
      >
        {label}
      </span>

      <span
        className={`
          text-sm
          font-medium

          ${
            highlight
              ? "text-white"
              : negative
              ? "text-green-400"
              : "text-slate-200"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}

export default SummaryRow;