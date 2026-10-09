import type { Coupon } from "../../../shared/types/coupon";

export type CouponStatusFilter =
  | "all"
  | "active"
  | "inactive"
  | "expired"
  | "scheduled"
  | "usage-limit-reached";

export type CouponDiscountTypeFilter = "all" | "percentage" | "fixed";

export type CouponFormMode = "create" | "edit";

export interface CouponFormValues {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  scope: "all" | "products";
  products: string[];
  discountValue: number;
  minimumOrderAmount: number;
  maximumDiscountAmount: number;
  usageLimit: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const toDateInputValue = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value;

  return Number.isNaN(date.getTime())
    ? ""
    : new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
};

export const formatDate = (value: string | Date) => {
  const date = typeof value === "string" ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getCouponStatus = (coupon: Coupon):
  | "Inactive"
  | "Scheduled"
  | "Expired"
  | "Usage Limit Reached"
  | "Active" => {
  if (!coupon.isActive) {
    return "Inactive";
  }

  const now = new Date();
  const startDate = new Date(coupon.startDate);
  const endDate = new Date(coupon.endDate);

  if (now < startDate) {
    return "Scheduled";
  }

  if (now > endDate) {
    return "Expired";
  }

  if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
    return "Usage Limit Reached";
  }

  return "Active";
};

export const getUsageDisplay = (coupon: Coupon) => {
  if (coupon.usageLimit <= 0) {
    return `${coupon.usedCount} / Unlimited`;
  }

  return `${coupon.usedCount} / ${coupon.usageLimit}`;
};

export const getUsagePercentage = (coupon: Coupon) => {
  if (coupon.usageLimit <= 0) {
    return 0;
  }

  return Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100);
};

export const formatDiscountValue = (coupon: Coupon) => {
  if (coupon.discountType === "percentage") {
    return `${coupon.discountValue}%`;
  }

  return formatCurrency(coupon.discountValue);
};

export const getCouponProductIds = (coupon: Coupon) =>
  (coupon.products ?? []).flatMap((product) =>
    typeof product === "string" ? [product] : product ? [product._id] : []
  );

export const buildDefaultCouponForm = (): CouponFormValues => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  start.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 7);
  end.setHours(0, 0, 0, 0);

  return {
    code: "",
    description: "",
    discountType: "percentage",
    scope: "all",
    products: [],
    discountValue: 0,
    minimumOrderAmount: 0,
    maximumDiscountAmount: 0,
    usageLimit: 0,
    startDate: toDateInputValue(start),
    endDate: toDateInputValue(end),
    isActive: true,
  };
};

export const mapCouponToFormValues = (coupon: Coupon): CouponFormValues => ({
  code: coupon.code,
  description: coupon.description ?? "",
  discountType: coupon.discountType,
  scope: coupon.scope ?? "all",
  products: coupon.scope === "products" ? getCouponProductIds(coupon) : [],
  discountValue: coupon.discountValue,
  minimumOrderAmount: coupon.minimumOrderAmount,
  maximumDiscountAmount: coupon.maximumDiscountAmount,
  usageLimit: coupon.usageLimit,
  startDate: toDateInputValue(coupon.startDate),
  endDate: toDateInputValue(coupon.endDate),
  isActive: coupon.isActive,
});

export const buildCouponPayload = (values: CouponFormValues) => ({
  code: values.code.trim().toUpperCase(),
  description: values.description.trim(),
  discountType: values.discountType,
  scope: values.scope,
  products: values.scope === "products" ? values.products : [],
  discountValue: Number(values.discountValue),
  minimumOrderAmount: Number(values.minimumOrderAmount),
  maximumDiscountAmount:
    values.discountType === "fixed" ? 0 : Number(values.maximumDiscountAmount),
  usageLimit: Number(values.usageLimit),
  startDate: values.startDate,
  endDate: values.endDate,
  isActive: values.isActive,
});

export const validateCouponForm = (values: CouponFormValues) => {
  const errors: Record<string, string> = {};

  if (!values.code.trim()) {
    errors.code = "Coupon code is required.";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required.";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required.";
  }

  if (!values.endDate) {
    errors.endDate = "End date is required.";
  }

  if (values.startDate && values.endDate && values.endDate <= values.startDate) {
    errors.endDate = "End date must be after the start date.";
  }

  const discountValue = Number(values.discountValue);

  if (!Number.isFinite(discountValue) || discountValue <= 0) {
    errors.discountValue = "Discount value must be greater than 0.";
  }

  if (values.discountType === "percentage" && discountValue > 100) {
    errors.discountValue = "Percentage discount cannot exceed 100%.";
  }

  if (values.scope === "products" && values.products.length === 0) {
    errors.products = "Please select at least one product.";
  }

  const minimumOrderAmount = Number(values.minimumOrderAmount);
  if (!Number.isFinite(minimumOrderAmount) || minimumOrderAmount < 0) {
    errors.minimumOrderAmount = "Minimum order amount cannot be negative.";
  }

  if (values.discountType !== "fixed") {
    const maximumDiscountAmount = Number(values.maximumDiscountAmount);
    if (!Number.isFinite(maximumDiscountAmount) || maximumDiscountAmount < 0) {
      errors.maximumDiscountAmount = "Maximum discount cannot be negative.";
    }
  }

  const usageLimit = Number(values.usageLimit);
  if (!Number.isFinite(usageLimit) || usageLimit < 0) {
    errors.usageLimit = "Usage limit cannot be negative.";
  }

  return errors;
};
