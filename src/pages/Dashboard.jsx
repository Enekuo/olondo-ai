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
          {/* Logo a la izquierda */}
          <Link to="/" className="text-white font-extrabold text-lg">
            Olondo.ai
          </Link>

          {/* Controles a la derecha */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Quitamos el max-width y el centrado para pegar el sidebar al borde izquierdo */}
      <div className="w-full px-0">
        <div className="grid grid-cols-12 gap-0">
          {/* SIDEBAR: rail fijo a la izquierda */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-200 dark:border-slate-800">
            <div className="sticky top-16 h-[calc(100vh-64px)] bg-slate-900 text-slate-100 px-5 py-6">
              <div className="text-3xl font-extrabold text-sky-400 mb-6">Olondo.ai</div>

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