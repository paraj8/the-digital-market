interface OrderStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  pending:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

  confirmed:
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",

  processing:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",

  shipped:
    "bg-violet-500/10 text-violet-400 border-violet-500/20",

  delivered:
    "bg-green-500/10 text-green-400 border-green-500/20",

  cancelled:
    "bg-red-500/10 text-red-400 border-red-500/20",
};

function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const normalizedStatus =
    status.toLowerCase();

  const style =
    statusStyles[normalizedStatus] ??
    "bg-gray-500/10 text-gray-400 border-gray-500/20";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-medium
        ${style}
      `}
    >
      {status}
    </span>
  );
}

export default OrderStatusBadge;

