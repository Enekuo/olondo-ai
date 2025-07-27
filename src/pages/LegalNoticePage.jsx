import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalNoticePage = () => {
  const { t } = useLanguage();
  const info = t('legal_notice.responsible_info');

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">{t('legal_notice_title')}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.intro_title')}</h2>
        <p>{t('legal_notice.intro_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.accept_title')}</h2>
        <p>{t('legal_notice.accept_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.responsible_title')}</h2>
        <p className="mb-2">{t('legal_notice.responsible_text')}</p>
        <ul className="list-disc ml-5">
          <li><strong>Nombre:</strong> {info.name}</li>
          <li><strong>Dominio:</strong> {info.domain}</li>
          <li><strong>Email:</strong> {info.email}</li>
          <li><strong>Actividad:</strong> {info.activity}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.laws_title')}</h2>
        <p>{t('legal_notice.laws_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.links_title')}</h2>
        <p>{t('legal_notice.links_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.liability_title')}</h2>
        <p>{t('legal_notice.liability_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.privacy_title')}</h2>
        <p>{t('legal_notice.privacy_text')}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('legal_notice.phishing_title')}</h2>
        <p>{t('legal_notice.phishing_text')}</p>
      </section>

      <p className="text-sm text-gray-500 mt-8">{t('legal_notice.update_note')}</p>
    </div>
  );
};

export default LegalNoticePage;