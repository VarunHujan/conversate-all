import { useRef, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  typing?: boolean;
  emptyMessage?: string;
  header?: React.ReactNode;
}

const ChatWindow = ({ typing, emptyMessage, header }: ChatWindowProps) => {
  const { activeMessages } = useApp();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages, typing]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {header}
      <div className="flex-1 overflow-y-auto py-4">
        {activeMessages.length === 0 && emptyMessage && (
          <p className="py-20 text-center text-sm italic text-muted-foreground">{emptyMessage}</p>
        )}
        {activeMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
