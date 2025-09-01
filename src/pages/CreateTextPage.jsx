import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Dot = () => (
  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" />
);

const CreateTextPage = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Encabezado */}
        <div className="mb-12">
          <span className="uppercase tracking-wide text-xs font-semibold text-sky-600 dark:text-sky-400">
            {t("create_text_badge")}
          </span>
          <h1 className="mt-3 text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] font-extrabold text-slate-900 dark:text-white">
            {t("create_text_title")}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl">
            {t("create_text_subtitle")}
          </p>
        </div>

        {/* Cuerpo: Mascota + Explicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mascota (izquierda) */}
          <div className="relative flex justify-center md:justify-start">
            <div className="relative">
              <img
                src="olondo-mascota2.png"
                alt={t("create_text_badge")}
                className="w-[320px] sm:w-[360px] md:w-[380px] h-auto select-none"
                draggable="false"
              />
              {/* Bocadillo */}
              <div className="hidden sm:block absolute -right-6 top-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 shadow-sm">
                  {t("create_text_speech")}
                </div>
              </div>
            </div>
          </div>

          {/* Explicación (derecha) */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {t("create_text_how_title")}
            </h3>

            <ul className="space-y-5 text-[17px] leading-relaxed text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3"><Dot /><span>{t("create_text_step1")}</span></li>
              <li className="flex items-start gap-3"><Dot /><span>{t("create_text_step2")}</span></li>
              <li className="flex items-start gap-3"><Dot /><span>{t("create_text_step3")}</span></li>
              <li className="flex items-start gap-3"><Dot /><span>{t("create_text_step4")}</span></li>
            </ul>

            {/* Ejemplo */}
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t("create_example_header")}
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {t("demo_badge")}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5">
                <p className="text-slate-900 dark:text-white font-semibold mb-2">
                  {t("create_text_example_title")}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                  <li>{t("create_text_example_bullet1")}</li>
                  <li>{t("create_text_example_bullet2")}</li>
                  <li>{t("create_text_example_bullet3")}</li>
                </ul>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                {t("create_example_footer")}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/pricing">
                <Button className="h-12 px-6 text-base font-semibold rounded-xl">
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t("cta_view_plans")}
                </Button>
              </Link>
              <Link to="/pricing" className="text-sky-600 dark:text-sky-400 font-semibold">
                {t("cta_or_view_plans")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTextPage;