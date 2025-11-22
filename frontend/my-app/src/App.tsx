import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Engage from "./pages/Engage";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import ChatBot from "@/components/ChatBot";
import Auth from "./pages/Auth"; // 👈 Replace Login and Signup with Auth
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedPages from "./ProtectedPages";
import UserHeader from "@/components/UserHeader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <UserHeader />
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} /> {/* 👈 Single auth route */}

          {/* Protected area */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedPages />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;