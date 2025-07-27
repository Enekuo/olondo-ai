import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import LegalNoticePage from './pages/LegalNoticePage';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <Router>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-text" element={<CreateTextPage />} />
                <Route path="/create-summary" element={<CreateSummaryPage />} />
                <Route path="/free-trial" element={<FreeTrialPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/aviso-legal" element={<LegalNoticePage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;