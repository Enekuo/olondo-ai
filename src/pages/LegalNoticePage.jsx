import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalNoticePage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('legal_notice_title')}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_intro_title')}</h2>
        <p>{t('legal_notice_intro_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_accept_title')}</h2>
        <p>{t('legal_notice_accept_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_responsible_title')}</h2>
        <p className="mb-2">{t('legal_notice_responsible_text')}</p>
        <ul className="list-disc ml-5">
          <li><strong>Nombre:</strong> {t('legal_notice_responsible_name')}</li>
          <li><strong>Dominio:</strong> {t('legal_notice_responsible_domain')}</li>
          <li><strong>Email:</strong> {t('legal_notice_responsible_email')}</li>
          <li><strong>Actividad:</strong> {t('legal_notice_responsible_activity')}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_laws_title')}</h2>
        <p>{t('legal_notice_laws_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_links_title')}</h2>
        <p>{t('legal_notice_links_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_liability_title')}</h2>
        <p>{t('legal_notice_liability_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_privacy_title')}</h2>
        <p>{t('legal_notice_privacy_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice_phishing_title')}</h2>
        <p>{t('legal_notice_phishing_text')}</p>
      </section>

      <p className="text-sm text-gray-500 mt-8">{t('legal_notice_update_note')}</p>
    </div>
  );
};

export default LegalNoticePage;