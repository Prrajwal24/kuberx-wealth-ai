import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import Allocation from "./pages/Allocation";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import BuyCheck from "./pages/BuyCheck";
import WealthSim from "./pages/WealthSim";
import Market from "./pages/Market";
import Emergency from "./pages/Emergency";
import Learn from "./pages/Learn";
import Advisor from "./pages/Advisor";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Onboarding */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            } />

            {/* Protected App Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <AppLayout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/allocation" element={<Allocation />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/buy-check" element={<BuyCheck />} />
                    <Route path="/wealth-sim" element={<WealthSim />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/emergency" element={<Emergency />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/advisor" element={<Advisor />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
