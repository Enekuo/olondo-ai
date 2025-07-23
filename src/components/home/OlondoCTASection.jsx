import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-blue-100 dark:bg-sky-900 py-24 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10 text-left">
        {/* Icono musical a la izquierda, grande */}
        <div className="flex-shrink-0">
          <div className="bg-purple-100 dark:bg-purple-800 p-6 rounded-full">
            <Music className="text-purple-600 w-20 h-20" />
          </div>
        </div>

        {/* Texto y botones */}
        <div className="flex flex-col items-start gap-6 max-w-2xl">
          <h2 className="text-[32px] sm:text-[36px] md:text-[44px] leading-tight font-extrabold text-slate-900 dark:text-white">
            {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-slate-300 leading-relaxed">
            {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link to="/free-trial">🚀 {t('navFreeTrial', 'Probar Gratis')}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:border-sky-400 dark:text-sky-300 dark:hover:text-sky-200 dark:hover:bg-sky-800/20 font-semibold text-lg px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
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