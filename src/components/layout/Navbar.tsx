import ThemeToggle from "@/components/ThemeToggle";
import ModelSelector from "@/components/ModelSelector";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-navbar-border bg-navbar px-4 transition-theme">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight">
          Deep<span className="text-primary">AI</span>OCR
        </span>
        <div className="mx-2 h-5 w-px bg-border" />
        <span className="text-sm font-light text-muted-foreground">LLM Playground</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ModelSelector />
        <ThemeToggle />
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-theme hover:opacity-90">
          U
        </button>
      </div>
    </header>
  );
};

export default Navbar;
