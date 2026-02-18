import { useState, useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import ChatWindow from "@/components/chat/ChatWindow";
import InputBar from "@/components/chat/InputBar";
import ModelSelector from "@/components/ModelSelector";
import { MessageSquare } from "lucide-react";

const TextChat = () => {
  const { addMessage } = useApp();
  const [typing, setTyping] = useState(false);

  const handleSend = useCallback((text: string) => {
    addMessage({ role: "user", content: text });
    setTyping(true);
    setTimeout(() => {
      addMessage({ role: "ai", content: `This is a simulated AI response to: "${text}". Connect an API to get real responses!` });
      setTyping(false);
    }, 1500);
  }, [addMessage]);

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <ChatWindow
        typing={typing}
        emptyMessage="Start a conversation with your chosen AI model."
        header={
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 transition-theme">
            <div className="flex items-center gap-2 text-base font-bold text-foreground">
              <MessageSquare className="h-5 w-5 text-success" /> Text Chat
            </div>
            <ModelSelector compact />
          </div>
        }
      />
      <InputBar onSend={handleSend} />
    </div>
  );
};

export default TextChat;
