import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/components/layout/ThemeProvider';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme(); // 'light' | 'dark'

  return (
    <section
      className="relative w-full bg-no-repeat bg-cover bg-center
                 min-h-[60vh] md:min-h-[64vh] lg:min-h-[70vh] py-32 md:py-36"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      {/* Overlay estilo “deep navy” SOLO en modo oscuro (como tu ejemplo) */}
      {theme === 'dark' && (
        <div className="pointer-events-none absolute inset-0">
          {/* capa base oscura */}
          <div className="absolute inset-0 bg-[#0f1424]/70 mix-blend-multiply" />
          {/* viñeteado radial suave desde el centro-derecha */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 85% 50%, rgba(9,12,24,0.6) 0%, rgba(9,12,24,0.35) 45%, rgba(9,12,24,0.18) 65%, rgba(9,12,24,0) 80%)'
            }}
          />
          {/* brillo muy sutil en bordes para sensación “pulida” */}
          <div className="absolute inset-0 ring-1 ring-white/5 rounded-[2rem] pointer-events-none" />
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
              className="text-white font-semibold text-2xl px-14 py-6 rounded-2xl
                         shadow-lg hover:shadow-xl transition-all duration-300
                         bg-gradient-to-r from-sky-400 to-violet-500
                         hover:from-sky-500 hover:to-violet-600"
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
