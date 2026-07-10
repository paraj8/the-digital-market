import type { ReactNode } from "react";

import CheckoutCard from "./CheckoutCard";

interface CheckoutSectionProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

function CheckoutSection({
  title,
  subtitle,
  action,
  children,
}: CheckoutSectionProps) {
  return (
    <CheckoutCard>
      <div
        className="
          mb-5
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      {children}
    </CheckoutCard>
  );
}

export default CheckoutSection;