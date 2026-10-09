const jwt = require("jsonwebtoken");

const User = require("../../users/users_model");

const authenticateSocket = async (socket, next) => {
  try {
    const authorization = socket.handshake.headers.authorization;
    const token = socket.handshake.auth?.token ||
      (authorization?.startsWith("Bearer ") ? authorization.slice(7) : null);
    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || user.deletedAt || user.isBlocked) {
      return next(new Error("Invalid or unavailable account"));
    }

    socket.user = user;
    return next();
  } catch (_error) {
    return next(new Error("Invalid or expired token"));
  }
};

module.exports = authenticateSocket;
