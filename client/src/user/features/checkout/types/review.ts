import type {
  CheckoutAddress,
  CheckoutItem,
  CheckoutSummary,
} from "./checkout";

export interface CheckoutReview {
  items: CheckoutItem[];
  address: CheckoutAddress;
  summary: CheckoutSummary;
  paymentMethod: "razorpay";
}

