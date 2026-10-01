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
    <section className="rounded-2xl border border-white/10 bg-[#121826] p-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-lg font-semibold text-white">Account &amp; Security</h2>
        <p className="mt-1 text-sm text-slate-400">Manage your account details and sign-in security.</p>
      </div>
      <div className="divide-y divide-white/10">
        <EmailSetting user={user} layout="desktop" onOpen={() => onOpenModal("email")} />
        <PhoneSetting user={user} layout="desktop" onOpen={() => onOpenModal("phone")} />
        <PasswordSetting layout="desktop" onOpen={() => onOpenModal("password")} />
      </div>
    </section>
  );
}

export default SecurityCard;