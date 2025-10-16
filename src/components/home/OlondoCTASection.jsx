import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center py-28 px-8"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      {/* Contenido principal alineado a la izquierda */}
      <div className="max-w-5xl mx-auto flex flex-col items-start text-left">
        <h2 className="text-white font-extrabold leading-tight text-[44px] sm:text-[52px] md:text-[60px] mb-4">
          {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
        </h2>

        <p className="text-white/90 text-xl sm:text-2xl mb-10">
          {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
        </p>

        <div>
          <Button
            asChild
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold text-2xl px-14 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/free-trial">🚀 {t('navFreeTrial', 'Prueba Gratis')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;

