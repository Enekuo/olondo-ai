import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsConditionsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Título centrado */}
      <h1 className="text-3xl font-bold mb-8 text-center">{t('terms_title')}</h1>

      {/* Contenido de Términos y Condiciones */}
      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_object_title')}</h2>
          <p>{t('terms_object_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_responsible_title')}</h2>
          <p>{t('terms_responsible_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_services_title')}</h2>
          <p>{t('terms_services_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_register_title')}</h2>
          <p>{t('terms_register_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_payment_title')}</h2>
          <p>{t('terms_payment_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_use_title')}</h2>
          <p>{t('terms_use_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_ip_title')}</h2>
          <p>{t('terms_ip_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_responsibility_title')}</h2>
          <p>{t('terms_responsibility_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_cancellation_title')}</h2>
          <p>{t('terms_cancellation_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_modifications_title')}</h2>
          <p>{t('terms_modifications_text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">{t('terms_jurisdiction_title')}</h2>
          <p>{t('terms_jurisdiction_text')}</p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditionsPage;