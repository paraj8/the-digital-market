import api from "../../../../api/axios";

import type {
  CreateReviewPayload,
  ProductReviewsResponse,
  Review,
  ReviewComment,
  ReviewCommentsResponse,
  ReviewLikeResponse,
  UpdateReviewPayload,
} from "../types/review";

export const getProductReviews = async (
  productId: string,
  page = 1,
  limit = 10
): Promise<ProductReviewsResponse> => {
  const response = await api.get<ProductReviewsResponse>(
    `/reviews/product/${productId}`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};

export const getMyReviews = async (): Promise<Review[]> => {
  const response = await api.get<{ success: boolean; data: Review[] }>(
    "/reviews/my"
  );

  return response.data.data;
};

export const createReview = async (
  payload: CreateReviewPayload
): Promise<Review> => {
  const response = await api.post<{ success: boolean; data: Review }>(
    "/reviews",
    payload
  );

  return response.data.data;
};

export const updateReview = async (
  reviewId: string,
  payload: UpdateReviewPayload
): Promise<Review> => {
  const response = await api.patch<{ success: boolean; data: Review }>(
    `/reviews/${reviewId}`,
    payload
  );

  return response.data.data;
};

export const deleteReview = async (
  reviewId: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/reviews/${reviewId}`
  );

  return response.data;
};

export const likeReview = async (
  reviewId: string
): Promise<ReviewLikeResponse> => {
  const response = await api.post<{
    success: boolean;
    data: ReviewLikeResponse;
  }>(`/reviews/${reviewId}/like`);
  return response.data.data;
};

export const unlikeReview = async (
  reviewId: string
): Promise<ReviewLikeResponse> => {
  const response = await api.delete<{
    success: boolean;
    data: ReviewLikeResponse;
  }>(`/reviews/${reviewId}/like`);
  return response.data.data;
};

export const getReviewComments = async (
  reviewId: string,
  page = 1,
  limit = 10
): Promise<ReviewCommentsResponse> => {
  const response = await api.get<ReviewCommentsResponse>(
    `/reviews/${reviewId}/comments`,
    { params: { page, limit } }
  );
  return response.data;
};

export const createReviewComment = async (
  reviewId: string,
  content: string
): Promise<ReviewComment> => {
  const response = await api.post<{ success: boolean; data: ReviewComment }>(
    `/reviews/${reviewId}/comments`,
    { content }
  );
  return response.data.data;
};

export const updateReviewComment = async (
  reviewId: string,
  commentId: string,
  content: string
): Promise<ReviewComment> => {
  const response = await api.patch<{ success: boolean; data: ReviewComment }>(
    `/reviews/${reviewId}/comments/${commentId}`,
    { content }
  );
  return response.data.data;
};

export const deleteReviewComment = async (
  reviewId: string,
  commentId: string
): Promise<void> => {
  await api.delete(`/reviews/${reviewId}/comments/${commentId}`);
};

export const setReviewCommentVisibility = async (
  reviewId: string,
  commentId: string,
  isVisible: boolean
): Promise<void> => {
  await api.patch(
    `/reviews/${reviewId}/comments/${commentId}/visibility`,
    { isVisible }
  );
};

export const setSelectedReviewCommentsVisibility = async (
  reviewId: string,
  commentIds: string[],
  isVisible: boolean
): Promise<void> => {
  await api.patch(`/reviews/${reviewId}/comments/visibility`, {
    commentIds,
    isVisible,
  });
};

export const setAllReviewCommentsVisibility = async (
  reviewId: string,
  isVisible: boolean
): Promise<void> => {
  await api.patch(`/reviews/${reviewId}/comments/visibility-all`, {
    isVisible,
  });
};
