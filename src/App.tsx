import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/contexts/AppContext";
import AppLayout from "@/components/layout/AppLayout";
import Home from "./pages/Home";
import TextChat from "./pages/TextChat";
import ImageChat from "./pages/ImageChat";
import DocChat from "./pages/DocChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppProvider>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat/text" element={<TextChat />} />
                <Route path="/chat/image" element={<ImageChat />} />
                <Route path="/chat/document" element={<DocChat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
