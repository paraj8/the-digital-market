const express = require("express");

const router = express.Router();
const controller = require("./conversation_controller");
const messageController = require("../messages/message_controller");
const authMiddleware = require("../../../middleware/auth_middleware");

const staffOnly = (req, res, next) => {
  if (!req.user || !["admin", "staff"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Staff only.",
    });
  }
  return next();
};

router.use(authMiddleware, staffOnly);
router.get("/", controller.getStaffConversations);
router.get("/:conversationId/messages", messageController.getMessages);
router.post("/:conversationId/messages", controller.sendMessage);
router.get("/:conversationId", controller.getStaffConversation);
router.patch("/:conversationId/assign", controller.assignConversation);
router.patch("/:conversationId/status", controller.updateStatus);
router.patch("/:conversationId/read", controller.markRead);

module.exports = router;
