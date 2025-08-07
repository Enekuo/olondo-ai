import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles, FileText, BookOpen } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleFreeTrial = () => {
    navigate('/pricing');
  };

  const handleCreateText = () => {
    navigate('/pricing');
  };

  const handleCreateSummary = () => {
    navigate('/pricing');
  };

  return (
    <section className="bg-gradient-to-b from-[#f2f9ff] to-[#e6f0fa] py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        <div className="text-center md:text-left md:max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            {t('hero_title_line1')} <br className="hidden md:block" />
            {t('hero_title_line2')}
          </h1>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6">
            {t('hero_title_brand')}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            {t('hero_description')}
          </p>
          <p className="italic text-sm text-gray-600 mb-8">
            {t('hero_secondary_description')}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Button
              onClick={handleFreeTrial}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg shadow-md"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {t('cta_free_trial')}
            </Button>
            <Button
              onClick={handleCreateText}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md"
            >
              <FileText className="mr-2 h-5 w-5" />
              {t('cta_create_text')}
            </Button>
            <Button
              onClick={handleCreateSummary}
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg text-lg shadow-sm"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {t('cta_create_summary')}
            </Button>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          {/* Aquí podrías colocar una imagen ilustrativa o animación en el futuro */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;