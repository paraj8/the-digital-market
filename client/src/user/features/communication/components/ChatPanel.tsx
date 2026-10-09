import { useEffect, useRef, useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { getCommunicationSocket } from "../api/communicationSocket";
import type {
  CommunicationConversation,
  CommunicationMessage,
  CommunicationUser,
} from "../api/communicationApi";
import {
  communicationKeys,
  useConversationMessages,
  useMarkConversationRead,
  useSendConversationMessage,
} from "../hooks/useCommunication";

interface ChatPanelProps {
  conversation?: CommunicationConversation;
  isAdmin?: boolean;
}

interface PeerPresence extends CommunicationUser {
  lastSeenAt?: string | null;
}

const formatLastSeen = (value?: string | null) => {
  if (!value) return "Offline";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Offline";
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `Last seen today at ${time}`;
  if (date.toDateString() === yesterday.toDateString()) {
    return `Last seen yesterday at ${time}`;
  }
  return `Last seen ${date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  })} at ${time}`;
};

function ChatPanel({ conversation, isAdmin = false }: ChatPanelProps) {
  const conversationId = conversation?._id;
  const [content, setContent] = useState("");
  const [peerTyping, setPeerTyping] = useState(false);
  const [presence, setPresence] = useState<{
    conversationId: string;
    peer: PeerPresence | null;
    online: boolean;
  } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const messagesQuery = useConversationMessages(conversationId, isAdmin);
  const sendMessage = useSendConversationMessage(isAdmin);
  const { mutate: markReadConversation } = useMarkConversationRead(isAdmin);
  const messages = messagesQuery.data ?? [];
  const existingPeer = isAdmin ? conversation?.customer : conversation?.assignedTo;
  const fallbackPeer = existingPeer && typeof existingPeer !== "string"
    ? existingPeer
    : null;
  const currentPresence = presence?.conversationId === conversationId ? presence : null;
  const peer = currentPresence?.peer ?? fallbackPeer;
  const peerOnline = Boolean(currentPresence?.online);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, peerTyping]);

  useEffect(() => {
    if (!conversationId) return;
    const socket = getCommunicationSocket();
    if (!socket) return;

    const join = () => socket.emit(
      "conversation:join",
      { conversationId },
      (result: { success: boolean; online?: boolean; peer?: PeerPresence | null }) => {
        if (result.success) {
          setPresence({
            conversationId,
            peer: result.peer ?? fallbackPeer,
            online: Boolean(result.online),
          });
        }
      }
    );
    const onMessage = (message: CommunicationMessage) => {
      if (String(message.conversation) !== conversationId) return;
      const knownStatuses =
        queryClient.getQueryData<Record<string, "delivered" | "read">>(
          communicationKeys.messageStatuses
        ) ?? {};
      queryClient.setQueryData<CommunicationMessage[]>(
        communicationKeys.messages(`${isAdmin ? "admin:" : "customer:"}${conversationId}`),
        (current = []) => {
          const knownStatus = knownStatuses[message._id];
          const existingMessage = current.find((item) => item._id === message._id);
          const existingStatus = existingMessage?.messageStatus ??
            (existingMessage?.isRead ? "read" : "sent");
          const statusPriority = { sent: 0, delivered: 1, read: 2 };
          const receivedStatus = message.messageStatus ?? (message.isRead ? "read" : "sent");
          const nextStatus = [knownStatus, existingStatus, receivedStatus]
            .filter((status): status is "sent" | "delivered" | "read" => Boolean(status))
            .reduce((highest, status) =>
              statusPriority[status] > statusPriority[highest] ? status : highest
            , "sent");
          const receivedMessage = knownStatus
            ? {
                ...message,
                messageStatus: nextStatus,
                isRead: nextStatus === "read" || message.isRead,
              }
            : { ...message, messageStatus: nextStatus, isRead: nextStatus === "read" || message.isRead };
          return current.some((item) => item._id === message._id)
            ? current.map((item) => item._id === message._id
                ? { ...item, ...receivedMessage }
                : item)
            : [...current, receivedMessage];
        }
      );
      const ownMessage = isAdmin
        ? message.senderType === "admin" || message.senderType === "staff"
        : message.senderType === "customer";
      if (!ownMessage) {
        socket.emit("message:delivered", {
          conversationId,
          messageId: message._id,
        });
        markReadConversation(conversationId);
      }
    };
    const onTypingStart = (event: { conversationId: string; userId: string }) => {
      if (event.conversationId === conversationId) setPeerTyping(true);
    };
    const onTypingStop = (event: { conversationId: string; userId: string }) => {
      if (event.conversationId === conversationId) setPeerTyping(false);
    };
    const updateMessageStatuses = (event: {
      conversationId: string;
      messageIds: string[];
      messageStatus: "delivered" | "read";
    }) => {
      if (event.conversationId !== conversationId) return;
      queryClient.setQueryData<CommunicationMessage[]>(
        communicationKeys.messages(`${isAdmin ? "admin:" : "customer:"}${conversationId}`),
        (current) => current?.map((message) =>
          event.messageIds.includes(message._id)
            ? {
                ...message,
                isRead: event.messageStatus === "read" || message.isRead,
                messageStatus: event.messageStatus,
              }
            : message
        )
      );
      queryClient.setQueryData<Record<string, "delivered" | "read">>(
        communicationKeys.messageStatuses,
        (current = {}) => Object.fromEntries([
          ...Object.entries(current),
          ...event.messageIds.map((id) => [id, event.messageStatus]),
        ])
      );
    };
    const onPresence = (event: PeerPresence & { userId: string; online: boolean }) => {
      if (fallbackPeer?._id && event.userId !== fallbackPeer._id) return;
      setPresence({
        conversationId,
        peer: { ...event, _id: event.userId },
        online: event.online,
      });
    };
    const onConversationRead = (event: {
      conversationId: string;
      messageIds: string[];
      messageStatus: "read";
    }) => updateMessageStatuses(event);

    if (socket.connected) join();
    socket.on("connect", join);
    socket.on("message:new", onMessage);
    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);
    socket.on("message:status", updateMessageStatuses);
    socket.on("message:read", onConversationRead);
    socket.on("presence:update", onPresence);
    markReadConversation(conversationId);

    return () => {
      socket.emit("conversation:leave", { conversationId });
      socket.off("connect", join);
      socket.off("message:new", onMessage);
      socket.off("typing:start", onTypingStart);
      socket.off("typing:stop", onTypingStop);
      socket.off("message:status", updateMessageStatuses);
      socket.off("message:read", onConversationRead);
      socket.off("presence:update", onPresence);
    };
  }, [conversation, conversationId, fallbackPeer, isAdmin, markReadConversation, queryClient]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!conversationId || !content.trim() || sendMessage.isPending) return;
    sendMessage.mutate(
      { conversationId, content: content.trim(), isAdmin },
      {
        onSuccess: () => {
          setContent("");
          getCommunicationSocket()?.emit("typing:stop", { conversationId });
        },
        onError: () => toast.error("Unable to send message. Please try again."),
      }
    );
  };

  const updateTyping = (value: string) => {
    setContent(value);
    const socket = getCommunicationSocket();
    if (conversationId && socket?.connected) {
      socket.emit(value.trim() ? "typing:start" : "typing:stop", { conversationId });
    }
  };

  if (!conversation) {
    return (
      <div className="flex min-h-80 flex-1 items-center justify-center p-8 text-center text-sm text-slate-400">
        Select a conversation to view messages.
      </div>
    );
  }

  return (
    <section className="flex min-h-[28rem] min-w-0 flex-1 flex-col">
      <header className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0">
            {peer?.profileImage ? (
              <img
                src={peer.profileImage}
                alt=""
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/20 font-semibold text-violet-200">
                {(peer?.fullName || (isAdmin ? "C" : "S")).slice(0, 1).toUpperCase()}
              </div>
            )}
            {peerOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-semibold">
              {peer?.fullName || (isAdmin ? "Customer" : "Support team")}
            </h2>
            <p className="truncate text-xs text-slate-400">
              {peerOnline
                ? <span className="text-emerald-400">Online</span>
                : formatLastSeen(peer?.lastSeenAt)}
              <span className="ml-2 capitalize text-slate-500">
                · {conversation.status} · {conversation.priority}
              </span>
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 md:px-6">
        {messagesQuery.isPending && (
          <p className="text-center text-sm text-slate-400">Loading messages...</p>
        )}
        {messagesQuery.isError && (
          <p className="text-center text-sm text-red-300">Unable to load messages.</p>
        )}
        {messages.map((message) => {
          const ownMessage = isAdmin
            ? message.senderType === "admin" || message.senderType === "staff"
            : message.senderType === "customer";
          return (
            <div
              key={message._id}
              className={`flex ${ownMessage ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                ownMessage ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-100"
              }`}>
                {!ownMessage && isAdmin && (
                  <p className="mb-1 text-xs font-medium text-violet-200">
                    {message.sender?.fullName || "Customer"}
                  </p>
                )}
                <p className="whitespace-pre-wrap break-words text-sm">{message.content}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">
                  <span>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {ownMessage && (() => {
                    const status = message.messageStatus || (message.isRead ? "read" : "sent");
                    return status === "sent" ? (
                      <FiCheck aria-label="Sent" className="text-slate-300" size={13} />
                    ) : (
                      <span
                        aria-label={status === "read" ? "Read" : "Delivered"}
                        className={`inline-flex -space-x-1 ${status === "read" ? "text-sky-300" : "text-slate-300"}`}
                      >
                        <FiCheck size={13} />
                        <FiCheck size={13} />
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>
          );
        })}
        {peerTyping && (
          <p className="text-xs text-slate-400">The other participant is typing...</p>
        )}
        <div ref={bottomRef} />
      </div>

      {conversation.status === "closed" ? (
        <p className="border-t border-white/10 px-5 py-4 text-center text-sm text-slate-400">
          This conversation is closed.
        </p>
      ) : (
        <form onSubmit={submit} className="flex gap-3 border-t border-white/10 p-4">
          <input
            value={content}
            onChange={(event) => updateTyping(event.target.value)}
            onBlur={() => {
              if (conversationId) {
                getCommunicationSocket()?.emit("typing:stop", { conversationId });
              }
            }}
            maxLength={2000}
            placeholder="Write a message..."
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            disabled={!content.trim() || sendMessage.isPending}
            className="rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      )}
    </section>
  );
}

export default ChatPanel;
