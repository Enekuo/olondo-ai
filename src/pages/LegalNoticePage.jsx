import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalNoticePage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{t('legal_notice_title')}</h1>
    </div>
  );
};

export default LegalNoticePage;