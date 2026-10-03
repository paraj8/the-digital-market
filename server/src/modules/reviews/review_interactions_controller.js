const reviewInteractionsService = require("./review_interactions_service");

const sendError = (res, error, fallback) => {
  return res.status(error.statusCode || 400).json({
    success: false,
    message: error.message || fallback,
  });
};

const likeReview = async (req, res) => {
  try {
    const data = await reviewInteractionsService.likeReview(
      req.params.reviewId,
      req.user._id
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendError(res, error, "Unable to like review");
  }
};

const unlikeReview = async (req, res) => {
  try {
    const data = await reviewInteractionsService.unlikeReview(
      req.params.reviewId,
      req.user._id
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendError(res, error, "Unable to unlike review");
  }
};

const getReviewComments = async (req, res) => {
  try {
    const result = await reviewInteractionsService.getReviewComments(
      req.params.reviewId,
      req.user?._id || null,
      req.query.page,
      req.query.limit
    );
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return sendError(res, error, "Unable to load comments");
  }
};

const createReviewComment = async (req, res) => {
  try {
    const comment = await reviewInteractionsService.createReviewComment(
      req.params.reviewId,
      req.user._id,
      req.validatedBody.content
    );
    return res.status(201).json({
      success: true,
      data: comment,
      message: "Comment created successfully",
    });
  } catch (error) {
    return sendError(res, error, "Unable to create comment");
  }
};

const updateReviewComment = async (req, res) => {
  try {
    const comment = await reviewInteractionsService.updateReviewComment(
      req.params.reviewId,
      req.params.commentId,
      req.user._id,
      req.validatedBody.content
    );
    return res.status(200).json({
      success: true,
      data: comment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    return sendError(res, error, "Unable to update comment");
  }
};

const deleteReviewComment = async (req, res) => {
  try {
    await reviewInteractionsService.deleteReviewComment(
      req.params.reviewId,
      req.params.commentId,
      req.user._id
    );
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return sendError(res, error, "Unable to delete comment");
  }
};

const setCommentVisibility = async (req, res) => {
  try {
    const data = await reviewInteractionsService.setCommentVisibility(
      req.params.reviewId,
      req.params.commentId,
      req.user._id,
      req.validatedBody.isVisible
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendError(res, error, "Unable to change comment visibility");
  }
};

const setSelectedCommentsVisibility = async (req, res) => {
  try {
    const data =
      await reviewInteractionsService.setSelectedCommentsVisibility(
        req.params.reviewId,
        req.validatedBody.commentIds,
        req.user._id,
        req.validatedBody.isVisible
      );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendError(res, error, "Unable to change comment visibility");
  }
};

const setAllCommentsVisibility = async (req, res) => {
  try {
    const data = await reviewInteractionsService.setAllCommentsVisibility(
      req.params.reviewId,
      req.user._id,
      req.validatedBody.isVisible
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return sendError(res, error, "Unable to change comment visibility");
  }
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
