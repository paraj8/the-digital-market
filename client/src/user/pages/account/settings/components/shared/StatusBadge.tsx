function StatusBadge({
  verified,
  verifiedLabel,
  unverifiedLabel,
}: {
  verified: boolean;
  verifiedLabel: string;
  unverifiedLabel: string;
}) {
  return (
    <span className={`inline-flex max-w-full rounded-full border px-2 py-0.5 text-xs font-medium ${verified ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-amber-300/20 bg-amber-300/[0.08] text-amber-200"}`}>
      {verified ? verifiedLabel : unverifiedLabel}
    </span>
  );
}

export default StatusBadge;