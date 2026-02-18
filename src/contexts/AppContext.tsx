import React, { createContext, useContext, useState, useCallback } from "react";

export type ChatMode = "text" | "image" | "doc" | null;
export type AIModel = "GPT-4o" | "Claude 3.5" | "Gemini 1.5" | "Sarvam AI";

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  mode: ChatMode;
  timestamp: Date;
  messages: ChatMessage[];
}

interface AppContextType {
  selectedModel: AIModel;
  setSelectedModel: (m: AIModel) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  subSidebarOpen: boolean;
  setSubSidebarOpen: (v: boolean) => void;
  activeMode: ChatMode;
  setActiveMode: (m: ChatMode) => void;
  chatSessions: ChatSession[];
  activeChatId: string | null;
  startNewChat: (mode: ChatMode) => void;
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  loadChat: (id: string) => void;
  clearHistory: () => void;
  activeMessages: ChatMessage[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState<AIModel>("GPT-4o");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [subSidebarOpen, setSubSidebarOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<ChatMode>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const startNewChat = useCallback((mode: ChatMode) => {
    const id = crypto.randomUUID();
    const session: ChatSession = {
      id,
      title: "New Chat",
      mode,
      timestamp: new Date(),
      messages: [],
    };
    setChatSessions((prev) => [session, ...prev]);
    setActiveChatId(id);
    setActiveMode(mode);
    setSubSidebarOpen(true);
  }, []);

  const addMessage = useCallback((msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const message: ChatMessage = { ...msg, id: crypto.randomUUID(), timestamp: new Date() };
    setChatSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeChatId) return s;
        const messages = [...s.messages, message];
        const title = s.messages.length === 0 && msg.role === "user" ? msg.content.slice(0, 40) : s.title;
        return { ...s, messages, title };
      })
    );
  }, [activeChatId]);

  const loadChat = useCallback((id: string) => {
    const session = chatSessions.find((s) => s.id === id);
    if (session) {
      setActiveChatId(id);
      setActiveMode(session.mode);
    }
  }, [chatSessions]);

  const clearHistory = useCallback(() => {
    setChatSessions([]);
    setActiveChatId(null);
  }, []);

  const activeSession = chatSessions.find((s) => s.id === activeChatId);
  const activeMessages = activeSession?.messages ?? [];

  return (
    <AppContext.Provider
      value={{
        selectedModel, setSelectedModel,
        sidebarCollapsed, setSidebarCollapsed,
        subSidebarOpen, setSubSidebarOpen,
        activeMode, setActiveMode,
        chatSessions, activeChatId,
        startNewChat, addMessage, loadChat, clearHistory,
        activeMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
