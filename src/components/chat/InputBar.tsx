import { useState, useRef } from "react";
import { Send, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

interface InputBarProps {
  onSend: (text: string) => void;
  placeholder?: string;
  showImageAttach?: boolean;
  onImageAttach?: (file: File) => void;
}

const InputBar = ({ onSend, placeholder = "Type your message...", showImageAttach, onImageAttach }: InputBarProps) => {
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-surface p-3 transition-theme">
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm">
        {showImageAttach && (
          <>
            <button
              onClick={() => fileRef.current?.click()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-theme hover:bg-accent hover:text-foreground"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onImageAttach?.(e.target.files[0])}
            />
          </>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default InputBar;
