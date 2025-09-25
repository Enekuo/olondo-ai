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
      priceSuffixKey: null,
      perDayKey: null,
      featuresKeys: [
        // Reordenado: Biblioteca, Exportación, Audio, IA, Archivos, Velocidad
        'pricingFeat_library_free',
        'pricingFeat_export_free',
        'pricingFeat_audio_free',
        'pricingFeat_ai_free',
        'pricingFeat_file_free',
        'pricingFeat_speed_free',
      ],
      buttonTextKey: 'pricingFreeButton',
      buttonAction: () => navigate('/free-trial'),
      icon: <Sparkles className="h-8 w-8 text-green-500 mb-4" />,
      borderColor: 'border-green-500',
      buttonGradient: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      glow: false,
      badgeKey: null,
      priceColorClass: 'text-green-500',
      checkColorClass: 'text-green-500',
    },
    // BÁSICO (Más popular)
    {
      id: 'basic',
      titleKey: 'pricingBasicTitle',
      priceKey: 'pricingBasicPrice',
      priceSuffixKey: 'pricingPerMonth',
      perDayKey: 'pricingBasicPerDay', // ≈ 0,17 €/día
      featuresKeys: [
        'pricingFeat_library_basic',
        'pricingFeat_export_basic',
        'pricingFeat_audio_basic',
        'pricingFeat_ai_basic',
        'pricingFeat_file_basic',
        'pricingFeat_speed_basic',
      ],
      buttonTextKey: 'pricingBasicButton',
      buttonAction: () => openCheckout('basic'),
      icon: <Gem className="h-8 w-8 text-blue-500 mb-4" />,
      borderColor: 'border-blue-500',
      buttonGradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
      glow: false,
      badgeKey: 'pricingBadgeMostPopular',
      priceColorClass: 'text-blue-600',
      checkColorClass: 'text-blue-600',
    },
    // PREMIUM
    {
      id: 'premium',
      titleKey: 'pricingPremiumTitle',
      priceKey: 'pricingPremiumPrice',
      priceSuffixKey: 'pricingPerMonth',
      perDayKey: 'pricingPremiumPerDay', // ≈ 0,33 €/día
      featuresKeys: [
        'pricingFeat_library_premium',
        'pricingFeat_export_premium',
        'pricingFeat_audio_premium',
        'pricingFeat_ai_premium',
        'pricingFeat_file_premium',
        'pricingFeat_speed_premium',
      ],
      buttonTextKey: 'pricingPremiumButton',
      buttonAction: () => openCheckout('premium'),
      icon: <Gem className="h-8 w-8 text-primary mb-4" />,
      borderColor: 'border-primary',
      buttonGradient: 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90',
      glow: true,
      badgeKey: null,
      priceColorClass: 'text-primary',
      checkColorClass: 'text-primary',
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
        className="min-h-[calc(100vh-4rem)] flex flex-col items-center bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 p-6 pt-12 md:pt-20 relative"
      >
        {/* Botón temporal hacia el Dashboard (se eliminará cuando el dashboard esté listo) */}
        <button
          onClick={() => navigate('/dashboard')} 
          className="absolute right-6 top-20 z-30 px-4 py-2 bg-sky-600 text-white rounded-lg"
        >
          Ir al Dashboard
        </button>

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
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
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
              className={`group relative bg-white dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-2 ${plan.borderColor} flex flex-col transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] ${plan.glow ? 'shadow-primary/30' : ''}`}
            >
              {plan.glow && (
                <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
              )}

              {/* Badge "Más popular" */}
              {plan.badgeKey && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {t(plan.badgeKey)}
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-3">{plan.icon}</div>

                <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-2">
                  {t(plan.titleKey)}
                </h2>

                <div className="text-center mb-6">
                  <p className="text-4xl font-extrabold">
                    <span className={plan.priceColorClass}>{t(plan.priceKey)}</span>
                    {plan.priceSuffixKey && (
                      <span className="text-base font-normal text-slate-500 dark:text-slate-400"> {t(plan.priceSuffixKey)}</span>
                    )}
                  </p>
                  {plan.perDayKey && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t(plan.perDayKey)}
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.featuresKeys.map((featureKey) => (
                    <li key={featureKey} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${plan.checkColorClass}`} />
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