const service = require("./conversation_service");
const messageService = require("../messages/message_service");
const { createMessage } = messageService;

const respondError = (res, error) =>
  res.status(error.statusCode || (error.message === "Conversation not found" ? 404 : 400))
    .json({ success: false, message: error.message });

const createConversation = async (req, res) => {
  try {
    const conversation = await service.createConversation(req.user);
    notifyConversationUpdate(req.app.get("io"), conversation._id);
    return res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await service.getCustomerConversations(req.user);
    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    return respondError(res, error);
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await service.getCustomerConversation(req.params.conversationId, req.user);
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

const sendMessage = async (req, res) => {
  try {
    const message = await createMessage({
      conversationId: req.params.conversationId,
      user: req.user,
      content: req.body.content,
    });
    req.app.get("io")?.to(`conversation:${req.params.conversationId}`).emit("message:new", message);
    notifyConversationUpdate(req.app.get("io"), req.params.conversationId);
    return res.status(201).json({ success: true, data: message });
  } catch (error) {
    return respondError(res, error);
  }
};

const markRead = async (req, res) => {
  try {
    const result = await messageService.markRead(req.params.conversationId, req.user);
    const io = req.app.get("io");
    const event = {
      conversationId: req.params.conversationId,
      readerId: String(req.user._id),
      messageIds: result.messageIds,
      messageStatus: "read",
    };
    io?.to(`conversation:${req.params.conversationId}`).emit("message:read", event);
    result.senderIds.forEach((senderId) => {
      io?.to(`user:${senderId}`).emit("message:status", {
        conversationId: req.params.conversationId,
        messageIds: result.messageIds,
        messageStatus: "read",
      });
    });
    notifyConversationUpdate(io, req.params.conversationId);
    return res.status(200).json({
      success: true,
      data: { modifiedCount: result.modifiedCount, messageIds: result.messageIds },
    });
  } catch (error) {
    return respondError(res, error);
  }
};

const notifyConversationUpdate = (io, conversationId) => {
  if (!io) return;
  const Conversation = require("./conversation_model");
  Conversation.findById(conversationId)
    .select("customer")
    .then((conversation) => {
      if (!conversation) return;
      const event = { conversationId: String(conversation._id) };
      io.to(`user:${conversation.customer}`).emit("conversation:updated", event);
      io.to("role:staff").emit("conversation:updated", event);
    })
    .catch((error) => {
      console.error("Unable to notify conversation update:", error.message);
    });
};

const closeConversation = async (req, res) => {
  try {
    const conversation = await service.closeConversation(req.params.conversationId, req.user);
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

const getStaffConversations = async (_req, res) => {
  try {
    const conversations = await service.getStaffConversations();
    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    return respondError(res, error);
  }
};

const getStaffConversation = async (req, res) => {
  try {
    const conversation = await service.getStaffConversation(req.params.conversationId);
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

const assignConversation = async (req, res) => {
  try {
    const conversation = await service.assignConversation(
      req.params.conversationId,
      req.body.assignedTo ?? null
    );
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const conversation = await service.updateConversationStatus(
      req.params.conversationId,
      req.body.status,
      req.body.priority
    );
    return res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    return respondError(res, error);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
  sendMessage,
  markRead,
  closeConversation,
  getStaffConversations,
  getStaffConversation,
  assignConversation,
  updateStatus,
};
