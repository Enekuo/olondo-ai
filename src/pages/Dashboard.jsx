import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const HEADER_COLOR    = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR   = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR    = theme === "dark" ? "#1f2937" : "#e5e7eb";

  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? "Plan Premium" : "Plan Básico";

  const isActive = (path) => location.pathname === path;

  // Clases de hover (fondo + texto)
  const hoverBg  = theme === "dark" ? "hover:bg-[#262F3F]" : "hover:bg-[#e9eef5]";
  const hoverTxt = theme === "dark" ? "hover:text-white"  : "hover:text-slate-900";

  const planPillStyle =
    theme === "dark"
      ? { backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)", color: "#E5E7EB" }
      : { backgroundColor: "#f3f4f6", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12)", color: "#0f172a" };

  const planIconBoxStyle =
    theme === "dark"
      ? { backgroundColor: "rgba(255,255,255,0.22)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)" }
      : { backgroundColor: "#ffffff", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)" };

  const planIconColor = theme === "dark" ? "#ffffff" : "#334155";

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX, borderColor: BORDER_COLOR }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          {/* Controles */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Indicador de plan */}
            <div className="hidden sm:flex items-center gap-2 select-none">
              <div
                className="inline-flex items-center justify-center rounded-[10px]"
                style={{ width: 30, height: 30, ...planIconBoxStyle }}
                aria-hidden="true"
              >
                <Gem className="w-5 h-5" style={{ color: planIconColor }} />
              </div>
              <div className="rounded-xl px-3 py-1.5 text-sm font-medium" style={planPillStyle}>
                {planLabel}
              </div>
            </div>

            {/* Selector idioma con hover */}
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors cursor-pointer ${hoverBg}`}>
              <LanguageSwitcher />
            </div>

            {/* Toggle claro/oscuro con hover */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors cursor-pointer ${hoverBg}`}
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                border: theme === "dark" ? "none" : "1px solid #e5e7eb",
                color: theme === "dark" ? "#ffffff" : "#1f2937"
              }}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar con hover */}
            <button
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${hoverBg}`}
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                border: theme === "dark" ? "none" : "1px solid #e5e7eb",
                color: theme === "dark" ? "#ffffff" : "#1f2937"
              }}
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* LAYOUT principal */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          {/* SIDEBAR */}
          <aside className="border-r border-slate-200 dark:border-slate-800" style={{ borderColor: BORDER_COLOR }}>
            <div
              className="sticky ps-2 pe-3 pt-6 pb-0 text-slate-800 dark:text-slate-100"
              style={{
                backgroundColor: SIDEBAR_COLOR,
                top: HEADER_HEIGHT_PX,
                height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
                width: SIDEBAR_WIDTH_PX
              }}
            >
              <div className="h-full flex flex-col justify-between">
                {/* NAV */}
                <nav className="space-y-1">
                  <Link
                    to="/app/dashboard"
                    className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${hoverBg} ${hoverTxt}`}
                    style={isActive("/app/dashboard") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}
                  >
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>

                  <Link
                    to="/create"
                    className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${hoverBg} ${hoverTxt}`}
                    style={isActive("/create") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}
                  >
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>

                  <Link
                    to="/library"
                    className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${hoverBg} ${hoverTxt}`}
                    style={isActive("/library") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}
                  >
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>

                  <Link
                    to="/pricing"
                    className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${hoverBg} ${hoverTxt}`}
                    style={isActive("/pricing") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}
                  >
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                {/* CONFIGURACIÓN MÁS ABAJO */}
                <div className="pb-0">
                  <Link
                    to="/settings"
                    className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${hoverBg} ${hoverTxt}`}
                    style={isActive("/settings") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}
                  >
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO */}
          <main>
            <section className="py-8 md:py-10 px-4 md:px-8">
              {/* Contenido principal */}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;