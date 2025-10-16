import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const OlondoCTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center py-24 px-6"
      style={{ backgroundImage: "url('/cta-background.png')" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Card estilo Dribbble */}
        <div className="relative overflow-hidden rounded-[28px] shadow-2xl ring-1 ring-white/10
                        bg-white/5 backdrop-blur-sm px-8 sm:px-12 md:px-16 py-14 md:py-18">
          {/* ondas decorativas a la derecha (sin cambiar tu fondo) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-[-20%] w-[60%] opacity-40"
            style={{
              background:
                'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 70%)'
            }}
          />

          {/* Contenido alineado a la izquierda */}
          <div className="relative max-w-3xl">
            <h2 className="text-white font-extrabold leading-tight
                           text-[34px] sm:text-[42px] md:text-[50px]">
              {t('ctaTitle', 'Empieza ahora a crear y escuchar tu contenido con IA')}
            </h2>

            <p className="mt-4 text-white/90 text-lg sm:text-xl md:text-2xl">
              {t('ctaSubtitle', 'No necesitas cuenta. Gratis, rápido y sin complicaciones.')}
            </p>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold
                           text-xl sm:text-2xl px-10 sm:px-14 py-6 rounded-2xl
                           shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link to="/free-trial">🚀 {t('navFreeTrial', 'Prueba Gratis')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OlondoCTASection;
