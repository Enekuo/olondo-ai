import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CreateSummaryPage = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Ilustración / Mascota (izquierda en desktop) */}
        <div className="flex justify-center md:justify-start">
          {/* Usa la imagen que ya tienes en /public/mascots */}
          <img
            src="/mascots/olondo-explain.png"
            alt={t("create_summary_image_alt")}
            className="w-full max-w-md h-auto select-none"
            loading="eager"
          />
        </div>

        {/* Contenido (derecha en desktop) */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("create_summary_title")}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("create_summary_intro")}
          </p>

          {/* Objetivo */}
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

          {/* Flujo paso a paso */}
          <div className="space-y-4">
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

          {/* Audio */}
          <div className="space-y-3">
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

          {/* Gestión */}
          <div className="space-y-3">
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
          <div className="space-y-3">
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
      </div>
    </section>
  );
};

export default CreateSummaryPage;