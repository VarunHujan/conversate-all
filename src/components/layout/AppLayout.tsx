import { useApp } from "@/contexts/AppContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SubSidebar from "./SubSidebar";
import { motion } from "framer-motion";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarCollapsed, subSidebarOpen } = useApp();

  const sidebarWidth = sidebarCollapsed ? 64 : 240;
  const subWidth = subSidebarOpen ? 260 : 0;
  const marginLeft = sidebarWidth + subWidth;

  return (
    <div className="min-h-screen bg-background transition-theme">
      <Navbar />
      <Sidebar />
      <SubSidebar />
      <motion.main
        animate={{ marginLeft }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mt-[60px] min-h-[calc(100vh-60px)]"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default AppLayout;
