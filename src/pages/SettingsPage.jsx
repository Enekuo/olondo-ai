import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SettingsPage = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t("dashboard_nav_settings")}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            {t("dashboard_nav_settings")} — página en construcción.
          </p>
        </header>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-slate-500 dark:text-slate-400">
            Aquí aparecerán las opciones de configuración.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;