import type { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;

  icon: IconType;

  color?: string;

  change?: string;

  positive?: boolean;
}

function StatCard({
  title,
  value,

  icon: Icon,

  color = "text-violet-400",

  change,

  positive = true,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-2xl

        border
        border-white/10

        bg-slate-900

        p-6

        transition

        hover:border-violet-500/40
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-sm
              text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className={`
              mt-3

              text-3xl

              font-bold

              ${color}
            `}
          >
            {value}
          </h2>

          {change && (
            <p
              className={`
                mt-3

                text-sm

                ${
                  positive
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              {change}
            </p>
          )}
        </div>

        <div
          className="
            h-14
            w-14

            rounded-xl

            bg-slate-800

            flex
            items-center
            justify-center
          "
        >
          <Icon
            size={26}
            className={color}
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;