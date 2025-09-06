import React from "react";
import { Link } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER INTERNO (oscuro) */}
      <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800">
        <div className="w-full h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo en azul en el header */}
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          {/* Controles a la derecha */}
          <div className="flex items-center gap-3">
            {/* Selector de idioma con fondo oscuro (no blanco) */}
            <div className="rounded-xl bg-slate-800 ring-1 ring-slate-700 p-1">
              {/* si LanguageSwitcher acepta className, también lo pasamos */}
              <LanguageSwitcher className="!bg-transparent !text-white" />
            </div>

            {/* Toggle claro/oscuro */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <div className="w-full px-0">
        <div className="grid grid-cols-12 gap-0">
          {/* SIDEBAR (sin logo arriba) */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-200 dark:border-slate-800">
            <div className="sticky top-16 h-[calc(100vh-64px)] bg-slate-900 text-slate-100 px-5 py-6">
              <nav className="space-y-1">
                <Link
                  to="/app/dashboard"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>{t("dashboard_nav_home")}</span>
                </Link>

                <Link
                  to="/create"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>{t("dashboard_nav_create")}</span>
                </Link>

                <Link
                  to="/library"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Folder className="w-5 h-5" />
                  <span>{t("dashboard_nav_library")}</span>
                </Link>

                <Link
                  to="/pricing"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t("dashboard_nav_plans")}</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>{t("dashboard_nav_settings")}</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL (vacío) */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            <section className="py-8 md:py-10">
              {/* vacío intencional */}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;