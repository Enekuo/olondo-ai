import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import FaqSection from '@/components/home/FaqSection';
import HomeFooter from '@/components/layout/HomeFooter';
import OlondoFeaturesSection from '@/components/home/OlondoFeaturesSection';
import { Sparkles } from 'lucide-react';
import OlondoCTASection from '@/components/home/OlondoCTASection';
import OlondoBenefitsSection from '@/components/home/OlondoBenefitsSection';
import HeroRightMockup from "@/components/shared/HeroRightMockup";

const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex flex-col w-full"
    >
      {/* Fondo blanco limpio como el ejemplo */}
      <section className="relative overflow-hidden w-full min-h-screen flex items-center md:-mt-20 lg:-mt-24 py-16 md:py-24 lg:py-28 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          {/* Layout tipo Makeral: texto izq + visual der */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 lg:gap-16">
            {/* Columna izquierda: título muy grande + subtítulo + CTA */}
            <div className="w-full md:w-1/2 text-left">
              <motion.h1
                className="text-[44px] sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('welcome_part1')}
              </motion.h1>

              <motion.p
                className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {t('homeSubtitle')}
              </motion.p>

              <motion.div
                className="mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/free-trial')}
                  className="text-base md:text-lg font-semibold rounded-xl px-8 md:px-10 py-5
                             bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white
                             shadow-md hover:shadow-lg ring-2 ring-emerald-400/25 focus-visible:ring-4 focus-visible:ring-emerald-400/60
                             transition-all duration-200"
                >
                  <Sparkles size={18} className="mr-2" />
                  {t('navFreeTrial', 'Prueba Gratis')}
                </Button>
              </motion.div>
            </div>

            {/* Columna derecha: mockup (manteniendo tu componente) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="max-w-xl w-full">
                <HeroRightMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OlondoBenefitsSection />
      <OlondoFeaturesSection />
      <FaqSection />
      <OlondoCTASection />
      <HomeFooter />
    </motion.div>
  );
};

export default HomePage;