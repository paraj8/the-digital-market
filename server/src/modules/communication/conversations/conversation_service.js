const mongoose = require("mongoose");

const Conversation = require("./conversation_model");
const Message = require("../messages/message_model");

const isStaff = (user) => ["staff", "admin"].includes(user.role);

const getConversation = async (conversationId) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error("Invalid conversation ID");
  }
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  return conversation;
};

const assertAccess = async (conversationId, user) => {
  const conversation = await getConversation(conversationId);
  if (!isStaff(user) && String(conversation.customer) !== String(user._id)) {
    const error = new Error("You are not authorized to access this conversation");
    error.statusCode = 403;
    throw error;
  }
  return conversation;
};

const withUnreadCounts = async (conversations, unreadSenderType) =>
  Promise.all(conversations.map(async (conversation) => {
    const data = conversation.toObject();
    data.unreadCount = await Message.countDocuments({
      conversation: conversation._id,
      isRead: false,
      senderType: unreadSenderType,
    });
    return data;
  }));

const createConversation = async (user) => {
  const existing = await Conversation.findOne({
    customer: user._id,
    status: { $in: ["open", "pending"] },
  }).sort({ lastMessageAt: -1 });

  if (existing) {
    return existing;
  }

  return Conversation.create({
    customer: user._id,
    participants: [{ user: user._id, role: "customer" }],
    subject: "Customer support",
  });
};

const getCustomerConversations = async (user) => {
  const conversations = await Conversation.find({ customer: user._id })
    .populate("assignedTo", "fullName email profileImage lastSeenAt")
    .sort({ lastMessageAt: -1 })
    .lean();
  return Promise.all(conversations.map(async (conversation) => ({
    ...conversation,
    unreadCount: await Message.countDocuments({
      conversation: conversation._id,
      isRead: false,
      sender: { $ne: user._id },
    }),
  })));
};

const getCustomerConversation = async (conversationId, user) => {
  const conversation = await assertAccess(conversationId, user);
  return conversation.populate([
    { path: "customer", select: "fullName email profileImage" },
    { path: "assignedTo", select: "fullName email" },
  ]);
};

const getStaffConversations = async () => {
  const conversations = await Conversation.find()
    .populate("customer", "fullName email profileImage lastSeenAt")
    .populate("assignedTo", "fullName email profileImage lastSeenAt")
    .sort({ lastMessageAt: -1 });
  return withUnreadCounts(conversations, "customer");
};

const getStaffConversation = async (conversationId) => {
  const conversation = await getConversation(conversationId);
  return conversation.populate([
    { path: "customer", select: "fullName email profileImage lastSeenAt" },
    { path: "assignedTo", select: "fullName email profileImage lastSeenAt" },
  ]);
};

const markConversationRead = async (conversationId, user) => {
  await assertAccess(conversationId, user);
  const senderFilter = isStaff(user) ? "customer" : { $ne: user._id };
  const filter = {
    conversation: conversationId,
    isRead: false,
    ...(typeof senderFilter === "string"
      ? { senderType: senderFilter }
      : { sender: senderFilter }),
  };
  const result = await Message.updateMany(filter, { $set: { isRead: true } });
  return { modifiedCount: result.modifiedCount };
};

const closeConversation = async (conversationId, user) => {
  const conversation = await assertAccess(conversationId, user);
  conversation.status = "closed";
  await conversation.save();
  return conversation;
};

const assignConversation = async (conversationId, assignedToId) => {
  const conversation = await getConversation(conversationId);
  if (assignedToId !== null && !mongoose.Types.ObjectId.isValid(assignedToId)) {
    throw new Error("Invalid staff user ID");
  }
  if (assignedToId) {
    const User = require("../../users/users_model");
    const assignee = await User.findOne({
      _id: assignedToId,
      role: { $in: ["staff", "admin"] },
      isBlocked: false,
      deletedAt: null,
    });
    if (!assignee) {
      throw new Error("Staff user not found");
    }
  }
  conversation.assignedTo = assignedToId;
  await conversation.save();
  return conversation.populate("assignedTo", "fullName email profileImage lastSeenAt");
};

const updateConversationStatus = async (conversationId, status, priority) => {
  const conversation = await getConversation(conversationId);
  if (status !== undefined) {
    if (!["open", "pending", "resolved", "closed"].includes(status)) {
      throw new Error("Invalid conversation status");
    }
    conversation.status = status;
  }
  if (priority !== undefined) {
    if (!["low", "normal", "high", "urgent"].includes(priority)) {
      throw new Error("Invalid conversation priority");
    }
    conversation.priority = priority;
  }
  await conversation.save();
  return conversation;
};

module.exports = {
  isStaff,
  getConversation,
  assertAccess,
  createConversation,
  getCustomerConversations,
  getCustomerConversation,
  getStaffConversations,
  getStaffConversation,
  markConversationRead,
  closeConversation,
  assignConversation,
  updateConversationStatus,
};
