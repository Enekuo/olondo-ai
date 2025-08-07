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
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🧠 ¿Te cuesta concentrarte al leer?
            </motion.h1>

            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Convierte tus ideas en textos con IA <br /> y escúchalos como una experiencia auditiva
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-slate-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Crea textos o resúmenes directamente desde tu idea o contenido (PDF, enlaces…) y obtén resultados listos para escuchar, como un podcast personalizado.
            </motion.p>

            <motion.p
              className="text-base italic text-gray-600 dark:text-gray-400 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Ideal para estudiantes, trabajadores, emprendedores… o cualquier persona que prefiere escuchar en vez de leer.
            </motion.p>

            <motion.div
              className="mb-10 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/free-trial')}
                className="text-lg font-semibold bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-12 py-7"
              >
                🚀 {t('navFreeTrial', 'Prueba Gratis')}
              </Button>

              <Button
                asChild
                size="lg"
                className="text-base font-semibold bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
              >
                <Link to="/pricing">✍ {t('homeBtnCreateText', 'Crear Texto')}</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base font-semibold border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-700/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
              >
                <Link to="/pricing">📝 {t('homeBtnCreateSummary', 'Crear Resumen')}</Link>
              </Button>
            </motion.div>
          </div>

          <div className="hidden md:block w-[300px] h-[300px]">
            {/* Aquí puedes añadir una ilustración SVG o imagen tipo caricatura */}
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
