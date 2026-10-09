const express = require("express");

const router = express.Router();
const conversationRoutes = require("./conversations/conversation_routes");
const adminConversationRoutes = require("./conversations/admin_conversation_routes");

router.use("/conversations", conversationRoutes);
router.use("/admin/conversations", adminConversationRoutes);

module.exports = router;
