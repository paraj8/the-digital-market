import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommunicationSocket } from "../api/communicationSocket";
import toast from "react-hot-toast";
import {
  closeCustomerConversation,
  createCustomerConversation,
  getAdminConversations,
  getConversationMessages,
  getCustomerConversations,
  markConversationRead,
  sendConversationMessage,
  type CommunicationConversation,
  type CommunicationMessage,
} from "../api/communicationApi";

export const communicationKeys = {
  conversations: ["communication", "conversations"] as const,
  adminConversations: ["communication", "admin-conversations"] as const,
  messages: (id: string) => ["communication", "messages", id] as const,
  messageStatuses: ["communication", "message-statuses"] as const,
};
const messageKey = (id: string, isAdmin: boolean) =>
  communicationKeys.messages(`${isAdmin ? "admin:" : "customer:"}${id}`);

export const useCustomerConversations = () =>
  useQuery({
    queryKey: communicationKeys.conversations,
    queryFn: getCustomerConversations,
  });

export const useAdminConversations = () =>
  useQuery({
    queryKey: communicationKeys.adminConversations,
    queryFn: getAdminConversations,
  });

export const useConversationMessages = (id: string | undefined, isAdmin = false) =>
  useQuery({
    queryKey: messageKey(id ?? "", isAdmin),
    queryFn: () => {
      if (!id) throw new Error("A conversation is required to load messages");
      return getConversationMessages(id, isAdmin);
    },
    enabled: Boolean(id),
  });

export const useConversationUpdates = (isAdmin = false) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getCommunicationSocket();
    if (!socket) return;
    const onUpdate = () => {
      queryClient.invalidateQueries({
        queryKey: isAdmin
          ? communicationKeys.adminConversations
          : communicationKeys.conversations,
      });
    };
    socket.on("conversation:updated", onUpdate);
    return () => {
      socket.off("conversation:updated", onUpdate);
    };
  }, [isAdmin, queryClient]);
};

export const useCreateCustomerConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomerConversation,
    onSuccess: (conversation) => {
      queryClient.setQueryData<CommunicationConversation[]>(
        communicationKeys.conversations,
        (current = []) => [
          conversation,
          ...current.filter((item) => item._id !== conversation._id),
        ]
      );
    },
  });
};

export const useSendConversationMessage = (isAdmin = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendConversationMessage,
    onSuccess: (message, variables) => {
      const key = messageKey(variables.conversationId, isAdmin);
      const knownStatus = queryClient.getQueryData<Record<string, "delivered" | "read">>(
        communicationKeys.messageStatuses
      )?.[message._id];
      const finalMessage = knownStatus
        ? {
            ...message,
            messageStatus: knownStatus,
            isRead: knownStatus === "read" || message.isRead,
          }
        : message;
      queryClient.setQueryData<CommunicationMessage[]>(key, (current = []) =>
        current.some((item) => item._id === message._id)
          ? current
          : [...current, finalMessage]
      );
      queryClient.invalidateQueries({
        queryKey: isAdmin
          ? communicationKeys.adminConversations
          : communicationKeys.conversations,
      });
    },
  });
};

export const useMarkConversationRead = (isAdmin = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markConversationRead(id, isAdmin),
    onMutate: async (id) => {
      const conversationsKey = isAdmin
        ? communicationKeys.adminConversations
        : communicationKeys.conversations;
      const messagesKey = messageKey(id, isAdmin);
      await Promise.all([
        queryClient.cancelQueries({ queryKey: conversationsKey }),
        queryClient.cancelQueries({ queryKey: messagesKey }),
      ]);
      const previousConversations =
        queryClient.getQueryData<CommunicationConversation[]>(conversationsKey);
      const previousMessages =
        queryClient.getQueryData<CommunicationMessage[]>(messagesKey);
      queryClient.setQueryData<CommunicationConversation[]>(conversationsKey, (current) =>
        current?.map((conversation) =>
          conversation._id === id ? { ...conversation, unreadCount: 0 } : conversation
        )
      );
      queryClient.setQueryData<CommunicationMessage[]>(messagesKey, (current) =>
        current?.map((message) => {
          const incoming = isAdmin
            ? message.senderType === "customer"
            : message.senderType !== "customer";
          return incoming
            ? { ...message, isRead: true, messageStatus: "read" }
            : message;
        })
      );
      return { conversationsKey, messagesKey, previousConversations, previousMessages };
    },
    onError: (_error, _id, context) => {
      if (!context) return;
      queryClient.setQueryData(context.conversationsKey, context.previousConversations);
      queryClient.setQueryData(context.messagesKey, context.previousMessages);
      toast.error("Unable to mark messages as read. Please try again.");
    },
    onSuccess: (result, id, context) => {
      queryClient.setQueryData<CommunicationConversation[]>(
        context?.conversationsKey ?? (isAdmin
          ? communicationKeys.adminConversations
          : communicationKeys.conversations),
        (current) => current?.map((conversation) =>
          conversation._id === id ? { ...conversation, unreadCount: 0 } : conversation
        )
      );
      queryClient.setQueryData<CommunicationMessage[]>(
        context?.messagesKey ?? messageKey(id, isAdmin),
        (current) => current?.map((message) =>
          result.messageIds.includes(message._id)
            ? { ...message, isRead: true, messageStatus: "read" }
            : message
        )
      );
      queryClient.setQueryData<Record<string, "delivered" | "read">>(
        communicationKeys.messageStatuses,
        (current = {}) => Object.fromEntries([
          ...Object.entries(current),
          ...result.messageIds.map((messageId) => [messageId, "read" as const]),
        ])
      );
    },
  });
};

export const useCloseCustomerConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeCustomerConversation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: communicationKeys.conversations }),
  });
};
