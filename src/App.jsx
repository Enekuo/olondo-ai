import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Dashboard from "@/pages/Dashboard";
import SettingsPage from "@/pages/SettingsPage";
import CreateNewPage from "@/pages/CreateNewPage";
import LibraryPage from "@/pages/LibraryPage";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/app/dashboard"); // ocultar navbar/footer en dashboard

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/create" element={<CreateNewPage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
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