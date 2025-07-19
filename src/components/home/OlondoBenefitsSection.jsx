import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Headphones, Sparkles, Brain, Clock, Globe, LogOut } from 'lucide-react';

const benefits = [
  {
    icon: Headphones,
    titleKey: 'benefit_listen_title',
    descKey: 'benefit_listen_desc',
  },
  {
    icon: Sparkles,
    titleKey: 'benefit_creativity_title',
    descKey: 'benefit_creativity_desc',
  },
  {
    icon: Brain,
    titleKey: 'benefit_memory_title',
    descKey: 'benefit_memory_desc',
  },
  {
    icon: Clock,
    titleKey: 'benefit_fast_title',
    descKey: 'benefit_fast_desc',
  },
  {
    icon: Globe,
    titleKey: 'benefit_languages_title',
    descKey: 'benefit_languages_desc',
  },
  {
    icon: LogOut,
    titleKey: 'benefit_noreg_title',
    descKey: 'benefit_noreg_desc',
  },
];

const OlondoBenefitsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
          {t('benefits_section_title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-100 dark:bg-slate-700 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-start mb-4">
                <benefit.icon className="h-6 w-6 text-blue-600 dark:text-white mr-3" />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {t(benefit.titleKey)}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm pl-9">
                {t(benefit.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OlondoBenefitsSection;