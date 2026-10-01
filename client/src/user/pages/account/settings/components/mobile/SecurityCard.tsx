import type { AccountUser } from "../../../../../features/account/api/accountApi";
import type { SettingsModalType } from "../shared/SettingsModal";
import EmailSetting from "../shared/EmailSetting";
import PasswordSetting from "../shared/PasswordSetting";
import PhoneSetting from "../shared/PhoneSetting";

function SecurityCard({
  user,
  onOpenModal,
}: {
  user: AccountUser;
  onOpenModal: (type: SettingsModalType) => void;
}) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-[#121826] p-4">
      <header className="mb-1 border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold text-white">Account &amp; Security</h2>
        <p className="mt-1 text-sm leading-5 text-slate-400">Your contact details and password.</p>
      </header>
      <div className="min-w-0">
        <EmailSetting user={user} layout="mobile" onOpen={() => onOpenModal("email")} />
        <PhoneSetting user={user} layout="mobile" onOpen={() => onOpenModal("phone")} />
        <PasswordSetting layout="mobile" onOpen={() => onOpenModal("password")} />
      </div>
    </section>
  );
}

export default SecurityCard;