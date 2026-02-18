import { useApp, type AIModel } from "@/contexts/AppContext";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const models: { name: AIModel; color: string }[] = [
  { name: "GPT-4o", color: "bg-success" },
  { name: "Claude 3.5", color: "bg-purple" },
  { name: "Gemini 1.5", color: "bg-primary" },
  { name: "Sarvam AI", color: "bg-destructive" },
];

const ModelSelector = ({ compact = false }: { compact?: boolean }) => {
  const { selectedModel, setSelectedModel } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = models.find((m) => m.name === selectedModel)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-theme hover:bg-accent ${compact ? "px-2 py-1 text-xs" : ""}`}
      >
        <span className={`h-2 w-2 rounded-full ${current.color}`} />
        {current.name}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-1 w-44 origin-top rounded-lg border border-border bg-popover p-1 shadow-lg"
          >
            {models.map((m) => (
              <button
                key={m.name}
                onClick={() => { setSelectedModel(m.name); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-theme hover:bg-accent ${m.name === selectedModel ? "bg-accent font-medium" : ""}`}
              >
                <span className={`h-2 w-2 rounded-full ${m.color}`} />
                {m.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;
