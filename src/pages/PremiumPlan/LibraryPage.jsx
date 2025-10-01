import React, { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Home, PlusCircle, Plus, Folder, CreditCard, Settings, User, Sun, Moon, Gem, MessageSquare, X
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

  // Filtro único (?type=all|text|summary|folders)
  const type = useMemo(() => searchParams.get("type") || "all", [searchParams]);
  const setType = (next) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("type", next);
    setSearchParams(sp, { replace: true });
  };

  // CTA dinámico para tarjeta en vistas no-folders
  const createAction = useMemo(() => {
    switch (type) {
      case "text":    return { label: t("library_create_text"),    href: "/create?mode=text" };
      case "summary": return { label: t("library_create_summary"), href: "/create?mode=summary" };
      case "folders": return { label: t("library_create_folder"),  href: "/library/folders/new" };
      case "all":
      default:        return { label: t("library_create_new"),     href: "/create" };
    }
  }, [type, t]);

  // ----- Estado local para Mis carpetas -----
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]); // [{id,name,createdAt}]

  const openFolderModal = () => { setFolderName(""); setFolderModalOpen(true); };
  const closeFolderModal = () => setFolderModalOpen(false);
  const saveFolder = () => {
    const name = folderName.trim();
    if (!name) return;
    setFolders((prev) => [
      { id: crypto.randomUUID?.() || String(Date.now()), name, createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setFolderModalOpen(false);
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
              style={{ backgroundColor: SIDEBAR_COLOR, top: HEADER_HEIGHT_PX, height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`, width: 190 }}
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
              {/* Chips de filtro */}
              <div className="flex items-center gap-2 mb-5">
                {[
                  { id: "all",     label: t("library_filter_all") },
                  { id: "text",    label: t("library_filter_texts") },
                  { id: "summary", label: t("library_filter_summaries") },
                  { id: "folders", label: t("library_filter_folders") },
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

              {/* Encabezado y botón exclusivo de "Mis carpetas" */}
              {type === "folders" && (
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t("library_folders_title")}</h1>

                  {/* Botón estilo pill (solo texto “Crear nueva carpeta”) */}
                  <button
                    onClick={openFolderModal}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium bg-black text-white hover:opacity-95 active:scale-[0.99] transition"
                    aria-haspopup="dialog"
                  >
                    <Plus className="w-5 h-5" />
                    {t("library_create_folder")} {/* “Crear nueva carpeta” */}
                  </button>
                </div>
              )}

              {/* Grid principal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Card dinámica (solo cuando NO estamos en folders) */}
                {type !== "folders" && (
                  <Link
                    to={createAction.href}
                    className="mx-auto rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-md transition"
                    style={{ width: 280, height: 196, borderRadius: 16 }}
                    role="button"
                  >
                    <div className="h-full w-full flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center rounded-full bg-indigo-50 dark:bg-slate-800" style={{ width: 70, height: 70 }}>
                        <Plus className="text-indigo-600 dark:text-sky-400" style={{ width: 21, height: 21 }} />
                      </div>
                      <span className="mt-4 text-[20px] leading-6 text-slate-900 dark:text-slate-100">
                        {createAction.label}
                      </span>
                    </div>
                  </Link>
                )}

                {/* LISTA de carpetas guardadas (solo en folders) */}
                {type === "folders" && folders.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-slate-500">
                    {t("library_no_folders") || "Aún no tienes carpetas. Crea la primera."}
                  </div>
                )}

                {type === "folders" && folders.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <Folder className="w-5 h-5 text-sky-500" />
                      <span className="font-medium truncate">{f.name}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(f.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* MODAL Crear carpeta (idéntico al ejemplo) */}
      {isFolderModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={closeFolderModal} />
          {/* Dialog */}
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-slate-900 dark:text-slate-100">
                {t("folder_modal_title") /* “Crear nueva carpeta” */}
              </h3>
              <button
                onClick={closeFolderModal}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={t("close") || "Cerrar"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {t("folder_modal_label") /* “Nombre de la carpeta” */}
              </label>
              <input
                autoFocus
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder={t("folder_modal_placeholder") /* “Ponle un nombre...” */}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 flex items-center justify-end gap-2">
              <button
                onClick={closeFolderModal}
                className="px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {t("folder_modal_cancel") /* “Cancelar” */}
              </button>
              <button
                onClick={saveFolder}
                className="px-3 py-2 text-sm rounded-lg bg-slate-900 text-white hover:opacity-95 active:scale-[0.99]"
              >
                {t("folder_modal_save") /* “Guardar” */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;