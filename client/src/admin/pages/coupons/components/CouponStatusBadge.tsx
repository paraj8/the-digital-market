import type { Coupon } from "../../../../shared/types/coupon";
import { getCouponStatus } from "../couponUtils";

interface CouponStatusBadgeProps {
  coupon: Coupon;
}

const statusStyles: Record<string, string> = {
  Active: "border-green-500/20 bg-green-500/10 text-green-400",
  Inactive: "border-gray-500/20 bg-gray-500/10 text-gray-400",
  Expired: "border-red-500/20 bg-red-500/10 text-red-400",
  Scheduled: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  "Usage Limit Reached": "border-violet-500/20 bg-violet-500/10 text-violet-400",
};

function CouponStatusBadge({ coupon }: CouponStatusBadgeProps) {
  const status = getCouponStatus(coupon);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default CouponStatusBadge;
