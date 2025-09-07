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

  // Color exacto del header + sidebar
  const NAVY = "#111a2b";

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER INTERNO */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-800"
        style={{ backgroundColor: NAVY }}
      >
        <div className="w-full h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo en azul en el header */}
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          {/* Controles a la derecha */}
          <div className="flex items-center gap-3">
            {/* Selector de idioma SIN zona blanca */}
            <div
              className="rounded-xl p-1 ring-1"
              style={{ backgroundColor: NAVY, ringColor: "rgba(148,163,184,0.20)" }}
            >
              <LanguageSwitcher className="!bg-transparent !text-white !border-0 !shadow-none !ring-0 !p-0 !m-0" />
            </div>

            {/* Toggle claro/oscuro */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:opacity-90 text-white transition-colors"
              style={{ backgroundColor: "#1f2937" }}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 text-white transition-colors"
              style={{ backgroundColor: "#1f2937" }}
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
          {/* SIDEBAR */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-800">
            <div
              className="sticky top-16 h-[calc(100vh-64px)] text-slate-100 px-5 py-6"
              style={{ backgroundColor: NAVY }}
            >
              <nav className="space-y-1">
                <Link
                  to="/app/dashboard"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>{t("dashboard_nav_home")}</span>
                </Link>

                <Link
                  to="/create"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>{t("dashboard_nav_create")}</span>
                </Link>

                <Link
                  to="/library"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <Folder className="w-5 h-5" />
                  <span>{t("dashboard_nav_library")}</span>
                </Link>

                <Link
                  to="/pricing"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t("dashboard_nav_plans")}</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>{t("dashboard_nav_settings")}</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            <section className="py-8 md:py-10">{/* vacío */}</section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;