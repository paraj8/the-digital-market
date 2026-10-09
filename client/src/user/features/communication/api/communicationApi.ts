import axiosInstance from "../../../../api/axios";

export interface CommunicationUser {
  _id: string;
  fullName?: string;
  email?: string;
  profileImage?: string;
  role?: string;
  lastSeenAt?: string | null;
}

export interface CommunicationMessage {
  _id: string;
  conversation: string;
  sender: CommunicationUser;
  senderType: "customer" | "staff" | "admin" | "system" | "ai";
  content: string;
  createdAt: string;
  isRead: boolean;
  messageStatus?: "sent" | "delivered" | "read";
  deliveredAt?: string | null;
  readAt?: string | null;
}

export interface CommunicationConversation {
  _id: string;
  customer: CommunicationUser | string;
  assignedTo?: CommunicationUser | string | null;
  subject: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const customerRoot = "/communication/conversations";
const adminRoot = "/communication/admin/conversations";

const requestData = async <T>(request: Promise<{ data: ApiResponse<T> }>) =>
  (await request).data.data;

export const getCustomerConversations = () =>
  requestData<CommunicationConversation[]>(
    axiosInstance.get<ApiResponse<CommunicationConversation[]>>(customerRoot)
  );

export const createCustomerConversation = () =>
  requestData<CommunicationConversation>(
    axiosInstance.post<ApiResponse<CommunicationConversation>>(customerRoot)
  );

export const getAdminConversations = () =>
  requestData<CommunicationConversation[]>(
    axiosInstance.get<ApiResponse<CommunicationConversation[]>>(adminRoot)
  );

export const getConversationMessages = (conversationId: string, isAdmin = false) =>
  requestData<CommunicationMessage[]>(
    axiosInstance.get<ApiResponse<CommunicationMessage[]>>(
      `${isAdmin ? adminRoot : customerRoot}/${conversationId}/messages`
    )
  );

export const sendConversationMessage = ({
  conversationId,
  content,
  isAdmin = false,
}: {
  conversationId: string;
  content: string;
  isAdmin?: boolean;
}) =>
  requestData<CommunicationMessage>(
    axiosInstance.post<ApiResponse<CommunicationMessage>>(
      `${isAdmin ? adminRoot : customerRoot}/${conversationId}/messages`,
      { content }
    )
  );

export const markConversationRead = (conversationId: string, isAdmin = false) =>
  requestData<{ modifiedCount: number; messageIds: string[] }>(
    axiosInstance.patch<ApiResponse<{ modifiedCount: number; messageIds: string[] }>>(
      `${isAdmin ? adminRoot : customerRoot}/${conversationId}/read`
    )
  );

export const closeCustomerConversation = (conversationId: string) =>
  requestData<CommunicationConversation>(
    axiosInstance.patch<ApiResponse<CommunicationConversation>>(
      `${customerRoot}/${conversationId}/close`
    )
  );
