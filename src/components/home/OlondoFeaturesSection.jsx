import React from 'react'; 
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Headphones, FileText, Mic, Lock, Settings2, Brain } from 'lucide-react';

const OlondoFeaturesSection = () => {
  const { t } = useLanguage();

  const mainFeatures = [
    { titleKey: 'feature_listen_title', descriptionKey: 'feature_listen_desc', icon: Headphones },
    { titleKey: 'feature_generation_title', descriptionKey: 'feature_generation_desc', icon: FileText },
    { titleKey: 'feature_voice_title', descriptionKey: 'feature_voice_desc', icon: Mic },
    { titleKey: 'feature_own_voice_title', descriptionKey: 'feature_own_voice_desc', icon: Mic },
    { titleKey: 'feature_privacy_title', descriptionKey: 'feature_privacy_desc', icon: Lock },
    { titleKey: 'feature_length_title', descriptionKey: 'feature_length_desc', icon: Settings2 },
  ];

  const explanatoryFeatures = [
    { icon: Settings2, titleKey: 'explanatory_feature_length_title', descriptionKey: 'explanatory_feature_length_desc' },
    { icon: Headphones, titleKey: 'explanatory_feature_listen_title', descriptionKey: 'explanatory_feature_listen_desc' },
    { icon: Lock, titleKey: 'explanatory_feature_security_title', descriptionKey: 'explanatory_feature_security_desc' },
  ];

  const whyOlondoPoints = [
    { titleKey: 'why_different_audio_title', descriptionKey: 'why_different_audio_desc' },
    { titleKey: 'why_different_fast_title', descriptionKey: 'why_different_fast_desc' },
    { titleKey: 'why_different_clean_title', descriptionKey: 'why_different_clean_desc' },
    { titleKey: 'why_different_free_title', descriptionKey: 'why_different_free_desc' },
    { titleKey: 'why_different_premium_title', descriptionKey: 'why_different_premium_desc' },
  ];

  const whatOlondoOffersPoints = [
    'what_it_offers_1',
    'what_it_offers_2',
    'what_it_offers_3',
    'what_it_offers_4',
    'what_it_offers_5',
    'what_it_offers_6',
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* 🔄 Bloque desplazado 2cm a la izquierda */}
        <div className="md:-translate-x-[2cm]">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
    {t('features_main_title')}
  </h2>
  <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
    {t('features_intro')}
  </p>
</div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-16 md:mb-24">
          <motion.div
            className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ul className="space-y-4">
              {mainFeatures.map((feature, index) => (
                <li key={index} className="flex items-start p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  <feature.icon className="h-6 w-6 mr-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{t(feature.titleKey)}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{t(feature.descriptionKey)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {explanatoryFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-1">{t(feature.titleKey)}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{t(feature.descriptionKey)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {t('why_different_title')}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left">
            {whyOlondoPoints.map((point, index) => (
              <li key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                 <div className="flex items-center mb-1">
                    <Check className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">{t(point.titleKey)}</h4>
                 </div>
                 <p className="ml-8 text-sm text-slate-600 dark:text-slate-400">{t(point.descriptionKey)}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="order-2 md:order-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t('how_it_works_title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t('how_it_works_desc')}
            </p>
            <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-primary" />
                    {t('features_main_title')}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {t('how_it_works_sub_desc', '', {
                      sub_title: t('how_it_works_sub_title')
                    })}
                </p>
                 <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                    {t('what_it_offers_title')}
                </h4>
                 <ul className="space-y-2 mb-4">
                    {whatOlondoOffersPoints.map((key, index) => (
                        <li key={index} className="flex items-start text-sm">
                            <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-600 dark:text-slate-300">{t(key)}</span>
                        </li>
                    ))}
                </ul>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                   {t('listen_everything_title')}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                   {t('listen_everything_desc')}
                </p>
            </div>

          </div>
          <div className="order-1 md:order-2 flex justify-center items-center">
            <img  class="rounded-lg shadow-md max-w-sm w-full h-auto aspect-square object-cover" alt="Ilustración abstracta del funcionamiento de la IA" src="/brain-mic.png" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OlondoFeaturesSection;
