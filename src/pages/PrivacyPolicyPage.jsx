import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">{t('privacy_policy_title')}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_scope_title')}</h2>
        <p>{t('privacy_policy_scope_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_controller_title')}</h2>
        <p>{t('privacy_policy_controller_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_purpose_title')}</h2>
        <p>{t('privacy_policy_purpose_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_security_title')}</h2>
        <p>{t('privacy_policy_security_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_rights_title')}</h2>
        <p>{t('privacy_policy_rights_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_spam_title')}</h2>
        <p>{t('privacy_policy_spam_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_ads_title')}</h2>
        <p>{t('privacy_policy_ads_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_disclaimer_title')}</h2>
        <p>{t('privacy_policy_disclaimer_text')}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_modification_title')}</h2>
        <p>{t('privacy_policy_modification_text')}</p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;