import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SyntheticVoiceUsagePage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Título centrado */}
      <h1 className="text-3xl font-bold mb-8 text-center">{t('voice_title')}</h1>

      {/* Contenido */}
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_nature_title')}</h2>
          <p>{t('voice_nature_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_purpose_title')}</h2>
          <p>{t('voice_purpose_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_limitations_title')}</h2>
          <p>{t('voice_limitations_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_responsibility_title')}</h2>
          <p>{t('voice_responsibility_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_rights_title')}</h2>
          <p>{t('voice_rights_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('voice_modifications_title')}</h2>
          <p>{t('voice_modifications_text')}</p>
        </section>
      </div>
    </div>
  );
};

export default SyntheticVoiceUsagePage;