import type { ReactNode } from "react";

interface CheckoutCardProps {
  children: ReactNode;
  className?: string;
}

function CheckoutCard({
  children,
  className = "",
}: CheckoutCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-white/10
        bg-[#121826]
        p-5
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default CheckoutCard;