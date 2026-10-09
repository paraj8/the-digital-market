import type { CommunicationConversation } from "../api/communicationApi";

interface ConversationListProps {
  conversations: CommunicationConversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  isAdmin?: boolean;
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
  isAdmin = false,
}: ConversationListProps) {
  const getTitle = (conversation: CommunicationConversation) => {
    if (!isAdmin) return conversation.subject || "Customer support";
    if (typeof conversation.customer === "string") return "Customer";
    return conversation.customer?.fullName || conversation.customer?.email || "Customer";
  };

  return (
    <aside className="w-full border-b border-white/10 md:w-80 md:shrink-0 md:border-b-0 md:border-r">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="font-semibold">Conversations</h2>
        <p className="mt-1 text-xs text-slate-400">
          {conversations.length} {conversations.length === 1 ? "conversation" : "conversations"}
        </p>
      </div>
      <div className="max-h-64 overflow-y-auto md:max-h-[calc(75vh-5rem)]">
        {conversations.map((conversation) => (
          <button
            key={conversation._id}
            type="button"
            onClick={() => onSelect(conversation._id)}
            className={`w-full border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/5 ${
              selectedId === conversation._id ? "bg-violet-500/10" : ""
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-medium">{getTitle(conversation)}</span>
              {Boolean(conversation.unreadCount) && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-xs">
                  {conversation.unreadCount}
                </span>
              )}
            </span>
            <span className="mt-1 block truncate text-xs text-slate-400">
              {conversation.lastMessage || "No messages yet"}
            </span>
            <span className="mt-2 block text-[11px] capitalize text-slate-500">
              {conversation.status}
            </span>
          </button>
        ))}
        {conversations.length === 0 && (
          <p className="px-5 py-8 text-sm text-slate-400">No conversations yet.</p>
        )}
      </div>
    </aside>
  );
}

export default ConversationList;
