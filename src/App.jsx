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
// Premium Pages
import PremiumDashboard        from "./pages/PremiumPlan/Dashboard.jsx";
import PremiumSettingsPage     from "./pages/PremiumPlan/SettingsPage.jsx";
import PremiumLibraryPage      from "./pages/PremiumPlan/LibraryPage.jsx";
import PremiumCreateNewPage    from "./pages/PremiumPlan/CreateNewPage.jsx";
import PremiumCreateSummaryPage from "./pages/PremiumPlan/CreateSummaryPage.jsx";
import PremiumCreateTextPage    from "./pages/PremiumPlan/CreateTextPage.jsx";

function AppContent() {
  const location = useLocation();

  // Rutas donde se OCULTAN Navbar y Footer.
  // Importante: solo coinciden si es exactamente la ruta o un subpath ("/ruta/..."),
  // NO por compartir prefijo. Así evitamos ocultar en "/create-text" y "/create-summary".
  const hideOn = ["/app/dashboard", "/create", "/settings", "/library"];
  const shouldHideLayout = hideOn.some((path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!shouldHideLayout && <Navbar />}

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

        {/* Premium Routes */}
        <Route path="/dashboard"        element={<PremiumDashboard />} />
        <Route path="/settings"         element={<PremiumSettingsPage />} />
        <Route path="/library"          element={<PremiumLibraryPage />} />
        <Route path="/create"           element={<PremiumCreateNewPage />} />
        <Route path="/create/summary"   element={<PremiumCreateSummaryPage />} />
        <Route path="/create/text"      element={<PremiumCreateTextPage />} />
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