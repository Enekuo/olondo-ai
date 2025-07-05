import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import FaqSection from '@/components/home/FaqSection';
import HomeFooter from '@/components/layout/HomeFooter';
import OlondoFeaturesSection from '@/components/home/OlondoFeaturesSection'; // Import the new section
import { Sparkles } from 'lucide-react';

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
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('welcome_part1', 'Bienvenido a')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300">Olondo.IA</span>
          </motion.h1>

          <motion.p 
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('homeSubtitle', 'Introduce tu idea base o vuelca la información (PDF, texto copiado, enlaces…), y deja que la IA cree textos o resúmenes para ti en segundos.')}
          </motion.p>
          
          <motion.p
            className="max-w-xl mx-auto text-md text-slate-500 dark:text-slate-400 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
             {t('homeParagraph', 'Olondo AI es tu espacio para generar contenido, colaborar, y escuchar el resultado con voz sintética.')}
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
              className="text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg px-12 py-7"
            >
              <Sparkles size={20} className="mr-2.5" />
              {t('navFreeTrial', 'Prueba Gratis')}
            </Button>
          </motion.div>


          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="text-base font-semibold bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
            >
              <Link to="/free-trial">{t('homeBtnCreateText', '✍ Crear Texto')}</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-base font-semibold border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-700/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
            >
              <Link to="/free-trial">{t('homeBtnCreateSummary', '📝 Crear Resumen')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <OlondoFeaturesSection /> {/* Add the new OlondoFeaturesSection here */}
      <FaqSection />
      <HomeFooter /> 
      
    </motion.div>
  );
};

export default HomePage;
// Forzando nuevo deployment tras reset de commits