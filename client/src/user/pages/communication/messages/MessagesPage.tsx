import { useState } from "react";
import toast from "react-hot-toast";
import ChatPanel from "../../../features/communication/components/ChatPanel";
import ConversationList from "../../../features/communication/components/ConversationList";
import {
  useCreateCustomerConversation,
  useCustomerConversations,
  useConversationUpdates,
} from "../../../features/communication/hooks/useCommunication";

function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>();
  const conversationsQuery = useCustomerConversations();
  const createConversation = useCreateCustomerConversation();
  useConversationUpdates();
  const conversations = conversationsQuery.data ?? [];
  const conversation =
    conversations.find((item) => item._id === selectedId) ??
    conversations.find((item) => item.status === "open" || item.status === "pending");

  const startConversation = () => {
    createConversation.mutate(undefined, {
      onSuccess: (created) => setSelectedId(created._id),
      onError: () => toast.error("Unable to start a support conversation."),
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Messages</h1>
          <p className="mt-2 text-sm text-slate-400">Chat with our customer support team.</p>
        </div>
        <button
          type="button"
          onClick={startConversation}
          disabled={createConversation.isPending}
          className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold hover:bg-violet-500 disabled:opacity-50"
        >
          {createConversation.isPending ? "Starting..." : "Start a conversation"}
        </button>
      </div>
      <div className="flex min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 md:min-h-[38rem] md:flex-row">
        {conversationsQuery.isPending ? (
          <p className="p-6 text-sm text-slate-400">Loading conversations...</p>
        ) : conversationsQuery.isError ? (
          <p className="p-6 text-sm text-red-300">Unable to load conversations.</p>
        ) : (
          <>
            <ConversationList
              conversations={conversations}
              selectedId={conversation?._id}
              onSelect={setSelectedId}
            />
            {conversation ? (
              <ChatPanel conversation={conversation} />
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-slate-400">
                Start a conversation and our support team will be with you shortly.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default MessagesPage;