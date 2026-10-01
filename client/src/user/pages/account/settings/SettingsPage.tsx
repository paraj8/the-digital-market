import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SecurityCardDesktop from "./components/desktop/SecurityCard";
import SecurityCardMobile from "./components/mobile/SecurityCard";
import DangerZoneCard from "./components/shared/DangerZoneCard";
import PageHeading from "./components/shared/PageHeading";
import SettingsModal, { type SettingsModalType } from "./components/shared/SettingsModal";
import { useAccountSettings } from "./hooks/useAccountSettings";

function SettingsPage() {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoading, isError, retry, updateAccountUser } = useAccountSettings();
  const [activeModal, setActiveModal] = useState<SettingsModalType | null>(null);
  const closeModal = useCallback(() => setActiveModal(null), []);

  if (!isSignedIn) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
        <PageHeading />
        <p className="mt-7 text-sm text-slate-300">
          Sign in to manage your account settings. <button type="button" onClick={() => navigate("/login")} className="font-medium text-violet-300 hover:text-violet-200">Sign in</button>
        </p>
      </main>
    );
  }

  return (
    <>
      <main
        aria-hidden={activeModal !== null}
        className="mx-auto max-w-4xl px-4 py-7 sm:py-10"
      >
        <PageHeading />

        {isLoading ? (
          <p className="mt-7 text-sm text-slate-400">Loading account settings...</p>
        ) : isError || !user ? (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#121826] p-5">
            <p className="text-sm text-slate-300">Unable to load account settings.</p>
            <button
              type="button"
              onClick={retry}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-violet-300/50 hover:bg-white/[0.04]"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="mt-7 space-y-5">
            <div className="hidden sm:block">
              <SecurityCardDesktop user={user} onOpenModal={setActiveModal} />
            </div>
            <div className="sm:hidden">
              <SecurityCardMobile user={user} onOpenModal={setActiveModal} />
            </div>
            <DangerZoneCard />
          </div>
        )}
      </main>
      {user && activeModal && (
        <SettingsModal
          type={activeModal}
          user={user}
          onClose={closeModal}
          onUserUpdated={updateAccountUser}
        />
      )}
    </>
  );
}

export default SettingsPage;