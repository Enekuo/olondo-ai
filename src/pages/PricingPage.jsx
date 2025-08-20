import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import AuthModal from '@/components/auth/AuthModal';
import { CheckCircle, Sparkles, Gem, ArrowLeft } from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authActionPending, setAuthActionPending] = useState(false);
  const [nextPlan, setNextPlan] = useState(null); // 'basic' | 'premium'

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    in: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.2, type: 'spring', stiffness: 100, damping: 15 }
    }),
  };

  const openCheckout = (planId) => {
    setNextPlan(planId);
    setAuthActionPending(true);
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = (isOpen) => {
    setIsAuthModalOpen(isOpen);
    if (!isOpen && authActionPending) {
      setAuthActionPending(false);
      const dest = nextPlan ? `/checkout?plan=${nextPlan}` : '/checkout';
      navigate(dest);
    }
  };

  const plans = [
    // GRATIS
    {
      id: 'free',
      titleKey: 'pricingFreeTitle',
      priceKey: 'pricingFreePrice',
      featuresKeys: [
        'pricingFeat_ai_free',        // Uso ilimitado con límites funcionales
        'pricingFeat_library_free',   // Sin biblioteca
        'pricingFeat_export_free',    // Solo TXT
        'pricingFeat_audio_free',     // 10 min/día
        'pricingFeat_file_free',      // 5 MB
        'pricingFeat_speed_free',     // Velocidad normal
      ],
      buttonTextKey: 'pricingFreeButton',
      buttonAction: () => navigate('/free-trial'),
      icon: <Sparkles className="h-8 w-8 text-green-500 mb-4" />,
      borderColor: 'border-green-500',
      buttonGradient: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      glow: false,
    },
    // BÁSICO
    {
      id: 'basic',
      titleKey: 'pricingBasicTitle',
      priceKey: 'pricingBasicPrice',
      priceSuffixKey: 'pricingPerMonth',
      featuresKeys: [
        'pricingFeat_ai_basic',       // 300/mes
        'pricingFeat_library_basic',  // Biblioteca hasta 20 docs
        'pricingFeat_export_basic',   // TXT + MP3 estándar
        'pricingFeat_audio_basic',    // 200 min/mes
        'pricingFeat_file_basic',     // 20 MB
        'pricingFeat_speed_basic',    // Velocidad normal
      ],
      buttonTextKey: 'pricingBasicButton',
      buttonAction: () => openCheckout('basic'),
      icon: <Gem className="h-8 w-8 text-blue-500 mb-4" />,
      borderColor: 'border-blue-500',
      buttonGradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
      glow: false,
    },
    // PREMIUM
    {
      id: 'premium',
      titleKey: 'pricingPremiumTitle',
      priceKey: 'pricingPremiumPrice',
      priceSuffixKey: 'pricingPerMonth',
      featuresKeys: [
        'pricingFeat_ai_premium',       // Uso alto (fair use)
        'pricingFeat_library_premium',  // Biblioteca ilimitada + favoritos + buscador
        'pricingFeat_export_premium',   // TXT + MP3 HQ
        'pricingFeat_audio_premium',    // 1000 min/mes
        'pricingFeat_file_premium',     // 100 MB
        'pricingFeat_speed_premium',    // Prioritaria
      ],
      buttonTextKey: 'pricingPremiumButton',
      buttonAction: () => openCheckout('premium'),
      icon: <Gem className="h-8 w-8 text-primary mb-4" />,
      borderColor: 'border-primary',
      buttonGradient: 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90',
      glow: true,
    }
  ];

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ duration: 0.4 }}
        className="min-h-[calc(100vh-4rem)] flex flex-col items-center bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 p-6 pt-12 md:pt-20"
      >
        <div className="absolute top-20 left-6 z-10">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('goBackHome', 'Volver al Inicio')}
          </Button>
        </div>

        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {t('pricingPageTitle', 'Elige Tu Plan Perfecto')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('pricingPageSubtitle', 'Desbloquea todo el potencial de Olondo AI con el plan que mejor se adapte a ti.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              variants={cardVariants}
              initial="initial"
              animate="in"
              className={`relative bg-white dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-2 ${plan.borderColor} flex flex-col ${plan.glow ? 'shadow-primary/30' : ''}`}
            >
              {plan.glow && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-50 transition duration-1000 animate-tilt"></div>
              )}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-3">{plan.icon}</div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  {t(plan.titleKey)}
                </h2>
                <p className="text-4xl font-extrabold text-center mb-6">
                  <span className={`${plan.id === 'premium' ? 'text-primary' : plan.id === 'basic' ? 'text-blue-600' : 'text-green-500'}`}>
                    {t(plan.priceKey)}
                  </span>
                  {plan.priceSuffixKey && (
                    <span className="text-base font-normal text-slate-500 dark:text-slate-400">
                      {t(plan.priceSuffixKey)}
                    </span>
                  )}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.featuresKeys.map((featureKey) => (
                    <li key={featureKey} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${plan.id === 'premium' ? 'text-primary' : plan.id === 'basic' ? 'text-blue-600' : 'text-green-500'}`} />
                      <span className="text-slate-600 dark:text-slate-300 text-sm">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={plan.buttonAction}
                  className={`w-full text-base mt-auto font-semibold ${plan.buttonGradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg py-3`}
                >
                  {t(plan.buttonTextKey)}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={handleAuthModalClose} />
    </>
  );
};

export default PricingPage;