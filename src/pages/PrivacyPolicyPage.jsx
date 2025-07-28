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
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_responsible_title')}</h2>
        <p>{t('privacy_policy_responsible_text')}</p>
        <p className="mt-2 font-medium">📌 {t('privacy_policy_responsible_name')}</p>
        <p>🌐 {t('privacy_policy_responsible_domain')}</p>
        <p>✉️ {t('privacy_policy_responsible_email')}</p>
        <p>💼 {t('privacy_policy_responsible_activity')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_purposes_title')}</h2>
        <p>{t('privacy_policy_purposes_text')}</p>
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
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_user_rights_title')}</h2>
        <p>{t('privacy_policy_user_rights_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_no_spam_title')}</h2>
        <p>{t('privacy_policy_no_spam_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_ads_title')}</h2>
        <p>{t('privacy_policy_ads_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_comments_title')}</h2>
        <p>{t('privacy_policy_comments_text')}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('privacy_policy_changes_title')}</h2>
        <p>{t('privacy_policy_changes_text')}</p>
        <p className="mt-4 text-sm text-gray-500">{t('privacy_policy_update_note')}</p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;