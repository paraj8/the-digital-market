const mongoose = require("mongoose");
const Review = require("./reviews_model");
const ReviewLike = require("./review_like_model");
const ReviewComment = require("./review_comment_model");

const statusError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const validateId = (id, label) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw statusError(`${label} is invalid`);
  }
};

const getReview = async (reviewId) => {
  validateId(reviewId, "Review ID");

  const review = await Review.findById(reviewId).select("_id user").lean();
  if (!review) {
    throw statusError("Review not found", 404);
  }

  return review;
};

const getLikeCount = (reviewId) => ReviewLike.countDocuments({ review: reviewId });

const likeReview = async (reviewId, userId) => {
  await getReview(reviewId);

  try {
    await ReviewLike.updateOne(
      { review: reviewId, user: userId },
      { $setOnInsert: { review: reviewId, user: userId } },
      { upsert: true }
    );
  } catch (error) {
    if (error.code !== 11000) {
      throw error;
    }
  }

  return {
    liked: true,
    likeCount: await getLikeCount(reviewId),
  };
};

const unlikeReview = async (reviewId, userId) => {
  await getReview(reviewId);
  await ReviewLike.deleteOne({ review: reviewId, user: userId });

  return {
    liked: false,
    likeCount: await getLikeCount(reviewId),
  };
};

const getReviewComments = async (reviewId, userId, page = 1, limit = 10) => {
  const review = await getReview(reviewId);
  const isReviewOwner = Boolean(
    userId && String(review.user) === String(userId)
  );
  const requestedPage = Number(page);
  const requestedLimit = Number(limit);
  const safePage =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? Math.max(1, Math.floor(requestedPage))
      : 1;
  const safeLimit =
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(50, Math.max(1, Math.floor(requestedLimit)))
      : 10;
  const filter = { review: reviewId };

  if (!isReviewOwner) {
    filter.isVisible = true;
  }

  const skip = (safePage - 1) * safeLimit;
  const [comments, total, visibleCommentCount, hiddenCommentCount] =
    await Promise.all([
      ReviewComment.find(filter)
        .populate("user", "fullName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit)
        .lean(),
      ReviewComment.countDocuments(filter),
      ReviewComment.countDocuments({ review: reviewId, isVisible: true }),
      isReviewOwner
        ? ReviewComment.countDocuments({ review: reviewId, isVisible: false })
        : Promise.resolve(undefined),
    ]);

  return {
    data: comments,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: total === 0 ? 0 : Math.ceil(total / safeLimit),
    },
    isReviewOwner,
    visibleCommentCount,
    ...(isReviewOwner ? { hiddenCommentCount } : {}),
  };
};

const createReviewComment = async (reviewId, userId, content) => {
  await getReview(reviewId);

  const normalizedContent = typeof content === "string" ? content.trim() : "";
  if (normalizedContent.length < 1 || normalizedContent.length > 1000) {
    throw statusError("Comment must be between 1 and 1000 characters");
  }

  const comment = await ReviewComment.create({
    review: reviewId,
    user: userId,
    content: normalizedContent,
    isVisible: true,
  });

  await comment.populate("user", "fullName");
  return comment;
};

const findComment = async (reviewId, commentId) => {
  validateId(reviewId, "Review ID");
  validateId(commentId, "Comment ID");

  const comment = await ReviewComment.findOne({
    _id: commentId,
    review: reviewId,
  });
  if (!comment) {
    throw statusError("Comment not found", 404);
  }

  return comment;
};

const updateReviewComment = async (reviewId, commentId, userId, content) => {
  const comment = await findComment(reviewId, commentId);
  if (String(comment.user) !== String(userId)) {
    throw statusError("You can only edit your own comments", 403);
  }

  const normalizedContent = typeof content === "string" ? content.trim() : "";
  if (normalizedContent.length < 1 || normalizedContent.length > 1000) {
    throw statusError("Comment must be between 1 and 1000 characters");
  }

  comment.content = normalizedContent;
  await comment.save();
  await comment.populate("user", "fullName");
  return comment;
};

const deleteReviewComment = async (reviewId, commentId, userId) => {
  const comment = await findComment(reviewId, commentId);
  if (String(comment.user) !== String(userId)) {
    throw statusError("You can only delete your own comments", 403);
  }

  await comment.deleteOne();
};

const requireReviewOwner = async (reviewId, userId) => {
  const review = await getReview(reviewId);
  if (String(review.user) !== String(userId)) {
    throw statusError("Only the review author can manage its comments", 403);
  }
  return review;
};

const setCommentVisibility = async (
  reviewId,
  commentId,
  userId,
  isVisible
) => {
  await requireReviewOwner(reviewId, userId);
  const comment = await findComment(reviewId, commentId);
  comment.isVisible = isVisible;
  await comment.save();

  return {
    comment,
    visibleCommentCount: await ReviewComment.countDocuments({
      review: reviewId,
      isVisible: true,
    }),
  };
};

const setSelectedCommentsVisibility = async (
  reviewId,
  commentIds,
  userId,
  isVisible
) => {
  await requireReviewOwner(reviewId, userId);

  const uniqueIds = [...new Set(commentIds)];
  const foundCount = await ReviewComment.countDocuments({
    _id: { $in: uniqueIds },
    review: reviewId,
  });

  if (foundCount !== uniqueIds.length) {
    throw statusError("One or more comments do not belong to this review", 400);
  }

  await ReviewComment.updateMany(
    { _id: { $in: uniqueIds }, review: reviewId },
    { $set: { isVisible } }
  );

  return {
    visibleCommentCount: await ReviewComment.countDocuments({
      review: reviewId,
      isVisible: true,
    }),
  };
};

const setAllCommentsVisibility = async (reviewId, userId, isVisible) => {
  await requireReviewOwner(reviewId, userId);
  await ReviewComment.updateMany(
    { review: reviewId },
    { $set: { isVisible } }
  );

  return {
    visibleCommentCount: await ReviewComment.countDocuments({
      review: reviewId,
      isVisible: true,
    }),
    hiddenCommentCount: await ReviewComment.countDocuments({
      review: reviewId,
      isVisible: false,
    }),
  };
};

module.exports = {
  likeReview,
  unlikeReview,
  getReviewComments,
  createReviewComment,
  updateReviewComment,
  deleteReviewComment,
  setCommentVisibility,
  setSelectedCommentsVisibility,
  setAllCommentsVisibility,
};
