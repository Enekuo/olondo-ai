import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '4rem' }}>
      <h1>{t('privacy_policy_title') || 'FALLO DE TRADUCCIÓN'}</h1>
      <p>Esto es una prueba básica. Si ves esto, la página funciona.</p>
    </div>
  );
};

export default PrivacyPolicyPage;