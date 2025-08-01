import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookiesPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('cookies_title')}</h1>
    </div>
  );
};

export default CookiesPolicyPage;