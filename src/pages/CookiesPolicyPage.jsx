import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiesPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">{t('cookies_title')}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('cookies_intro_title')}</h2>
        <p>{t('cookies_intro_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('cookies_types_title')}</h2>
        <p>{t('cookies_types_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('cookies_purpose_title')}</h2>
        <p>{t('cookies_purpose_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('cookies_manage_title')}</h2>
        <p>{t('cookies_manage_text')}</p>
      </section>

      <section className="mb-2">
        <h2 className="text-xl font-semibold mb-2">{t('cookies_update_title')}</h2>
        <p>{t('cookies_update_text')}</p>
      </section>

      <p className="text-sm italic mt-6">{t('cookies_update_note')}</p>
    </div>
  );
};

export default CookiesPolicyPage;