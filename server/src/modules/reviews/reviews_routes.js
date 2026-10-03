const express = require("express");

const router = express.Router();

const reviewController = require("./reviews_controller");
const authMiddleware = require("../../middleware/auth_middleware");
const reviewInteractionsController = require("./review_interactions_controller");
const {
  validateCreateReview,
  validateUpdateReview,
  validateCreateReviewComment,
  validateUpdateReviewComment,
  validateCommentVisibility,
  validateSelectedCommentVisibility,
} = require("./reviews_validation");

router.get(
  "/product/:productId",
  authMiddleware.optional,
  reviewController.getProductReviews
);
router.get("/my", authMiddleware, reviewController.getMyReviews);
router.post(
  "/:reviewId/like",
  authMiddleware,
  reviewInteractionsController.likeReview
);
router.delete(
  "/:reviewId/like",
  authMiddleware,
  reviewInteractionsController.unlikeReview
);
router.get(
  "/:reviewId/comments",
  authMiddleware.optional,
  reviewInteractionsController.getReviewComments
);
router.patch(
  "/:reviewId/comments/visibility-all",
  authMiddleware,
  validateCommentVisibility,
  reviewInteractionsController.setAllCommentsVisibility
);
router.patch(
  "/:reviewId/comments/visibility",
  authMiddleware,
  validateSelectedCommentVisibility,
  reviewInteractionsController.setSelectedCommentsVisibility
);
router.patch(
  "/:reviewId/comments/:commentId/visibility",
  authMiddleware,
  validateCommentVisibility,
  reviewInteractionsController.setCommentVisibility
);
router.post(
  "/:reviewId/comments",
  authMiddleware,
  validateCreateReviewComment,
  reviewInteractionsController.createReviewComment
);
router.patch(
  "/:reviewId/comments/:commentId",
  authMiddleware,
  validateUpdateReviewComment,
  reviewInteractionsController.updateReviewComment
);
router.delete(
  "/:reviewId/comments/:commentId",
  authMiddleware,
  reviewInteractionsController.deleteReviewComment
);
router.post(
  "/",
  authMiddleware,
  validateCreateReview,
  reviewController.createReview
);
router.patch(
  "/:reviewId",
  authMiddleware,
  validateUpdateReview,
  reviewController.updateReview
);
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
