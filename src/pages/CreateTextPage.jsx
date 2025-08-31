import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const CreateTextPage = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Encabezado */}
        <div className="mb-10">
          <span className="uppercase tracking-wide text-xs font-semibold text-sky-600 dark:text-sky-400">
            {t('create_text_badge')}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white">
            {t('create_text_title')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            {t('create_text_subtitle')}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Lista de pasos */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('create_text_how_title')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('create_text_step1')}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('create_text_step2')}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('create_text_step3')}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></div>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('create_text_step4')}
                </p>
              </li>
            </ul>

            <div className="pt-2">
              <Link to="/pricing">
                <Button className="h-12 px-6 text-base font-semibold rounded-xl">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('cta_view_plans')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Ejemplo visual */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {t('create_example_header')}
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                {t('demo_badge')}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5">
              <p className="text-slate-900 dark:text-white font-semibold mb-2">
                {t('create_text_example_title')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li>{t('create_text_example_bullet1')}</li>
                <li>{t('create_text_example_bullet2')}</li>
                <li>{t('create_text_example_bullet3')}</li>
              </ul>
            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              {t('create_example_footer')}
            </div>
          </div>
        </div>

        {/* CTA inferior */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/pricing">
              <Button className="h-12 px-6 text-base font-semibold rounded-xl">
                {t('cta_try_free')}
              </Button>
            </Link>
            <Link to="/pricing" className="text-sky-600 dark:text-sky-400 font-semibold">
              {t('cta_or_view_plans')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTextPage;