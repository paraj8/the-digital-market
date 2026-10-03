const reviewService = require("./reviews_service");

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(
      req.user.id,
      req.validatedBody
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to create review",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const result = await reviewService.getProductReviews(
      req.params.productId,
      req.query.page,
      req.query.limit,
      req.user?._id || null
    );

    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      averageRating: result.averageRating,
      totalReviews: result.totalReviews,
      ratingDistribution: result.ratingDistribution,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to load reviews",
    });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getMyReviews(req.user.id);

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to load your reviews",
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(
      req.user.id,
      req.params.reviewId,
      req.validatedBody
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to update review",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(
      req.user.id,
      req.params.reviewId
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to delete review",
    });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
