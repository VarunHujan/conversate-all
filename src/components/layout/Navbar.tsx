import ThemeToggle from "@/components/ThemeToggle";
import ModelSelector from "@/components/ModelSelector";
import { User, Settings, LogOut, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mobileSidebarOpen, setMobileSidebarOpen } = useApp();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-navbar-border bg-navbar px-4 transition-theme">
      {/* Left */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-theme"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <span className="text-lg font-bold tracking-tight">
          Deep<span className="text-primary">AI</span>OCR
        </span>
        <div className="mx-2 hidden h-5 w-px bg-border sm:block" />
        <span className="hidden text-sm font-light text-muted-foreground sm:block">LLM Playground</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:block">
          <ModelSelector />
        </div>
        <ThemeToggle />
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-theme hover:opacity-90"
          >
            U
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-border bg-card p-2 shadow-lg animate-in fade-in slide-in-from-top-2">
              <div className="border-b border-border px-3 py-3 mb-1">
                <p className="text-sm font-semibold text-foreground">User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent transition-theme">
                <User className="h-4 w-4" /> Profile Details
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent transition-theme">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <div className="my-1 border-t border-border" />
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-accent transition-theme">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
