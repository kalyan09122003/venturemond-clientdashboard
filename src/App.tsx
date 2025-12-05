import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Files from "./pages/Files";
import Team from "./pages/Team";
import Billing from "./pages/Billing";
import Analytics from "./pages/Analytics";
import Support from "./pages/Support";
import Integrations from "./pages/Integrations";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/files" element={<Files />} />
            <Route path="/team" element={<Team />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/support" element={<Support />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
