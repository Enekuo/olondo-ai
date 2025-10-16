import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center pt-40 pb-40 px-6"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      <div className="container mx-auto max-w-4xl flex flex-col items-start text-left gap-6">
        <h2 className="text-white font-extrabold leading-tight text-[36px] sm:text-[44px] md:text-[52px]">
          {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
        </h2>

        <p className="text-white/90 text-lg sm:text-xl md:text-2xl max-w-2xl">
          {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
        </p>

        <div className="pt-2">
          <Button
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-2xl px-14 py-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Link to="/free-trial">🚀 {t('navFreeTrial', 'Prueba Gratis')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;
