import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t('privacy_policy_title')}
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_scope_title')}</h2>
        <p>{t('privacy_policy_scope_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_responsible_title')}</h2>
        <p>{t('privacy_policy_responsible_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_purpose_title')}</h2>
        <p>{t('privacy_policy_purpose_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_about_title')}</h2>
        <p>{t('privacy_policy_about_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_confidentiality_title')}</h2>
        <p>{t('privacy_policy_confidentiality_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_rights_title')}</h2>
        <p>{t('privacy_policy_rights_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_data_rights_title')}</h2>
        <p>{t('privacy_policy_data_rights_text')}</p>
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

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_modification_title')}</h2>
        <p>{t('privacy_policy_modification_text')}</p>
      </section>

      <p className="text-sm text-gray-500 mt-8">{t('privacy_policy_update_note')}</p>
    </div>
  );
};

export default PrivacyPolicyPage;