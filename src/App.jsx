import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import CreateTextPage from '@/pages/CreateTextPage';
import CreateSummaryPage from '@/pages/CreateSummaryPage';
import FreeTrialPage from '@/pages/FreeTrialPage';
import PricingPage from '@/pages/PricingPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import { Toaster } from '@/components/ui/toaster';
import LegalNoticePage from '@/pages/LegalNoticePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsConditionsPage from '@/pages/TermsConditionsPage';
import SyntheticVoiceUsagePage from '@/pages/SyntheticVoiceUsagePage';
import CookiesPolicyPage from '@/pages/CookiesPolicyPage';
import SupportPage from "@/pages/SupportPage";
// Premium Pages
import PremiumDashboard         from "./pages/PremiumPlan/Dashboard.jsx";
import PremiumSettingsPage      from "./pages/PremiumPlan/SettingsPage.jsx";
import PremiumLibraryPage       from "./pages/PremiumPlan/LibraryPage.jsx";
import PremiumCreateNewPage     from "./pages/PremiumPlan/CreateNewPage.jsx";
import PremiumCreateSummaryPage from "./pages/PremiumPlan/CreateSummaryPage.jsx";
import PremiumCreateTextPage    from "./pages/PremiumPlan/CreateTextPage.jsx";
import AssistantPage            from "./pages/PremiumPlan/AssistantPage.jsx";

function AppContent() {
  const location = useLocation();

  // Ocultamos Navbar/Footer en el área privada REAL
  const hideOn = ["/dashboard", "/create", "/settings", "/library", "/assistant"];
  const shouldHideLayout = hideOn.some((path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!shouldHideLayout && <Navbar />}

      <Routes>
        {/* Home pública intacta */}
        <Route path="/" element={<HomePage />} />

        {/* Premium / App (dashboard y resto) */}
        <Route path="/dashboard"        element={<PremiumDashboard />} />
        <Route path="/settings"         element={<PremiumSettingsPage />} />
        <Route path="/library"          element={<PremiumLibraryPage />} />
        <Route path="/create"           element={<PremiumCreateNewPage />} />
        <Route path="/create/summary"   element={<PremiumCreateSummaryPage />} />
        <Route path="/create/text"      element={<PremiumCreateTextPage />} />
        <Route path="/assistant"        element={<AssistantPage />} />

        
        <Route path="/app/dashboard" element={<Navigate to="/dashboard" replace />} />

        {/* Public routes */}
        <Route path="/create-text" element={<CreateTextPage />} />
        <Route path="/create-summary" element={<CreateSummaryPage />} />
        <Route path="/free-trial" element={<FreeTrialPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/aviso-legal" element={<LegalNoticePage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
        <Route path="/terminos-condiciones" element={<TermsConditionsPage />} />
        <Route path="/synthetic-voice-use" element={<SyntheticVoiceUsagePage />} />
        <Route path="/cookies" element={<CookiesPolicyPage />} />
        <Route path="/soporte" element={<SupportPage />} />

        {/* 404 → Home pública */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;