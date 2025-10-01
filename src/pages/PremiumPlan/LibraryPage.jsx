import React, { useMemo } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

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
      ? { backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)", color: "#E5E7EB" }
      : { backgroundColor: "#f3f4f6", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12)", color: "#0f172a" };

  const planIconBoxStyle =
    theme === "dark"
      ? { backgroundColor: "rgba(255,255,255,0.22)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)" }
      : { backgroundColor: "#ffffff", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)" };

  const planIconColor = theme === "dark" ? "#ffffff" : "#334155";

  // Tabs (?tab=all|folders) -> vista principal
  const tab = useMemo(() => searchParams.get("tab") || "all", [searchParams]);

  // Filtro por tipo (?type=all|text|summary) -> aplica en tab=all
  const type = useMemo(() => searchParams.get("type") || "all", [searchParams]);

  const setTab = (next) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("tab", next);
    setSearchParams(sp, { replace: true });
  };

  const setType = (next) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("type", next);
    setSearchParams(sp, { replace: true });
  };

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
              <div className="inline-flex items-center justify-center rounded-[10px]" style={{ width: 30, height: 30, ...planIconBoxStyle }}>
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
                color: "#1f2937"
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
              style={{ backgroundColor: SIDEBAR_COLOR, top: HEADER_HEIGHT_PX, height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`, width: SIDEBAR_WIDTH_PX }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link to="/app/dashboard" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>

                  <Link to="/create" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/create") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>

                  <Link to="/library" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/library") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>

                  <Link to="/assistant" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/assistant") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_ai_chat")}</span>
                  </Link>

                  <Link to="/pricing" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/pricing") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                <div className="pb-0">
                  <Link to="/settings" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                        style={{ backgroundColor: isActive("/settings") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          <main>
            <section className="py-8 md:py-10 px-4 md:px-8">
              {/* Tabs principales */}
              <div className="flex items-center justify-between mb-6" role="tablist" aria-label={t("library_aria_label") || "Biblioteca"}>
                <div className="flex items-center gap-6">
                  {["all","folders"].map((key) => {
                    const active = tab === key;
                    const base = "text-[15px] leading-[22px] font-medium px-4 py-2 rounded-full transition-colors";
                    const cls = active
                      ? `${base} bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100`
                      : `${base} text-slate-700 dark:text-slate-200`;
                    return (
                      <button key={key} role="tab" aria-selected={active} onClick={() => setTab(key)} className={cls}>
                        {key === "all" ? t("library_tab_all") : t("library_tab_folders")}
                      </button>
                    );
                  })}
                </div>

                <Link to="/create" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium bg-black text-white hover:opacity-95 active:scale-[0.99] transition">
                  <Plus className="w-5 h-5" />
                  {t("library_create_new")}
                </Link>
              </div>

              {/* Filtros (solo en tab=all) */}
              {tab === "all" && (
                <div className="flex items-center gap-2 mb-5">
                  {[
                    { id: "all", label: t("library_filter_all") },
                    { id: "text", label: t("library_filter_texts") },
                    { id: "summary", label: t("library_filter_summaries") },
                  ].map(({ id, label }) => {
                    const active = type === id;
                    const base = "px-3 py-1.5 rounded-full text-sm border transition-colors";
                    const cls = active
                      ? `${base} bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent`
                      : `${base} bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700`;
                    return (
                      <button key={id} onClick={() => setType(id)} className={cls} aria-pressed={active}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Título solo en "Mis carpetas" */}
              {tab === "folders" && (
                <h1 className="text-[22px] font-semibold tracking-tight mb-4">{t("library_folders_title")}</h1>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Card “Crear …” (tamaño reducido manteniendo proporción) */}
                <button
                  className="mx-auto rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-md transition"
                  style={{ width: 280, height: 196, borderRadius: 16 }}
                >
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center rounded-full bg-indigo-50 dark:bg-slate-800" style={{ width: 70, height: 70 }}>
                      <Plus className="text-indigo-600 dark:text-sky-400" style={{ width: 21, height: 21 }} />
                    </div>
                    <span className="mt-4 text-[20px] leading-6 text-slate-900 dark:text-slate-100">
                      {t("library_create_folder")}
                    </span>
                  </div>
                </button>

                {/* Aquí irán tus tarjetas. 
                   Recuerda: ordenar del más nuevo al más antiguo en backend o al map() */}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;