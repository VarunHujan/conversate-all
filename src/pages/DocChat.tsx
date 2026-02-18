import { useState, useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import ChatWindow from "@/components/chat/ChatWindow";
import InputBar from "@/components/chat/InputBar";
import FileUploadZone from "@/components/chat/FileUploadZone";
import ModelSelector from "@/components/ModelSelector";
import { FileText, X } from "lucide-react";

const DocChat = () => {
  const { addMessage } = useApp();
  const [typing, setTyping] = useState(false);
  const [docName, setDocName] = useState<string | null>(null);

  const handleDocSelect = (file: File) => {
    setDocName(file.name);
  };

  const handleSend = useCallback((text: string) => {
    addMessage({ role: "user", content: text });
    setTyping(true);
    setTimeout(() => {
      addMessage({ role: "ai", content: `Analyzing "${docName}" for your question: "${text}". Connect a document processing API for real analysis!` });
      setTyping(false);
    }, 1500);
  }, [addMessage, docName]);

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 transition-theme">
        <div className="flex items-center gap-2 text-base font-bold text-foreground">
          <FileText className="h-5 w-5 text-purple" /> Doc Chat
        </div>
        <ModelSelector compact />
      </div>

      {!docName ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <FileUploadZone type="doc" onFileSelect={handleDocSelect} />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
            <FileText className="h-4 w-4 text-purple" />
            <span className="text-sm font-medium text-foreground">{docName}</span>
            <button onClick={() => setDocName(null)} className="ml-auto flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          </div>
          <ChatWindow typing={typing} emptyMessage="📄 Document loaded! Ask me anything about it." />
          <InputBar onSend={handleSend} placeholder="Ask a question about the document..." />
        </>
      )}
    </div>
  );
};

export default DocChat;
