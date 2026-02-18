import { motion } from "framer-motion";
import type { ChatMessage } from "@/contexts/AppContext";

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser ? "bg-chat-user text-chat-user-foreground" : "bg-chat-ai text-chat-ai-foreground"}
        `}
      >
        {message.imageUrl && (
          <img src={message.imageUrl} alt="Uploaded" className="mb-2 max-h-48 rounded-lg object-cover" />
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className={`mt-1 block text-[10px] ${isUser ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
