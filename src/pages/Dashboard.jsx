import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Colores EXACTOS del mock
  const HEADER_COLOR  = "#262F3F"; // header y item activo
  const SIDEBAR_COLOR = "#354153"; // base sidebar

    // ⬅️ Medidas Header y Sidebar
  const HEADER_HEIGHT_PX = 72;   // alto del header
  const SIDEBAR_WIDTH_PX = 180;  // ancho del sidebar


  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* Selector idioma sin blanco */}
            <div className="rounded-xl p-1 ring-1 ring-slate-600/20" style={{ backgroundColor: HEADER_COLOR }}>
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

      {/* LAYOUT principal con columnas fijas (sidebar 264px + contenido 1fr) */}
      <div className="w-full">
        <div
          className="grid gap-0 md:grid-cols-[180px_1fr]"
        >
          {/* SIDEBAR */}
          <aside className="border-r border-slate-800">
            <div
              className="sticky text-slate-100 px-5 py-6"
              style={{
                backgroundColor: SIDEBAR_COLOR,
                top: HEADER_HEIGHT_PX,                  // mismo offset del header (72px)
                height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
                width: SIDEBAR_WIDTH_PX                  // 264px exactos
              }}
            >
              <nav className="space-y-1">
                <Link
                  to="/app/dashboard"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/app/dashboard") ? HEADER_COLOR : "transparent" }}
                >
                  <Home className="w-5 h-5" />
                  <span>{t("dashboard_nav_home")}</span>
                </Link>

                <Link
                  to="/library"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/library") ? HEADER_COLOR : "transparent" }}
                >
                  <Folder className="w-5 h-5" />
                  <span>{t("dashboard_nav_library")}</span>
                </Link>

                <Link
                  to="/create"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/create") ? HEADER_COLOR : "transparent" }}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>{t("dashboard_nav_create")}</span>
                </Link>

                <Link
                  to="/pricing"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/pricing") ? HEADER_COLOR : "transparent" }}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t("dashboard_nav_plans")}</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/settings") ? HEADER_COLOR : "transparent" }}
                >
                  <Settings className="w-5 h-5" />
                  <span>{t("dashboard_nav_settings")}</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* CONTENIDO */}
          <main>
            <section className="py-8 md:py-10">{/* vacío intencional */}</section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;