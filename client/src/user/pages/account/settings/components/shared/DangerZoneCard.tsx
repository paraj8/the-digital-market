import { ShieldAlert } from "lucide-react";

function DangerZoneCard() {
  return (
    <section className="rounded-2xl border border-rose-400/25 bg-rose-400/[0.04] p-5 sm:p-6">
      <div className="flex items-center gap-2 text-rose-300">
        <ShieldAlert size={18} />
        <h2 className="font-semibold">Danger Zone</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Account deletion or deactivation options may be added here in the future.
      </p>
    </section>
  );
}

export default DangerZoneCard;