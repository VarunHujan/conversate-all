import { useState, useCallback } from "react";
import { useApp } from "@/contexts/AppContext";
import ChatWindow from "@/components/chat/ChatWindow";
import InputBar from "@/components/chat/InputBar";
import FileUploadZone from "@/components/chat/FileUploadZone";
import ModelSelector from "@/components/ModelSelector";
import { Image as ImageIcon, X } from "lucide-react";

const ImageChat = () => {
  const { addMessage, activeMessages } = useApp();
  const [typing, setTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
  };

  const handleSend = useCallback((text: string) => {
    addMessage({ role: "user", content: text, imageUrl: uploadedImage ?? undefined });
    setUploadedImage(null);
    setTyping(true);
    setTimeout(() => {
      addMessage({ role: "ai", content: `Analyzing your ${uploadedImage ? "image" : "message"}: "${text}". Connect a vision API for real analysis!` });
      setTyping(false);
    }, 1500);
  }, [addMessage, uploadedImage]);

  const showUploadZone = activeMessages.length === 0 && !uploadedImage;

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 transition-theme">
        <div className="flex items-center gap-2 text-base font-bold text-foreground">
          <ImageIcon className="h-5 w-5 text-primary" /> Image Chat
        </div>
        <ModelSelector compact />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {showUploadZone ? (
          <div className="flex flex-1 items-center justify-center p-8">
            <FileUploadZone type="image" onFileSelect={handleImageSelect} />
          </div>
        ) : (
          <ChatWindow typing={typing} emptyMessage="Upload an image and ask questions about it." />
        )}
      </div>

      {uploadedImage && (
        <div className="flex items-center gap-2 border-t border-border bg-surface px-4 py-2">
          <div className="relative">
            <img src={uploadedImage} alt="Preview" className="h-12 w-12 rounded-lg object-cover" />
            <button onClick={() => setUploadedImage(null)} className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
              <X className="h-3 w-3" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">Image attached</span>
        </div>
      )}

      <InputBar
        onSend={handleSend}
        placeholder="Ask about the image..."
        showImageAttach
        onImageAttach={handleImageSelect}
      />
    </div>
  );
};

export default ImageChat;
