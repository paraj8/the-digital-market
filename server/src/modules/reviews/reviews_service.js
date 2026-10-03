const mongoose = require("mongoose");
const Review = require("./reviews_model");
const Product = require("../products/products_model");
const Order = require("../orders/order_model");
const ReviewLike = require("./review_like_model");
const ReviewComment = require("./review_comment_model");

const statusError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getProductReviewSummary = async (productId) => {
  const summary = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(productId),
        isVisible: true,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        ratings: { $push: "$rating" },
      },
    },
  ]);

  const ratingDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (summary.length > 0) {
    summary[0].ratings.forEach((rating) => {
      ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
    });
  }

  return {
    averageRating: summary[0]?.averageRating || 0,
    totalReviews: summary[0]?.totalReviews || 0,
    ratingDistribution,
  };
};

const createReview = async (userId, reviewData) => {
  const { productId, orderId, rating, title, content } = reviewData;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw statusError("Product ID is invalid", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw statusError("Order ID is invalid", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw statusError("Product not found", 404);
  }

  const order = await Order.findById(orderId);
  if (!order) {
    throw statusError("Order not found", 404);
  }

  if (String(order.user) !== String(userId)) {
    throw statusError("This order does not belong to you", 403);
  }

  const matchesProduct = order.items.some(
    (item) => String(item.product) === String(productId)
  );

  if (!matchesProduct) {
    throw statusError("This product is not part of the selected order", 400);
  }

  if (order.paymentStatus !== "paid") {
    throw statusError(
      "Only orders with successful payment can be reviewed",
      400
    );
  }

  if (order.orderStatus !== "delivered") {
    throw statusError(
      "This order must be delivered before you can write a review",
      400
    );
  }

  const existingReview = await Review.findOne({
    user: userId,
    product: productId,
  });

  if (existingReview) {
    throw statusError("You have already reviewed this product", 409);
  }

  const review = await Review.create({
    product: productId,
    user: userId,
    order: orderId,
    rating,
    title,
    content,
    isVerifiedPurchase: true,
    isVisible: true,
  });

  await review.populate("user", "fullName");
  await review.populate("product", "title slug");

  return review;
};

const getProductReviews = async (
  productId,
  page = 1,
  limit = 10,
  currentUserId = null
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw statusError("Product ID is invalid", 400);
  }

  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Number(limit) || 10);
  const skip = (safePage - 1) * safeLimit;

  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw statusError("Product not found", 404);
  }

  const [reviews, total] = await Promise.all([
    Review.find({
      product: productId,
      isVisible: true,
    })
      .populate("user", "fullName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),
    Review.countDocuments({
      product: productId,
      isVisible: true,
    }),
  ]);

  const summary = await getProductReviewSummary(productId);
  const reviewIds = reviews.map((review) => review._id);
  const ownedReviewIds = currentUserId
    ? reviews
        .filter((review) =>
          String(review.user?._id ?? review.user) === String(currentUserId)
        )
        .map((review) => review._id)
    : [];

  let likesByReview = [];
  let commentsByReview = [];
  let hiddenCommentsByReview = [];
  let likedReviewIds = [];

  if (reviewIds.length > 0) {
    [likesByReview, commentsByReview, likedReviewIds] = await Promise.all([
      ReviewLike.aggregate([
        { $match: { review: { $in: reviewIds } } },
        { $group: { _id: "$review", count: { $sum: 1 } } },
      ]),
      ReviewComment.aggregate([
        { $match: { review: { $in: reviewIds }, isVisible: true } },
        { $group: { _id: "$review", count: { $sum: 1 } } },
      ]),
      currentUserId
        ? ReviewLike.distinct("review", {
            review: { $in: reviewIds },
            user: currentUserId,
          })
        : Promise.resolve([]),
    ]);

    if (ownedReviewIds.length > 0) {
      hiddenCommentsByReview = await ReviewComment.aggregate([
        {
          $match: {
            review: { $in: ownedReviewIds },
            isVisible: false,
          },
        },
        { $group: { _id: "$review", count: { $sum: 1 } } },
      ]);
    }
  }

  const countMap = (entries) =>
    new Map(entries.map((entry) => [String(entry._id), entry.count]));
  const likesCount = countMap(likesByReview);
  const commentsCount = countMap(commentsByReview);
  const hiddenCommentsCount = countMap(hiddenCommentsByReview);
  const likedReviewSet = new Set(likedReviewIds.map(String));
  const data = reviews.map((review) => {
    const reviewId = String(review._id);
    return {
      ...review,
      likeCount: likesCount.get(reviewId) || 0,
      commentCount: commentsCount.get(reviewId) || 0,
      likedByCurrentUser: likedReviewSet.has(reviewId),
      ...(ownedReviewIds.some((id) => String(id) === reviewId)
        ? { hiddenCommentCount: hiddenCommentsCount.get(reviewId) || 0 }
        : {}),
    };
  });

  return {
    data,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: total === 0 ? 0 : Math.ceil(total / safeLimit),
    },
    averageRating: summary.averageRating,
    totalReviews: summary.totalReviews,
    ratingDistribution: summary.ratingDistribution,
  };
};

const getMyReviews = async (userId) => {
  return await Review.find({
    user: userId,
  })
    .populate("product", "title slug images")
    .sort({ createdAt: -1 })
    .lean();
};

const updateReview = async (userId, reviewId, reviewData) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw statusError("Review ID is invalid", 400);
  }

  const review = await Review.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!review) {
    throw statusError("Review not found", 404);
  }

  const updatePayload = {};

  if (typeof reviewData.rating !== "undefined") {
    updatePayload.rating = reviewData.rating;
  }

  if (typeof reviewData.title !== "undefined") {
    updatePayload.title = reviewData.title;
  }

  if (typeof reviewData.content !== "undefined") {
    updatePayload.content = reviewData.content;
  }

  if (Object.keys(updatePayload).length === 0) {
    throw statusError("At least one review field must be provided", 400);
  }

  Object.assign(review, updatePayload);
  await review.save();

  await review.populate("user", "fullName");
  await review.populate("product", "title slug");

  return review;
};

const deleteReview = async (userId, reviewId) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw statusError("Review ID is invalid", 400);
  }

  const review = await Review.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!review) {
    throw statusError("Review not found", 404);
  }

  await review.deleteOne();
  await Promise.all([
    ReviewLike.deleteMany({ review: reviewId }),
    ReviewComment.deleteMany({ review: reviewId }),
  ]);

  return {
    message: "Review deleted successfully",
  };
};

module.exports = {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
