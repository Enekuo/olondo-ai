import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center py-32"
      style={{ backgroundImage: "url('/cta-background.png')" }} // FONDO SIN CAMBIOS
    >
      {/* Bloque desplazado a la IZQUIERDA (sin contenedor centrado) */}
      <div className="w-full">
        <div
          className="
            flex flex-col items-start text-left gap-6
            pl-4 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-28
            max-w-[980px]
          "
        >
          <h2 className="text-white font-extrabold leading-tight
                         text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px]">
            {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
          </h2>

          <p className="text-white/90 text-xl sm:text-2xl md:text-[26px]">
            {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
          </p>

          <div className="pt-2">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold
                         text-2xl px-14 py-6 rounded-2xl shadow-md hover:shadow-xl
                         transition-all duration-300"
            >
              <Link to="/free-trial">🚀 {t('navFreeTrial', 'Prueba Gratis')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;

