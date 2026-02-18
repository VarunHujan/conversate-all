import { useState } from "react";
import { Upload, Image as ImageIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface FileUploadZoneProps {
  type: "image" | "doc";
  onFileSelect: (file: File) => void;
}

const FileUploadZone = ({ type, onFileSelect }: FileUploadZoneProps) => {
  const [dragOver, setDragOver] = useState(false);

  const Icon = type === "image" ? ImageIcon : FileText;
  const accept = type === "image" ? "image/png,image/jpeg,image/webp" : ".pdf,.docx,.txt";
  const label = type === "image" ? "Drag & drop an image here" : "Upload a PDF or document";
  const hint = type === "image" ? "PNG, JPG, WEBP — Max 10MB" : "PDF, DOCX, TXT — Max 20MB";
  const accentBg = type === "image" ? "bg-primary/10" : "bg-purple/10";
  const accentText = type === "image" ? "text-primary" : "text-purple";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) onFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <motion.label
      animate={dragOver ? { scale: 1.02 } : { scale: 1 }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`mx-auto flex w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 transition-all
        ${dragOver ? "border-primary bg-primary/5 shadow-md" : "border-border bg-background hover:border-muted-foreground"}
      `}
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${accentBg}`}>
        <Icon className={`h-8 w-8 ${accentText}`} />
      </div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">or click to browse</p>
      <p className="text-[10px] text-muted-foreground">{hint}</p>
      <input type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])} />
    </motion.label>
  );
};

export default FileUploadZone;
