import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadershipDashboard from "./pages/LeadershipDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import SystemFlowPage from "./pages/SystemFlowPage";
import NotFound from "./pages/NotFound";
import StudentRouter from "@/routers/student/StudentRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/leadership" element={<LeadershipDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/student/*" element={<StudentRouter />} />
    
          <Route path="/help/system-flow" element={<SystemFlowPage />} />
          {/* Legacy route redirects */}
          <Route path="/admin" element={<LeadershipDashboard />} />
          <Route path="/instructor" element={<FacultyDashboard />} />
      
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
