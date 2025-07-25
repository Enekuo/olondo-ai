import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center pt-40 pb-40 px-6"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      <div className="container mx-auto max-w-4xl flex flex-col items-center text-center gap-8">
        <div className="bg-purple-100 dark:bg-purple-800 p-6 rounded-full">
          <Music className="text-purple-600 w-20 h-20" />
        </div>

        <h2 className="text-[36px] sm:text-[44px] md:text-[52px] leading-tight font-extrabold text-slate-900 dark:text-white">
          {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-slate-300 max-w-2xl">
          {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xl px-10 py-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Link to="/free-trial">🚀 {t('navFreeTrial', 'Probar Gratis')}</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-800/20 font-semibold text-xl px-10 py-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Link to="/pricing">✨ {t('ctaSeePlans', 'Ver Planes')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;