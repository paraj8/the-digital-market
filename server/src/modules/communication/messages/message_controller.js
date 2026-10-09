const service = require("./message_service");

const getMessages = async (req, res) => {
  try {
    const messages = await service.listMessages(
      req.params.conversationId,
      req.user,
      req.query
    );
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    return res.status(error.statusCode || (error.message === "Conversation not found" ? 404 : 400))
      .json({ success: false, message: error.message });
  }
};

module.exports = { getMessages };
