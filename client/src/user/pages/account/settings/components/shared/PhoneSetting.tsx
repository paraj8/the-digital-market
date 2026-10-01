import type { AccountUser } from "../../../../../features/account/api/accountApi";
import { maskPhoneNumber } from "../../utils/accountSettingsUtils";
import StatusBadge from "./StatusBadge";

type SettingLayout = "desktop" | "mobile";

const buttonBaseClassName =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-violet-300/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50";

function PhoneSetting({
  user,
  layout,
  onOpen,
}: {
  user: AccountUser;
  layout: SettingLayout;
  onOpen: () => void;
}) {
  const isMobile = layout === "mobile";
  const buttonClassName = `${buttonBaseClassName} ${isMobile ? "w-full" : "shrink-0"}`;

  return (
    <section className="min-w-0 border-b border-white/10 py-5 last:border-0 last:pb-0">
      <div className={isMobile ? "flex flex-col gap-3" : "flex items-center justify-between gap-5"}>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-slate-200">Phone number</h3>
          <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
            <span className="text-sm text-white">
              {user.phone ? maskPhoneNumber(user.phone) : "No phone number added"}
            </span>
            {user.phone && (
              <StatusBadge
                verified={user.phoneVerified}
                verifiedLabel="Verified"
                unverifiedLabel="Phone saved"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          className={buttonClassName}
          onClick={onOpen}
        >
          {user.phone ? "Change phone number" : "Add phone number"}
        </button>
      </div>
    </section>
  );
}

export default PhoneSetting;