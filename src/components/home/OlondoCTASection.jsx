import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-blue-100 dark:bg-sky-900 py-24 px-4">
      <div className="container mx-auto max-w-2xl flex flex-col items-start text-left gap-6">
        <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
          <Music className="text-purple-600 w-12 h-12" />
        </div>

        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] leading-tight font-extrabold text-slate-900 dark:text-white">
          {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
        </h2>

        <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
          {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-base px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Link to="/free-trial">🚀 {t('navFreeTrial', 'Probar Gratis')}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-800/20 font-semibold text-base px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link to="/pricing">✨ {t('ctaSeePlans', 'Ver Planes')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;