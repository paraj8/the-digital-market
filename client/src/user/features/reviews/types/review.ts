export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface ReviewUser {
  _id: string;
  fullName: string;
}

export interface ReviewProduct {
  _id: string;
  title: string;
  slug: string;
  images?: Array<{
    url: string;
    publicId?: string;
  }>;
}

export interface Review {
  _id: string;
  product: string | ReviewProduct;
  user: string | ReviewUser;
  order: string;
  rating: ReviewRating;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount?: number;
  commentCount?: number;
  likedByCurrentUser?: boolean;
  hiddenCommentCount?: number;
}

export interface ReviewComment {
  _id: string;
  review: string;
  user: string | ReviewUser;
  content: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewCommentsResponse {
  success: boolean;
  data: ReviewComment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  isReviewOwner: boolean;
  visibleCommentCount: number;
  hiddenCommentCount?: number;
}

export interface ReviewLikeResponse {
  liked: boolean;
  likeCount: number;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
}

export interface ProductReviewsResponse extends ReviewSummary {
  success: boolean;
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CreateReviewPayload {
  productId: string;
  orderId: string;
  rating: ReviewRating;
  title: string;
  content: string;
}

export interface UpdateReviewPayload {
  rating?: ReviewRating;
  title?: string;
  content?: string;
}

export interface ReviewTarget {
  productId: string;
  orderId: string;
  title: string;
  image?: string;
}
