import type { Review } from "../types/review";

export const getReviewProductId = (
  product: string | { _id?: string } | null | undefined
): string | null => {
  if (!product) {
    return null;
  }

  if (typeof product === "string") {
    return product;
  }

  return product._id ?? null;
};

export const isProductReviewed = (
  productId: string,
  reviews: Review[] = []
): boolean => {
  return reviews.some((review) => {
    const reviewProductId = getReviewProductId(review.product);
    return reviewProductId === productId;
  });
};
