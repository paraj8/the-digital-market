const conversationService = require("../conversations/conversation_service");
const messageService = require("../messages/message_service");
const Conversation = require("../conversations/conversation_model");
const User = require("../../users/users_model");

const conversationRoom = (id) => `conversation:${id}`;

const attachSocketHandlers = (io) => {
  const userSockets = new Map();
  const onlineUsers = new Map();

  const notifyPresence = async (user, online, lastSeenAt = user.lastSeenAt) => {
    const conversations = await Conversation.find({
      $or: [{ customer: user._id }, { assignedTo: user._id }],
    }).select("customer assignedTo");
    const event = {
      userId: String(user._id),
      fullName: user.fullName,
      profileImage: user.profileImage,
      online,
      lastSeenAt: lastSeenAt ? new Date(lastSeenAt).toISOString() : null,
    };
    const recipients = new Set();
    for (const conversation of conversations) {
      if (String(conversation.customer) !== String(user._id)) {
        recipients.add(String(conversation.customer));
      }
      if (
        conversation.assignedTo &&
        String(conversation.assignedTo) !== String(user._id)
      ) {
        recipients.add(String(conversation.assignedTo));
      }
    }
    if (["staff", "admin"].includes(user.role)) {
      const unassigned = await Conversation.find({
        assignedTo: null,
        status: { $in: ["open", "pending"] },
      }).select("customer");
      unassigned.forEach((conversation) => {
        recipients.add(String(conversation.customer));
      });
      const supportOnline = [...onlineUsers.values()].some((participant) =>
        ["staff", "admin"].includes(participant.role)
      );
      const supportLastSeen = supportOnline
        ? null
        : lastSeenAt
          ? new Date(lastSeenAt).toISOString()
          : null;
      const supportEvent = {
        userId: "support-team",
        fullName: "Support team",
        online: supportOnline,
        lastSeenAt: supportLastSeen,
      };
      unassigned.forEach((conversation) => {
        io.to(`user:${conversation.customer}`).emit("presence:update", supportEvent);
        recipients.delete(String(conversation.customer));
      });
    }
    recipients.forEach((recipientId) => {
      io.to(`user:${recipientId}`).emit("presence:update", event);
    });
  };

  const notifyConversationUpdate = async (conversationId) => {
    const conversation = await Conversation.findById(conversationId).select("customer");
    if (!conversation) return;
    const event = { conversationId: String(conversation._id) };
    io.to(`user:${conversation.customer}`).emit("conversation:updated", event);
    io.to("role:staff").emit("conversation:updated", event);
  };

  io.use(require("./socket_auth"));

  io.on("connection", (socket) => {
    const userId = String(socket.user._id);
    const socketSet = userSockets.get(userId) ?? new Set();
    socketSet.add(socket.id);
    userSockets.set(userId, socketSet);
    socket.join(`user:${userId}`);
    if (["staff", "admin"].includes(socket.user.role)) {
      socket.join("role:staff");
    }
    onlineUsers.set(userId, {
      _id: userId,
      fullName: socket.user.fullName,
      profileImage: socket.user.profileImage,
      role: socket.user.role,
    });
    notifyPresence(socket.user, true).catch((error) => {
      console.error("Unable to notify user presence:", error.message);
    });

    socket.on("conversation:join", async (payload = {}, acknowledge = () => {}) => {
      try {
        const conversation = await conversationService.assertAccess(
          payload.conversationId,
          socket.user
        );
        const room = conversationRoom(conversation._id);
        await socket.join(room);
        let peer = null;
        let online = false;
        if (["staff", "admin"].includes(socket.user.role)) {
          peer = await User.findById(conversation.customer)
            .select("fullName profileImage role lastSeenAt");
          online = onlineUsers.has(String(conversation.customer));
        } else if (conversation.assignedTo) {
          peer = await User.findById(conversation.assignedTo)
            .select("fullName profileImage role lastSeenAt");
          online = onlineUsers.has(String(conversation.assignedTo));
        } else {
          online = [...onlineUsers.values()].some((participant) =>
            ["staff", "admin"].includes(participant.role)
          );
          const latestSupportUser = online
            ? null
            : await User.findOne({ role: { $in: ["staff", "admin"] } })
              .sort({ lastSeenAt: -1 })
              .select("lastSeenAt");
          peer = {
            _id: "support-team",
            fullName: "Support team",
            role: "staff",
            lastSeenAt: latestSupportUser?.lastSeenAt ?? null,
          };
        }
        acknowledge({
          success: true,
          peer: peer
            ? {
                _id: String(peer._id),
                fullName: peer.fullName,
                profileImage: peer.profileImage,
                role: peer.role,
                lastSeenAt: peer.lastSeenAt,
              }
            : null,
          online,
        });
      } catch (error) {
        acknowledge({ success: false, message: error.message });
      }
    });

    socket.on("conversation:leave", (payload = {}) => {
      if (typeof payload.conversationId === "string") {
        socket.leave(conversationRoom(payload.conversationId));
      }
    });

    socket.on("message:send", async (payload = {}, acknowledge = () => {}) => {
      try {
        const message = await messageService.createMessage({
          conversationId: payload.conversationId,
          user: socket.user,
          content: payload.content,
        });
        const room = conversationRoom(String(message.conversation));
        io.to(room).emit("message:new", message);
        await notifyConversationUpdate(message.conversation);
        acknowledge({ success: true, data: message });
      } catch (error) {
        acknowledge({ success: false, message: error.message });
      }
    });

    const broadcastTyping = async (event, payload = {}) => {
      try {
        const conversation = await conversationService.assertAccess(
          payload.conversationId,
          socket.user
        );
        if (conversation.status === "closed") return;
        socket.to(conversationRoom(String(conversation._id))).emit(event, {
          conversationId: String(conversation._id),
          userId,
          senderType: socket.user.role,
        });
      } catch (_error) {
        // Invalid typing events are ignored; no message or data is persisted.
      }
    };

    socket.on("typing:start", (payload) => broadcastTyping("typing:start", payload));
    socket.on("typing:stop", (payload) => broadcastTyping("typing:stop", payload));

    socket.on("message:delivered", async (payload = {}, acknowledge = () => {}) => {
      try {
        const message = await messageService.markDelivered(
          payload.conversationId,
          payload.messageId,
          socket.user
        );
        if (message) {
          io.to(`user:${message.sender}`).emit("message:status", {
            conversationId: String(message.conversation),
            messageIds: [String(message._id)],
            messageStatus: message.messageStatus,
            deliveredAt: message.deliveredAt,
          });
        }
        acknowledge({ success: true });
      } catch (error) {
        acknowledge({ success: false, message: error.message });
      }
    });

    socket.on("message:read", async (payload = {}, acknowledge = () => {}) => {
      try {
        const result = await messageService.markRead(payload.conversationId, socket.user);
        const room = conversationRoom(payload.conversationId);
        socket.to(room).emit("message:read", {
          conversationId: payload.conversationId,
          readerId: userId,
          messageIds: result.messageIds,
          messageStatus: "read",
        });
        result.senderIds.forEach((senderId) => {
          io.to(`user:${senderId}`).emit("message:status", {
            conversationId: payload.conversationId,
            messageIds: result.messageIds,
            messageStatus: "read",
          });
        });
        await notifyConversationUpdate(payload.conversationId);
        acknowledge({ success: true });
      } catch (error) {
        acknowledge({ success: false, message: error.message });
      }
    });

    socket.on("disconnect", async () => {
      const sockets = userSockets.get(userId);
      if (!sockets) return;
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        userSockets.delete(userId);
        onlineUsers.delete(userId);
        try {
          const lastSeenAt = new Date();
          await User.updateOne({ _id: socket.user._id }, { $set: { lastSeenAt } });
          await notifyPresence(socket.user, false, lastSeenAt);
        } catch (error) {
          console.error("Unable to update user last-seen status:", error.message);
        }
      } else {
        userSockets.set(userId, sockets);
      }
    });
  });
};

module.exports = attachSocketHandlers;
