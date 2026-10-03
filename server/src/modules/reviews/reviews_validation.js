const mongoose = require("mongoose");

const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const ensureBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    fail("A JSON request body is required");
  }

  return body;
};

const onlyKeys = (body, allowedKeys) => {
  ensureBody(body);

  if (Object.keys(body).some((key) => !allowedKeys.includes(key))) {
    fail("Request contains unsupported fields");
  }

  return body;
};

const normalizeObjectId = (value, fieldName) => {
  if (!value || typeof value !== "string") {
    fail(`${fieldName} is required`);
  }

  if (!mongoose.Types.ObjectId.isValid(value)) {
    fail(`${fieldName} is invalid`);
  }

  return value;
};

const normalizeRating = (value) => {
  const numericValue = Number(value);

  if (!Number.isInteger(numericValue) || numericValue < 1 || numericValue > 5) {
    fail("Rating must be an integer between 1 and 5");
  }

  return numericValue;
};

const normalizeTitle = (value) => {
  if (typeof value === "undefined" || value === null) {
    return "";
  }

  if (typeof value !== "string") {
    fail("Title must be a string");
  }

  const title = value.trim();

  if (title.length > 100) {
    fail("Title must be 100 characters or fewer");
  }

  return title;
};

const normalizeContent = (value) => {
  if (typeof value !== "string") {
    fail("Content is required");
  }

  const content = value.trim();

  if (content.length === 0) {
    fail("Content is required");
  }

  if (content.length > 2000) {
    fail("Review content must be 2000 characters or fewer");
  }

  return content;
};

const middleware = (validator) => (req, res, next) => {
  try {
    req.validatedBody = validator(req.body);
    next();
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

const validateCreateReview = (body) => {
  onlyKeys(body, ["productId", "orderId", "rating", "title", "content"]);

  return {
    productId: normalizeObjectId(body.productId, "Product ID"),
    orderId: normalizeObjectId(body.orderId, "Order ID"),
    rating: normalizeRating(body.rating),
    title: normalizeTitle(body.title),
    content: normalizeContent(body.content),
  };
};

const validateUpdateReview = (body) => {
  onlyKeys(body, ["rating", "title", "content"]);

  if (
    typeof body.rating === "undefined" &&
    typeof body.title === "undefined" &&
    typeof body.content === "undefined"
  ) {
    fail("At least one field must be provided");
  }

  const validation = {};

  if (typeof body.rating !== "undefined") {
    validation.rating = normalizeRating(body.rating);
  }

  if (typeof body.title !== "undefined") {
    validation.title = normalizeTitle(body.title);
  }

  if (typeof body.content !== "undefined") {
    validation.content = normalizeContent(body.content);
  }

  return validation;
};

const normalizeCommentContent = (value) => {
  if (typeof value !== "string") {
    fail("Comment is required");
  }

  const content = value.trim();
  if (content.length === 0 || content.length > 1000) {
    fail("Comment must be between 1 and 1000 characters");
  }

  return content;
};

const normalizeVisibility = (value) => {
  if (typeof value !== "boolean") {
    fail("isVisible must be a boolean");
  }

  return value;
};

const validateCreateReviewComment = (body) => {
  onlyKeys(body, ["content"]);
  return { content: normalizeCommentContent(body.content) };
};

const validateUpdateReviewComment = (body) => {
  onlyKeys(body, ["content"]);
  return { content: normalizeCommentContent(body.content) };
};

const validateCommentVisibility = (body) => {
  onlyKeys(body, ["isVisible"]);
  return { isVisible: normalizeVisibility(body.isVisible) };
};

const validateSelectedCommentVisibility = (body) => {
  onlyKeys(body, ["commentIds", "isVisible"]);

  if (
    !Array.isArray(body.commentIds) ||
    body.commentIds.length === 0 ||
    body.commentIds.length > 100
  ) {
    fail("Select between 1 and 100 comments");
  }

  return {
    commentIds: body.commentIds.map((id) =>
      normalizeObjectId(id, "Comment ID")
    ),
    isVisible: normalizeVisibility(body.isVisible),
  };
};

module.exports = {
  validateCreateReview: middleware(validateCreateReview),
  validateUpdateReview: middleware(validateUpdateReview),
  validateCreateReviewComment: middleware(validateCreateReviewComment),
  validateUpdateReviewComment: middleware(validateUpdateReviewComment),
  validateCommentVisibility: middleware(validateCommentVisibility),
  validateSelectedCommentVisibility: middleware(
    validateSelectedCommentVisibility
  ),
};
