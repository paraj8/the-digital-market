import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const inputClassName =
  "mt-1.5 w-full min-w-0 rounded-lg border border-white/10 bg-[#0b0f19] px-3.5 py-3 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60";

function PasswordInput({
  id,
  label,
  value,
  onChange,
  autoComplete,
  autoFocus = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  autoFocus?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm text-slate-300">{label}</label>
      <span className="relative mt-1.5 block">
        <input
          id={id}
          required
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          data-modal-autofocus={autoFocus ? "" : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={inputClassName}
        />
        <button
          type="button"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          title={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((current) => !current)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </span>
    </div>
  );
}

export default PasswordInput;