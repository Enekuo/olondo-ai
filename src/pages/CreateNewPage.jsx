import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const CreateNewPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Colores según tema (oscuro = igual; claro = más blanco)
  const HEADER_COLOR    = theme === "dark" ? "#262F3F" : "#ffffff";  // header
  const SIDEBAR_COLOR   = theme === "dark" ? "#354153" : "#f8f9fb";  // sidebar claro
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";  // item activo
  const BORDER_COLOR    = theme === "dark" ? "#1f2937" : "#e5e7eb";  // borde

  // Dimensiones
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  // Plan del usuario (ajústalo desde tu lógica real)
  const USER_PLAN = "premium"; // "basic" | "premium"
  const planLabel = USER_PLAN === "premium" ? "Plan Premium" : "Plan Básico";

  const isActive = (path) => location.pathname === path;

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
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "rgba(255,255,255,0.22)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)"
                }}
                aria-hidden="true"
              >
                <Gem className="w-5 h-5 text-white/90" />
              </div>
              <div
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-slate-100/90"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)"
                }}
              >
                {planLabel}
              </div>
            </div>

            {/* Selector idioma */}
            <LanguageSwitcher />

            {/* Toggle claro/oscuro */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:opacity-90 transition-colors"
              style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                border: theme === "dark" ? "none" : "1px solid #e5e7eb",
                color: theme === "dark" ? "#ffffff" : "#1f2937"
              }}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 transition-colors"
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

      {/* LAYOUT principal con columnas fijas */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          {/* SIDEBAR */}
          <aside className="border-r border-slate-200 dark:border-slate-800" style={{ borderColor: BORDER_COLOR }}>
            <div
              className="sticky ps-2 pe-5 py-6 text-slate-800 dark:text-slate-100"
              style={{
                backgroundColor: SIDEBAR_COLOR,
                top: HEADER_HEIGHT_PX,
                height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
                width: SIDEBAR_WIDTH_PX
              }}
            >
              <nav className="space-y-1">
                <Link
                  to="/app/dashboard"
                  className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}
                >
                  <Home className="w-5 h-5 shrink-0" />
                  <span className="truncate">{t("dashboard_nav_home")}</span>
                </Link>

                <Link
                  to="/create"
                  className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/create") ? ACTIVE_BG_COLOR : "transparent" }}
                >
                  <PlusCircle className="w-5 h-5 shrink-0" />
                  <span className="truncate">{t("dashboard_nav_create")}</span>
                </Link>

                <Link
                  to="/library"
                  className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/library") ? ACTIVE_BG_COLOR : "transparent" }}
                >
                  <Folder className="w-5 h-5 shrink-0" />
                  <span className="truncate">{t("dashboard_nav_library")}</span>
                </Link>

                <Link
                  to="/pricing"
                  className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/pricing") ? ACTIVE_BG_COLOR : "transparent" }}
                >
                  <CreditCard className="w-5 h-5 shrink-0" />
                  <span className="truncate">{t("dashboard_nav_plans")}</span>
                </Link>

                <Link
                  to="/settings"
                  className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                  style={{ backgroundColor: isActive("/settings") ? ACTIVE_BG_COLOR : "transparent" }}
                >
                  <Settings className="w-5 h-5 shrink-0" />
                  <span className="truncate">{t("dashboard_nav_settings")}</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* CONTENIDO vacío */}
          <main>
            <section className="py-8 md:py-10">
              {/* Página de Create New vacía */}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;