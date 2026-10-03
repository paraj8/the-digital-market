const jwt = require("jsonwebtoken");
const User = require("../modules/users/users_model");

const getAuthenticatedUser = async (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  if (user.deletedAt) {
    const error = new Error("This account is no longer available");
    error.statusCode = 401;
    throw error;
  }

  if (user.isBlocked) {
    const error = new Error("Your account has been blocked");
    error.statusCode = 403;
    throw error;
  }

  return user;
};

const handleAuthError = (res, error) => {
  return res.status(error.statusCode || 401).json({
    success: false,
    message: error.statusCode ? error.message : "Invalid or expired token",
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    const user = await getAuthenticatedUser(req.headers.authorization);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return handleAuthError(res, error);
  }
};

const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  try {
    const user = await getAuthenticatedUser(authHeader);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    return handleAuthError(res, error);
  }
};

authMiddleware.optional = optionalAuthMiddleware;

module.exports = authMiddleware;