import { useState } from "react";
import ChatPanel from "../../../user/features/communication/components/ChatPanel";
import ConversationList from "../../../user/features/communication/components/ConversationList";
import {
  useAdminConversations,
} from "../../../user/features/communication/hooks/useCommunication";

function AdminMessagesPage() {
  const [selectedId, setSelectedId] = useState<string>();
  const conversationsQuery = useAdminConversations();
  const conversations = conversationsQuery.data ?? [];
  const conversation =
    conversations.find((item) => item._id === selectedId) ?? conversations[0];

  return (
    <section className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Messages</h1>
        <p className="mt-2 text-sm text-slate-400">Customer support conversations.</p>
      </div>
      <div className="flex min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 md:min-h-[calc(100vh-12rem)] md:flex-row">
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
              isAdmin
            />
            <ChatPanel conversation={conversation} isAdmin />
          </>
        )}
      </div>
    </section>
  );
}

export default AdminMessagesPage;
