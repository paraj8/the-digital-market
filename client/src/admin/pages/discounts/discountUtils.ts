import type {
  Discount,
  DiscountPayload,
} from "../../../shared/types/discount";

export interface DiscountFormValues {
  name: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  scope: "all" | "products" | "categories";
  products: string[];
  categories: string[];
  minimumOrderAmount: number;
  maximumDiscountAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export type DiscountStatus = "Active" | "Scheduled" | "Expired" | "Inactive";

export const getDiscountStatus = (discount: Discount): DiscountStatus => {
  const now = Date.now();
  if (new Date(discount.endDate).getTime() < now) return "Expired";
  if (!discount.isActive) return "Inactive";
  if (new Date(discount.startDate).getTime() > now) return "Scheduled";
  return "Active";
};

export const getDiscountProductIds = (discount: Discount) =>
  discount.products.flatMap((product) =>
    typeof product === "string" ? [product] : product ? [product._id] : []
  );

export const getDiscountCategoryIds = (discount: Discount) =>
  discount.categories.flatMap((category) =>
    typeof category === "string" ? [category] : category ? [category._id] : []
  );

const dateInputValue = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
};

export const createDefaultDiscountForm = (): DiscountFormValues => {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 7);
  return {
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: 10,
    scope: "all",
    products: [],
    categories: [],
    minimumOrderAmount: 0,
    maximumDiscountAmount: 0,
    startDate: dateInputValue(now.toISOString()),
    endDate: dateInputValue(end.toISOString()),
    isActive: true,
  };
};

export const mapDiscountToForm = (discount: Discount): DiscountFormValues => ({
  name: discount.name,
  description: discount.description ?? "",
  discountType: discount.discountType,
  discountValue: discount.discountValue,
  scope: discount.scope,
  products: getDiscountProductIds(discount),
  categories: getDiscountCategoryIds(discount),
  minimumOrderAmount: discount.minimumOrderAmount ?? 0,
  maximumDiscountAmount: discount.maximumDiscountAmount ?? 0,
  startDate: dateInputValue(discount.startDate),
  endDate: dateInputValue(discount.endDate),
  isActive: discount.isActive,
});

export const buildDiscountPayload = (values: DiscountFormValues): DiscountPayload => ({
  ...values,
  name: values.name.trim(),
  description: values.description.trim(),
  discountValue: Number(values.discountValue),
  products: values.scope === "products" ? values.products : [],
  categories: values.scope === "categories" ? values.categories : [],
  minimumOrderAmount: Number(values.minimumOrderAmount),
  maximumDiscountAmount: Number(values.maximumDiscountAmount),
  startDate: new Date(`${values.startDate}T00:00:00`).toISOString(),
  endDate: new Date(`${values.endDate}T23:59:59.999`).toISOString(),
});

export const validateDiscountForm = (values: DiscountFormValues) => {
  const errors: Record<string, string> = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!["percentage", "fixed"].includes(values.discountType)) {
    errors.discountType = "Select a discount type.";
  }

  const amount = Number(values.discountValue);
  if (!Number.isFinite(amount) || amount <= 0) {
    errors.discountValue = "Discount value must be greater than 0.";
  } else if (values.discountType === "percentage" && amount > 100) {
    errors.discountValue = "Percentage discount cannot exceed 100%.";
  }

  const minimum = Number(values.minimumOrderAmount);
  if (!Number.isFinite(minimum) || minimum < 0) {
    errors.minimumOrderAmount = "Minimum order amount cannot be negative.";
  }
  const maximum = Number(values.maximumDiscountAmount);
  if (!Number.isFinite(maximum) || maximum < 0) {
    errors.maximumDiscountAmount = "Maximum discount cannot be negative.";
  }

  if (!values.startDate) errors.startDate = "Start date is required.";
  if (!values.endDate) errors.endDate = "End date is required.";
  if (values.startDate && values.endDate && values.endDate < values.startDate) {
    errors.endDate = "End date cannot be before the start date.";
  }
  if (values.scope === "products" && values.products.length === 0) {
    errors.products = "Select at least one product.";
  }
  if (values.scope === "categories" && values.categories.length === 0) {
    errors.categories = "Select at least one category.";
  }
  return errors;
};

export const getDiscountScopeLabel = (discount: Discount) => {
  if (discount.scope === "products") return `${discount.products.filter(Boolean).length} Products`;
  if (discount.scope === "categories") return `${discount.categories.filter(Boolean).length} Categories`;
  return "All Products";
};

export const getDiscountValueLabel = (discount: Pick<Discount, "discountType" | "discountValue">) =>
  discount.discountType === "percentage"
    ? `${discount.discountValue}%`
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(discount.discountValue);
