import React from "react"; 
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Dot = () => (
  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" />
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800">
    {children}
  </span>
);

const NumberBubble = ({ n }) => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white text-sm font-semibold shrink-0">
    {n}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm ${className}`}>
    {children}
  </div>
);

const CreateTextPage = () => {
  const { t } = useLanguage();

  return (
<section className="w-full bg-white dark:bg-slate-900">
  <div className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">

    {/* H1 */}
    <div className="mb-8 md:mb-10">
      <h1
        className="text-sky-700 font-extrabold leading-tight
                   text-[56px] sm:text-[72px] md:text-[88px]"
      >
        {t('create_text_breadcrumb')}
      </h1>
    </div>

    {/* HERO: Intro IZQ + Mascota DER */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
      {/* Intro */}
      <div>
        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mt-3 md:mt-5">
          {t('ct_long_intro_1')}
        </p>
        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mt-4">
          {t('ct_long_intro_2')}
        </p>
      </div>

      {/* Mascota con bocadillo */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute -top-6 -left-6 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-2 dark:bg-slate-800 dark:border-slate-600">
            <span className="text-slate-800 dark:text-slate-200 text-base font-normal">
              {t('ct_bubble_text')}
            </span>
            <div className="absolute -bottom-2 left-8 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45 dark:bg-slate-800 dark:border-slate-600"></div>
          </div>

          <img
            src="/olondo-mascota2.png"
            alt={t('ct_mascot_alt')}
            className="w-[420px] max-w-full h-auto select-none dark:brightness-95"
            draggable="false"
          />
        </div>
      </div>
    </div>

    {/* === OBJETIVO CENTRAL === */}
    <Card className="p-6 md:p-8 mb-12 bg-slate-50 dark:bg-slate-800/60">
      <h2 className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl mb-5">
        🎯 {t('ct_obj_title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              {t('ct_obj_1')}
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              {t('ct_obj_2')}
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              {t('ct_obj_3')}
            </p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" />
            <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
              {t('ct_obj_4')}
            </p>
          </div>
        </Card>
      </div>
    </Card>

    {/* === FLUJO PASO A PASO === */}
    <div className="mb-12 space-y-6">
      <h2 className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl">
        ⚡ {t('ct_flow_title')}
      </h2>

      {/* Paso 1 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={1} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`1. ${t('ct_flow_1_title')}`}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t('ct_flow_1_p')}
            </p>
          </div>
        </div>
      </Card>

      {/* Paso 2 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={2} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`2. ${t('ct_flow_2_title')}`}
            </h3>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              <li>{t('ct_flow_2_b1')}</li>
              <li>{t('ct_flow_2_b2')}</li>
              <li>{t('ct_flow_2_b3')}</li>
              <li>{t('ct_flow_2_b4')}</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Paso 3 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={3} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`3. ${t('ct_flow_3_title')}`}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-3">{t('ct_flow_3_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              <li>{t('ct_flow_3_s1')}</li>
              <li>{t('ct_flow_3_s2')}</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-3">{t('ct_flow_3_examples_label')}</p>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              <li>{t('ct_flow_3_ex1')}</li>
              <li>{t('ct_flow_3_ex2')}</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Paso 4 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={4} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`4. ${t('ct_flow_4_title')}`}
            </h3>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 mb-4">
              <li>{t('ct_flow_4_b1')}</li>
              <li>{t('ct_flow_4_b2')}</li>
              <li>{t('ct_flow_4_b3')}</li>
              <li>{t('ct_flow_4_b4')}</li>
            </ul>
            {/* Chips visuales (mismos textos, solo presentación) */}
            <div className="flex flex-wrap gap-2">
              <Badge>{t('ct_flow_4_b1')}</Badge>
              <Badge>{t('ct_flow_4_b2')}</Badge>
              <Badge>{t('ct_flow_4_b3')}</Badge>
              <Badge>{t('ct_flow_4_b4')}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Paso 5 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={5} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`5. ${t('ct_flow_5_title')}`}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">{t('ct_flow_5_p1')}</p>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 mt-2">
              <li>{t('ct_flow_5_b1')}</li>
              <li>{t('ct_flow_5_b2')}</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-2">{t('ct_flow_5_p2')}</p>
          </div>
        </div>
      </Card>

      {/* Paso 6 */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <NumberBubble n={6} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`6. ${t('ct_flow_6_title')}`}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">{t('ct_flow_6_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 mt-2">
              <li>{t('ct_flow_6_b1')}</li>
              <li>{t('ct_flow_6_b2')}</li>
              <li>{t('ct_flow_6_b3')}</li>
              <li>{t('ct_flow_6_b4')}</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Paso 7 */}
      <Card className="p-6 bg-slate-50 dark:bg-slate-800/60">
        <div className="flex items-start gap-4">
          <NumberBubble n={7} />
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold text-xl mb-2">
              {`7. ${t('ct_flow_7_title')}`}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">{t('ct_flow_7_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 mt-2">
              <li>{t('ct_flow_7_b1')}</li>
              <li>{t('ct_flow_7_b2')}</li>
              <li>{t('ct_flow_7_b3')}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>

    {/* === GESTIÓN Y GUARDADO === */}
    <div className="mb-12">
      <h2 className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl mb-5">
        🗂️ {t('ct_mgmt_title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-5">
          <p className="text-slate-700 dark:text-slate-300">{t('ct_mgmt_b1')}</p>
        </Card>
        <Card className="p-5">
          <p className="text-slate-700 dark:text-slate-300">{t('ct_mgmt_b2')}</p>
        </Card>
        <Card className="p-5">
          <p className="text-slate-700 dark:text-slate-300">{t('ct_mgmt_b3')}</p>
        </Card>
      </div>
    </div>

    {/* === CASOS DE USO === */}
    <div className="mb-12">
      <h2 className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl mb-5">
        🌍 {t('ct_cases_title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-5"><p className="text-slate-700 dark:text-slate-300">{t('ct_cases_b1')}</p></Card>
        <Card className="p-5"><p className="text-slate-700 dark:text-slate-300">{t('ct_cases_b2')}</p></Card>
        <Card className="p-5"><p className="text-slate-700 dark:text-slate-300">{t('ct_cases_b3')}</p></Card>
        <Card className="p-5"><p className="text-slate-700 dark:text-slate-300">{t('ct_cases_b4')}</p></Card>
      </div>
    </div>

    {/* === VALOR DIFERENCIAL === */}
    <div className="space-y-3">
      <h2 className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl">
        🚀 {t('ct_value_title')}
      </h2>
      <Card className="p-6 md:p-8 bg-[#EEF5FF] dark:bg-slate-800/50 border-none">
        <p className="text-slate-800 dark:text-slate-200">{t('ct_value_p1')}</p>
        <p className="text-slate-800 dark:text-slate-200 mt-3">{t('ct_value_p2')}</p>
      </Card>
    </div>

  </div>
</section>
);
};

export default CreateTextPage;