import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsConditionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('terms_title')}</h1>
    </div>
  );
};

export default TermsConditionsPage;