import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme(); // light | dark

  return (
    <section
      className="relative w-full bg-no-repeat bg-cover bg-center
                 min-h-[60vh] md:min-h-[64vh] lg:min-h-[70vh] py-32 md:py-36"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      {/* Overlay SOLO en modo oscuro para integrar el fondo con el navbar/footer oscuros */}
      {theme === 'dark' && (
        <div className="pointer-events-none absolute inset-0">
          {/* capa ligera uniforme */}
          <div className="absolute inset-0 bg-black/10" />
          {/* refuerzo radial a la derecha para suavizar las ondas claras */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 70% at 90% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.06) 65%, rgba(0,0,0,0) 80%)'
            }}
          />
        </div>
      )}

      {/* Contenido alineado a la izquierda */}
      <div className="relative z-10 w-full">
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