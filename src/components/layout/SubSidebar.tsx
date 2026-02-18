import { useApp } from "@/contexts/AppContext";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const modeBadge: Record<string, { label: string; className: string }> = {
  text: { label: "Text", className: "bg-success/20 text-success" },
  image: { label: "Image", className: "bg-primary/20 text-primary" },
  doc: { label: "Doc", className: "bg-purple/20 text-purple" },
};

const SubSidebar = () => {
  const { subSidebarOpen, sidebarCollapsed, chatSessions, activeChatId, activeMode, loadChat, startNewChat, clearHistory } = useApp();

  return (
    <AnimatePresence>
      {subSidebarOpen && (
        <motion.aside
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ left: sidebarCollapsed ? 64 : 240 }}
          className="fixed top-[60px] z-30 flex h-[calc(100vh-60px)] w-[260px] flex-col border-r border-sidebar-border bg-sidebar transition-theme"
        >
          {/* Header */}
          <div className="p-3">
            <h3 className="mb-2 text-sm font-bold text-foreground">Chat History</h3>
            <button
              onClick={() => activeMode && startNewChat(activeMode)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.02] hover:brightness-110"
            >
              <Plus className="h-4 w-4" /> New Chat
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-3">
            {chatSessions.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">No chats yet</p>
            )}
            {chatSessions.map((session) => {
              const badge = session.mode ? modeBadge[session.mode] : null;
              return (
                <button
                  key={session.id}
                  onClick={() => loadChat(session.id)}
                  className={`mb-1 flex w-full flex-col items-start rounded-lg p-2.5 text-left transition-theme hover:bg-accent hover:shadow-sm
                    ${session.id === activeChatId ? "border-l-2 border-primary bg-accent" : ""}
                  `}
                >
                  <span className="w-full truncate text-xs font-semibold text-foreground">{session.title}</span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">
                      {session.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {badge && (
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${badge.className}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-3">
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-destructive hover:underline"
            >
              <Trash2 className="h-3 w-3" /> Clear All History
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SubSidebar;
