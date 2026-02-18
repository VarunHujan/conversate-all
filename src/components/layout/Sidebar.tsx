import { Home, MessageSquare, Image, FileText, Clock, Settings, HelpCircle, PanelLeftClose, PanelLeft, X } from "lucide-react";
import { useApp, type ChatMode } from "@/contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { icon: Home, label: "Home", path: "/", mode: null as ChatMode },
  { icon: MessageSquare, label: "Text Chat", path: "/chat/text", mode: "text" as ChatMode },
  { icon: Image, label: "Image Chat", path: "/chat/image", mode: "image" as ChatMode },
  { icon: FileText, label: "Doc Chat", path: "/chat/document", mode: "doc" as ChatMode },
  { icon: Clock, label: "History", path: null, mode: null as ChatMode },
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, setActiveMode, subSidebarOpen, setSubSidebarOpen, startNewChat, mobileSidebarOpen, setMobileSidebarOpen } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleNav = (item: typeof navItems[0]) => {
    if (item.label === "History") {
      setSubSidebarOpen(!subSidebarOpen);
      return;
    }
    if (item.path) {
      navigate(item.path);
      if (item.mode) {
        setActiveMode(item.mode);
        setSubSidebarOpen(true);
        startNewChat(item.mode);
      } else {
        setActiveMode(null);
        setSubSidebarOpen(false);
      }
    }
    if (isMobile) setMobileSidebarOpen(false);
  };

  // Mobile: overlay sidebar
  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col bg-sidebar border-r border-sidebar-border"
            >
              <div className="flex h-[60px] items-center justify-between px-4 border-b border-sidebar-border">
                <span className="text-lg font-bold">
                  Deep<span className="text-primary">AI</span>OCR
                </span>
                <button onClick={() => setMobileSidebarOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 px-2 pt-2">
                {navItems.map((item) => {
                  const active = item.path ? location.pathname === item.path : false;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item)}
                      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-theme
                        ${active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                      `}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-1 border-t border-sidebar-border px-2 py-2">
                {bottomItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-theme hover:bg-accent hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-[60px] z-40 flex h-[calc(100vh-60px)] flex-col border-r border-sidebar-border bg-sidebar transition-theme"
    >
      {/* Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="m-2 flex h-8 w-8 items-center justify-center self-end rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-theme"
      >
        {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </button>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = item.path ? location.pathname === item.path : false;
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-theme
                ${active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                />
              )}
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 border-t border-sidebar-border px-2 py-2">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-theme hover:bg-accent hover:text-foreground"
            title={sidebarCollapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
