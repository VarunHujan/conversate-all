import { motion } from "framer-motion";
import { MessageSquare, Image, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const cards = [
  {
    icon: Image,
    title: "Image Chat",
    description: "Upload images and ask questions. Analyze, describe, and extract information visually.",
    path: "/chat/image",
    mode: "image" as const,
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    btnClass: "bg-primary text-primary-foreground hover:brightness-110",
  },
  {
    icon: FileText,
    title: "Doc Chat",
    description: "Upload PDFs or documents and have an intelligent conversation about their content.",
    path: "/chat/document",
    mode: "doc" as const,
    accentBg: "bg-purple/10",
    accentText: "text-purple",
    btnClass: "bg-purple text-primary-foreground hover:brightness-110",
  },
  {
    icon: MessageSquare,
    title: "Text Chat",
    description: "Chat directly with top AI models — GPT, Claude, Gemini, Sarvam — all in one place.",
    path: "/chat/text",
    mode: "text" as const,
    accentBg: "bg-success/10",
    accentText: "text-success",
    btnClass: "bg-success text-primary-foreground hover:brightness-110",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { setActiveMode, setSubSidebarOpen, startNewChat } = useApp();

  const handleClick = (card: typeof cards[0]) => {
    setActiveMode(card.mode);
    setSubSidebarOpen(true);
    startNewChat(card.mode);
    navigate(card.path);
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-2 text-center text-4xl font-bold text-foreground"
      >
        Welcome to LLM Playground
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 text-center text-base text-muted-foreground"
      >
        Choose a mode to get started
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.15)" }}
            className="flex w-[280px] flex-col items-center rounded-2xl border border-border bg-card p-8 shadow-md transition-theme"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${card.accentBg}`}
            >
              <card.icon className={`h-8 w-8 ${card.accentText}`} />
            </motion.div>
            <h2 className="mb-2 text-xl font-bold text-card-foreground">{card.title}</h2>
            <p className="mb-6 text-center text-sm text-muted-foreground">{card.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleClick(card)}
              className={`group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${card.btnClass}`}
            >
              Click to Chat
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
