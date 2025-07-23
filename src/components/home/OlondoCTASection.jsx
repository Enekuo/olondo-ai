import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-blue-100 dark:bg-sky-900 py-20 md:py-28 lg:py-32 px-4">
      <div className="container mx-auto max-w-4xl flex flex-col items-start gap-8 text-left">
        <Music size={48} className="text-purple-500" />

        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-slate-300 mb-8 max-w-2xl">
            {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
            >
              <Link to="/free-trial">🚀 {t('navFreeTrial', 'Probar Gratis')}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-semibold border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-700/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 rounded-lg px-10 py-6"
            >
              <Link to="/pricing">✨ {t('ctaSeePlans', 'Ver Planes')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;