import CheckoutSection from "../common/CheckoutSection";

import CheckoutItem from "./CheckoutItem";

import type {
  CheckoutItem as CheckoutItemType,
} from "../../../features/checkout/types/checkout.ts";

interface CheckoutItemsProps {
  items: CheckoutItemType[];
}

function CheckoutItems({
  items,
}: CheckoutItemsProps) {
  return (
    <CheckoutSection
      title="Your Items"
      subtitle={`${items.length} ${
        items.length === 1
          ? "item"
          : "items"
      } in your order`}
    >
      <div className="space-y-4">
        {items.map((item) => (
          <CheckoutItem
            key={item.productId}
            item={item}
          />
        ))}
      </div>
    </CheckoutSection>
  );
}

export default CheckoutItems;