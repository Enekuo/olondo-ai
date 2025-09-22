import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem,
  Upload, Search, FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Colores según tema (oscuro = igual que ahora; claro = más blanco)
  const HEADER_COLOR   = theme === "dark" ? "#262F3F" : "#ffffff";   // header
  const SIDEBAR_COLOR  = theme === "dark" ? "#354153" : "#f8f9fb";   // sidebar claro
  const ACTIVE_BG_COLOR= theme === "dark" ? "#262F3F" : "#e9eef5";   // item activo sidebar
  const BORDER_COLOR   = theme === "dark" ? "#1f2937" : "#e5e7eb";   // bordes (approx slate-800 / slate-200)

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
            {/* Indicador de plan: ICONO + PÍLDORA */}
            <div className="hidden sm:flex items-center gap-2 select-none">
              <div
                className="inline-flex items-center justify-center rounded-[10px]"
                style={{
                  width: 30,
                  height: 30,
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

      {/* LAYOUT principal con columnas fijas (sidebar 190px + contenido 1fr) */}
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

                {/* Crear nuevo va antes que Biblioteca */}
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

          {/* CONTENIDO */}
          <main>
            <section className="py-6 md:py-8 px-4 md:px-8">
              {/* Grid central: Fuentes (izq) + Chat (der) */}
              <div className="grid gap-6 lg:gap-8 grid-cols-1 xl:grid-cols-[320px_1fr]">
                {/* Panel FUENTES */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t("dashboard_sources_title") || "Fuentes"}
                    </h2>
                    <button
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      aria-label={t("dashboard_sources_collapse") || "Ocultar"}
                    >
                      {/* Ícono placeholder de “colapsar” (no funcional ahora) */}
                      <span className="block w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </button>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <PlusCircle className="w-4 h-4" />
                      {t("dashboard_sources_add") || "Añadir"}
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <Search className="w-4 h-4" />
                      {t("dashboard_sources_discover") || "Descubrir"}
                    </button>
                  </div>

                  {/* Estado vacío */}
                  <div className="mt-10 flex flex-col items-center text-center text-slate-500 dark:text-slate-400">
                    <div className="w-14 h-14 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-sm">
                      {t("dashboard_sources_empty") || "Las fuentes guardadas aparecerán aquí"}
                    </p>
                    <p className="text-xs mt-1">
                      {t("dashboard_sources_hint") ||
                        "Haz clic en “Añadir” para subir PDFs, enlaces, texto o audio."}
                    </p>
                  </div>
                </div>

                {/* Panel CHAT / Área principal */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 flex flex-col min-h-[560px]">
                  {/* Header del chat (opcional en tu mock) */}
                  <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {t("dashboard_chat_title") || "Chat"}
                    </h2>
                  </div>

                  {/* Área central vacía con “Añade una fuente para comenzar” */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="mx-auto mb-3 w-12 h-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                      </div>
                      <p className="text-base font-medium text-slate-700 dark:text-slate-200">
                        {t("dashboard_chat_add_source_title") || "Añade una fuente para comenzar"}
                      </p>
                      <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90">
                        <Upload className="w-4 h-4" />
                        {t("dashboard_chat_upload_btn") || "Subir una fuente"}
                      </button>
                    </div>
                  </div>

                  {/* Barra inferior tipo input */}
                  <div className="border-t border-slate-200 dark:border-slate-800 p-3">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3">
                      <input
                        type="text"
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
                        placeholder={t("dashboard_chat_input_placeholder") || "Sube una fuente para empezar"}
                        disabled
                      />
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {t("dashboard_chat_sources_count") || "0 fuentes"}
                      </span>
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        aria-label={t("send") || "Enviar"}
                        disabled
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;