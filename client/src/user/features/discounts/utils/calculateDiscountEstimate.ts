import type { Discount } from "../../../../shared/types/discount";

export interface DiscountEstimateItem {
  productId: string;
  categoryId: string;
  sellingPrice: number;
  quantity: number;
}

const hasTargetId = (targets: Discount["products"], id: string) =>
  targets.some((target) => (typeof target === "string" ? target : target?._id) === id);

const hasCategoryId = (targets: Discount["categories"], id: string) =>
  targets.some((target) => (typeof target === "string" ? target : target?._id) === id);

export const calculateDiscountEstimate = (
  discounts: Discount[],
  items: DiscountEstimateItem[],
  remainingSubtotal = Number.POSITIVE_INFINITY
) => {
  let best: { discount: Discount; amount: number } | null = null;

  for (const discount of discounts) {
    const eligibleSubtotal = items.reduce((sum, item) => {
      const eligible =
        discount.scope === "all" ||
        (discount.scope === "products" && hasTargetId(discount.products, item.productId)) ||
        (discount.scope === "categories" && hasCategoryId(discount.categories, item.categoryId));
      return eligible ? sum + item.sellingPrice * item.quantity : sum;
    }, 0);

    if (eligibleSubtotal < discount.minimumOrderAmount) continue;

    let amount = discount.discountType === "percentage"
      ? eligibleSubtotal * discount.discountValue / 100
      : discount.discountValue;
    if (discount.discountType === "percentage" && discount.maximumDiscountAmount > 0) {
      amount = Math.min(amount, discount.maximumDiscountAmount);
    }
    amount = Math.min(amount, eligibleSubtotal, remainingSubtotal);

    if (amount > 0 && (!best || amount > best.amount)) {
      best = { discount, amount };
    }
  }

  return best;
};
