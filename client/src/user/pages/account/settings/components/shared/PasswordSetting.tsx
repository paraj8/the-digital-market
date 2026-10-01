type SettingLayout = "desktop" | "mobile";

const buttonBaseClassName =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-violet-300/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50";

function PasswordSetting({ layout, onOpen }: { layout: SettingLayout; onOpen: () => void }) {
  const isMobile = layout === "mobile";
  const buttonClassName = `${buttonBaseClassName} ${isMobile ? "w-full" : "shrink-0"}`;

  return (
    <section className="min-w-0 py-5 last:pb-0">
      <div className={isMobile ? "flex flex-col gap-3" : "flex items-center justify-between gap-5"}>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-slate-200">Password</h3>
          <p className="mt-1.5 text-sm text-white">••••••••</p>
          <p className="mt-1.5 text-sm leading-5 text-slate-400">
            Keep your account secure by using a strong password.
          </p>
        </div>
        <button type="button" className={buttonClassName} onClick={onOpen}>
          Change password
        </button>
      </div>
    </section>
  );
}

export default PasswordSetting;