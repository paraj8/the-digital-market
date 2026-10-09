const mongoose = require("mongoose");

const Conversation = require("../conversations/conversation_model");
const Message = require("./message_model");
const { assertAccess, isStaff } = require("../conversations/conversation_service");

const listMessages = async (conversationId, user, { before, limit = 50 } = {}) => {
  await assertAccess(conversationId, user);
  const query = { conversation: conversationId };
  if (before) {
    const cursor = new Date(before);
    if (Number.isNaN(cursor.getTime())) {
      throw new Error("Invalid message cursor");
    }
    query.createdAt = { $lt: cursor };
  }
  const pageSize = Math.min(Math.max(Number(limit) || 50, 1), 100);
  const messages = await Message.find(query)
    .populate("sender", "fullName profileImage role")
    .sort({ createdAt: -1 })
    .limit(pageSize);
  return messages.reverse();
};

const createMessage = async ({ conversationId, user, content }) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation ID");
  }
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Message content is required");
  }
  const messageContent = content.trim();
  if (messageContent.length > 2000) {
    throw new Error("Message cannot exceed 2000 characters");
  }

  const conversation = await assertAccess(conversationId, user);
  if (conversation.status === "closed") {
    throw new Error("This conversation is closed");
  }

  const senderType = ["customer", "staff", "admin"].includes(user.role)
    ? user.role
    : "customer";
  const message = await Message.create({
    conversation: conversation._id,
    sender: user._id,
    senderType,
    content: messageContent,
    messageType: "text",
  });

  conversation.lastMessage = messageContent;
  conversation.lastMessageAt = message.createdAt;
  if (isStaff(user) && conversation.status === "pending") {
    conversation.status = "open";
  }
  if (isStaff(user) && !conversation.assignedTo) {
    conversation.assignedTo = user._id;
  }
  await conversation.save();

  return message.populate("sender", "fullName profileImage role");
};

const markDelivered = async (conversationId, messageId, user) => {
  const conversation = await assertAccess(conversationId, user);
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    throw new Error("Invalid message ID");
  }
  const message = await Message.findOneAndUpdate(
    {
      _id: messageId,
      conversation: conversation._id,
      sender: { $ne: user._id },
      messageStatus: { $in: ["sent", null] },
    },
    { $set: { messageStatus: "delivered", deliveredAt: new Date() } },
    { new: true }
  );
  return message;
};

const markRead = async (conversationId, user) => {
  const conversation = await assertAccess(conversationId, user);
  const filter = {
    conversation: conversation._id,
    isRead: false,
    ...(isStaff(user)
      ? { senderType: "customer" }
      : { sender: { $ne: user._id } }),
  };
  const messages = await Message.find(filter).select("_id sender");
  if (!messages.length) return { modifiedCount: 0, messageIds: [], senderIds: [] };

  await Message.updateMany(
    { _id: { $in: messages.map((message) => message._id) } },
    {
      $set: {
        isRead: true,
        messageStatus: "read",
        readAt: new Date(),
      },
    }
  );

  return {
    modifiedCount: messages.length,
    messageIds: messages.map((message) => String(message._id)),
    senderIds: [...new Set(messages.map((message) => String(message.sender)))],
  };
};

module.exports = { listMessages, createMessage, markDelivered, markRead };
