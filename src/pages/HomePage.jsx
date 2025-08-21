import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import FaqSection from '@/components/home/FaqSection';
import HomeFooter from '@/components/layout/HomeFooter';
import OlondoFeaturesSection from '@/components/home/OlondoFeaturesSection'; // Import the new section
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
      <section className="relative overflow-hidden w-full min-h-screen flex items-center md:-mt-20 lg:-mt-24 py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900">  
        <div className="container mx-auto px-4 md:px-6">

          {/* === BG: LÍNEAS + CÍRCULOS === */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {/* Líneas diagonales visibles (↘ desde arriba-derecha a abajo-izquierda = 135deg) */}
            <div
              className="absolute inset-0"
              style={{
                opacity: 0.35, // +visibles (antes 0.28). Ajustable 0.25–0.45
                backgroundImage:
                  'linear-gradient(135deg, rgba(59,130,246,0.22) 1px, transparent 1px)',
                backgroundSize: '22px 22px' // trama un poco más densa (antes 26px)
              }}
            />
            {/* Círculos difuminados blancos (muy suaves) */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/55 dark:bg-slate-800/30 blur-2xl" />
            <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full bg-white/45 dark:bg-slate-700/25 blur-2xl" />
          </div>

          {/* === HERO A LA IZQUIERDA (con espacio a la derecha) === */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative z-10">
            <div className="w-full md:w-1/2 text-left">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {t('welcome_part1')} 
              </motion.h1>

              <motion.p
                className="max-w-2xl text-lg md:text-xl text-gray-700 dark:text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {t('homeSubtitle')}
              </motion.p>

              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate('/free-trial')}
                  className="text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl px-12 py-7
                             shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                             ring-2 ring-emerald-400/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/60
                             transition-all duration-200 will-change-transform hover:-translate-y-0.5"
                >
                  <Sparkles size={20} className="mr-2.5" />
                  {t('navFreeTrial', 'Prueba Gratis')}
                </Button>
              </motion.div>
            </div>

            {/* Columna derecha: mockup */}
            <div className="hidden md:flex md:w-1/2 justify-end">
              <HeroRightMockup />
            </div>
          </div>
        </div>
      </section>

      <OlondoBenefitsSection />

      <OlondoFeaturesSection /> {/* Add the new OlondoFeaturesSection here */}
      <FaqSection />
      <OlondoCTASection />
      <HomeFooter />
    </motion.div>
  );
};

export default HomePage;