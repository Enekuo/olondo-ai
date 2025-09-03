import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Punto azul para listas
const Dot = () => (
  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" />
);

const CreateSummaryPage = () => {
  const { t } = useLanguage();
  const speechText = t("create_summary_speech");

  return (
    <section className="w-full bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* SOLO TÍTULO (sin badge ni subtitle) */}
        <div className="mb-12 text-center">
          <h1 className="mt-3 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] font-extrabold text-slate-900 dark:text-white">
            {t("create_summary_title")}
          </h1>
        </div>

        {/* BLOQUE INICIAL: Mascota izquierda / Intro + Objetivo derecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Mascota con bocadillo (texto desde traducciones) */}
          <div className="relative flex justify-center md:justify-start order-first">
            <div className="relative">
              {/* Bocadillo justo encima de la cabeza */}
              {speechText && speechText !== "create_summary_speech" && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md px-4 py-2 rounded-2xl text-sm text-slate-800 dark:text-slate-200 relative">
                  {speechText}
                  {/* Triángulo apuntando hacia abajo */}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-slate-900"></div>
                </div>
              )}

              <img
                src="olondo-mascota2.png" // ajusta ruta/nombre si es distinto
                alt={t("create_summary_image_alt")}
                className="w-[320px] sm:w-[360px] md:w-[380px] h-auto select-none"
                draggable="false"
                loading="eager"
              />
            </div>
          </div>

          {/* Intro + Objetivo */}
          <div className="space-y-6">
            <p className="text-slate-700 dark:text-slate-300 text-[17px] leading-relaxed">
              {t("create_summary_intro")}
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t("create_summary_objective_title")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li>{t("create_summary_objective_point_1")}</li>
                <li>{t("create_summary_objective_point_2")}</li>
                <li>{t("create_summary_objective_point_3")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RESTO EN UNA COLUMNA */}
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("create_summary_steps_title")}
          </h2>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t("create_summary_steps_access")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("create_summary_steps_access_text")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t("create_summary_steps_input_title")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
              <li>{t("create_summary_steps_input_point_1")}</li>
              <li>{t("create_summary_steps_input_point_2")}</li>
              <li>{t("create_summary_steps_input_point_3")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t("create_summary_steps_generate_title")}
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              {t("create_summary_steps_generate_text")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {t("create_summary_steps_view_title")}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
              <li>{t("create_summary_steps_view_point_1")}</li>
              <li>{t("create_summary_steps_view_point_2")}</li>
              <li>{t("create_summary_steps_view_point_3")}</li>
            </ul>
          </div>
        </div>

        {/* Conversión a audio */}
        <div className="space-y-3 mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("create_summary_audio_title")}
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            {t("create_summary_audio_text")}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>{t("create_summary_audio_point_1")}</li>
            <li>{t("create_summary_audio_point_2")}</li>
            <li>{t("create_summary_audio_point_3")}</li>
          </ul>
        </div>

        {/* Gestión y guardado */}
        <div className="space-y-3 mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("create_summary_manage_title")}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>{t("create_summary_manage_point_1")}</li>
            <li>{t("create_summary_manage_point_2")}</li>
            <li>{t("create_summary_manage_point_3")}</li>
          </ul>
        </div>

        {/* Ejemplos de uso */}
        <div className="space-y-3 mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("create_summary_examples_title")}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
            <li>{t("create_summary_examples_point_1")}</li>
            <li>{t("create_summary_examples_point_2")}</li>
            <li>{t("create_summary_examples_point_3")}</li>
            <li>{t("create_summary_examples_point_4")}</li>
          </ul>
        </div>

        {/* Diferenciador */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t("create_summary_diff_title")}
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            {t("create_summary_diff_text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreateSummaryPage;