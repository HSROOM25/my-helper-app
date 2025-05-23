
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import WorkerPaymentPage from './pages/WorkerPaymentPage';
import EmployerProfilePage from './pages/EmployerProfilePage';
import HelpSupportPage from './pages/HelpSupportPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ProcessAndFeesPage from './pages/ProcessAndFeesPage';
import { AuthProvider } from "./contexts/AuthContext";
import ProfilesPage from '@/pages/ProfilePage';

const App = () => {
  // Create QueryClient inside the component rather than at the module level
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceId" element={<ServicesPage />} />
                <Route path="/worker-profile" element={<WorkerProfilePage />} />
                <Route path="/employer-profile" element={<EmployerProfilePage />} />
                <Route path="/worker-payment" element={<WorkerPaymentPage />} />
                <Route path="/help-support" element={<HelpSupportPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="/profiles" element={<ProfilesPage />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/process-and-fees" element={<ProcessAndFeesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
