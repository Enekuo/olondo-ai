import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

const FreeTrialPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: (i) => ({ 
      opacity: 1, 
      scale: 1, 
      transition: { delay: i * 0.15 + 0.3, type: 'spring', stiffness: 100 } 
    }),
  };

  const options = [
    {
      titleKey: 'freeTrialCreateTextButton',
      defaultTitle: 'Crear Texto',
      descriptionKey: 'freeTrialCreateTextDescription',
      defaultDescription: 'Genera contenido original a partir de tus ideas o documentos.',
      icon: <FileText className="h-10 w-10 mb-4 text-blue-500" />,
      path: '/create-text',
      gradient: 'from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600',
    },
    {
      titleKey: 'freeTrialCreateSummaryButton',
      defaultTitle: 'Crear Resumen',
      descriptionKey: 'freeTrialCreateSummaryDescription',
      defaultDescription: 'Obtén resúmenes concisos de textos largos o archivos.',
      icon: <BookOpen className="h-10 w-10 mb-4 text-purple-500" />,
      path: '/create-summary',
      gradient: 'from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600',
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 p-6"
    >
      <div className="absolute top-20 left-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="text-primary hover:bg-primary/10">
          <ArrowLeft className="mr-2 h-5 w-5" />
          {t('goBackHome', 'Volver al Inicio')}
        </Button>
      </div>

      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
      >
        <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          {t('freeTrialPageTitle', 'Comienza tu Prueba Gratis')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {t('freeTrialPageSubtitle', 'Explora el poder de Olondo AI. Elige una opción para empezar:')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {options.map((option, index) => (
          <motion.div
            key={option.titleKey}
            custom={index}
            variants={cardVariants}
            initial="initial"
            animate="in"
            className={`bg-white dark:bg-slate-800/70 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-transparent hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center`}
            onClick={() => navigate(option.path)}
          >
            {option.icon}
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
              {t(option.titleKey, option.defaultTitle)}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
              {t(option.descriptionKey, option.defaultDescription)}
            </p>
            <Button 
              size="lg"
              className={`w-full text-base font-semibold bg-gradient-to-r ${option.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg`}
            >
              {t('freeTrialSelectOption', 'Seleccionar')}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FreeTrialPage;