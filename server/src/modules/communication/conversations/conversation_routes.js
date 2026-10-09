const express = require("express");

const router = express.Router();
const controller = require("./conversation_controller");
const messageController = require("../messages/message_controller");
const authMiddleware = require("../../../middleware/auth_middleware");

router.use(authMiddleware);
router.post("/", controller.createConversation);
router.get("/", controller.getConversations);
router.get("/:conversationId/messages", messageController.getMessages);
router.post("/:conversationId/messages", controller.sendMessage);
router.patch("/:conversationId/read", controller.markRead);
router.patch("/:conversationId/close", controller.closeConversation);
router.get("/:conversationId", controller.getConversation);

module.exports = router;
