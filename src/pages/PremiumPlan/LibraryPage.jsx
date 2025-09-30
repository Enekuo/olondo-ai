import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Plus, Folder, CreditCard, Settings, User, Sun, Moon, Gem, MessageSquare
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const LibraryPage = () => {
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

  const planPillStyle =
    theme === "dark"
      ? {
          backgroundColor: "rgba(255,255,255,0.06)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
          color: "#E5E7EB",
        }
      : {
          backgroundColor: "#f3f4f6",
          boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12)",
          color: "#0f172a",
        };

  const planIconBoxStyle =
    theme === "dark"
      ? {
          backgroundColor: "rgba(255,255,255,0.22)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
        }
      : {
          backgroundColor: "#ffffff",
          boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)",
        };

  const planIconColor = theme === "dark" ? "#ffffff" : "#334155";

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX, borderColor: BORDER_COLOR }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 select-none">
              <div
                className="inline-flex items-center justify-center rounded-[10px]"
                style={{ width: 30, height: 30, ...planIconBoxStyle }}
              >
                <Gem className="w-5 h-5" style={{ color: planIconColor }} />
              </div>
              <div className="rounded-xl px-3 py-1.5 text-sm font-medium" style={planPillStyle}>
                {planLabel}
              </div>
            </div>

            <LanguageSwitcher />

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

      {/* LAYOUT */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
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
                <nav className="space-y-1">
                  <Link to="/app/dashboard"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>

                  <Link to="/create"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/create") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>

                  <Link to="/library"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/library") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>

                  {/* NUEVO: Chat con IA */}
                  <Link to="/assistant"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/assistant") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_ai_chat")}</span>
                  </Link>

                  <Link to="/pricing"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/pricing") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                <div className="pb-0">
                  <Link to="/settings"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/settings") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <main>
            <section className="py-8 md:py-10 px-4 md:px-8">
              {/* Barra superior: "Todos | Mis carpetas" + botón negro "Crear nuevo" sin círculo */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <button className="text-[15px] leading-[22px] text-slate-700 dark:text-slate-200">
                    Todos
                  </button>

                  <span className="text-[15px] leading-[22px] font-medium px-4 py-2 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                    Mis carpetas
                  </span>
                </div>

                <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium bg-black text-white hover:opacity-95 active:scale-[0.99] transition">
                  <Plus className="w-5 h-5" />
                  Crear nuevo
                </button>
              </div>

              {/* Título de sección */}
              <h1 className="text-[22px] font-semibold tracking-tight mb-4">Carpetas</h1>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Tarjeta “Crear carpeta” (se mantiene con círculo, no lo pediste cambiar) */}
                <button
                  className="group relative h-44 rounded-2xl border border-slate-200 bg-white hover:shadow-xl transition dark:bg-slate-900 dark:border-slate-800"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-black/0 to-black/0 group-hover:to-black/[0.02]" />
                  <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-slate-200 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
                      <PlusCircle className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <span className="text-[15px] font-medium text-slate-800 dark:text-slate-100">
                      Crear carpeta
                    </span>
                  </div>
                </button>

                {/* Más tarjetas de carpeta irán aquí */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;