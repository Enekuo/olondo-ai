import React, { useMemo, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Home, PlusCircle, Plus, Folder, CreditCard, Settings, User, Sun, Moon, Gem, MessageSquare, X,
  MoreHorizontal
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

/** Ruta del nuevo icono que nos pasaste */
const DOC_ICON_SRC = "/assets/img/doc-blue.png"; // <-- cambia esta ruta a donde subas la imagen

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

  // Filtro (?type=all|text|summary|folders)
  const type = useMemo(() => searchParams.get("type") || "all", [searchParams]);
  const setType = (next) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("type", next);
    setSearchParams(sp, { replace: true });
  };

  const createAction = useMemo(() => {
    switch (type) {
      case "text":    return { label: t("library_create_text"),    href: "/create?mode=text" };
      case "summary": return { label: t("library_create_summary"), href: "/create?mode=summary" };
      case "folders": return { label: t("library_create_folder"),  href: "/library/folders/new" };
      case "all":
      default:        return { label: t("library_create_new"),     href: "/create" };
    }
  }, [type, t]);

  // Estado local carpetas
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);

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

  // Documentos de ejemplo (incluye “Olondo.ai”)
  const formatDate = (d) =>
    d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }).replace(".", "");
  const today = new Date();
  const sampleDocs = Array.from({ length: 1 }).map((_, i) => {
    const dt = new Date(today); dt.setDate(today.getDate() - i);
    return { id: `doc-${i + 1}`, title: "Olondo.ai", date: formatDate(dt) };
  });

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
                style={{
                  width: 30, height: 30,
                  backgroundColor: theme === "dark" ? "rgba(255,255,255,0.22)" : "#ffffff",
                  boxShadow: theme === "dark"
                    ? "inset 0 0 0 1px rgba(255,255,255,0.45)"
                    : "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)"
                }}
              >
                <Gem className="w-5 h-5" style={{ color: theme === "dark" ? "#ffffff" : "#334155" }} />
              </div>
              <div
                className="rounded-xl px-3 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "#f3f4f6",
                  boxShadow: theme === "dark"
                    ? "inset 0 0 0 1px rgba(255,255,255,0.10)"
                    : "inset 0 0 0 1px rgba(15,23,42,0.12)",
                  color: theme === "dark" ? "#E5E7EB" : "#0f172a",
                }}
              >
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
              {/* Filtros */}
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

              {/* Mis carpetas */}
              {type === "folders" && (
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-[22px] font-semibold tracking-tight">{t("library_folders_title")}</h1>

                  <button
                    onClick={openFolderModal}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium bg-black text-white hover:opacity-95 active:scale-[0.99] transition"
                    aria-haspopup="dialog"
                  >
                    <Plus className="w-5 h-5" />
                    {t("library_create_folder")}
                  </button>
                </div>
              )}

              {/* Cards: flex wrap + ~1 cm entre tarjetas */}
              <div className="flex flex-wrap gap-[38px]">
                {/* Crear nuevo */}
                {type !== "folders" && (
                  <Link
                    to={createAction.href}
                    className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-md transition"
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

                {/* Tarjeta Olondo.ai – usando la NUEVA imagen y más arriba */}
                {(type === "all" || type === "text") &&
                  sampleDocs.map((d) => (
                    <div
                      key={d.id}
                      className="relative rounded-2xl shadow-sm border"
                      style={{
                        width: 280,
                        height: 196,
                        borderRadius: 16,
                        backgroundColor: "#EDF5FF",
                        borderColor: "#D9E7FF",
                      }}
                    >
                      <button
                        aria-label="Opciones"
                        className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-white/60"
                      >
                        <MoreHorizontal className="w-5 h-5 text-slate-600" />
                      </button>

                      {/* MÁS ARRIBA: menos padding top y menor margen antes del título */}
                      <div className="h-full w-full px-5 pt-6 pb-6">
                        <img src={DOC_ICON_SRC} alt="" width={28} height={28} className="block select-none" />
                        <h3
                          className="mt-4 text-[22px] leading-[30px] font-semibold text-slate-900 pr-8"
                          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                        >
                          {d.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[20px] text-slate-700">
                          {d.date}
                        </p>
                      </div>
                    </div>
                  ))}

                {/* Carpetas (si las hay) */}
                {type === "folders" && folders.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-slate-500">
                    {t("library_no_folders") || "Aún no tienes carpetas. Crea la primera."}
                  </div>
                )}
                {type === "folders" && folders.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
                    style={{ width: 280 }}
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

      {/* MODAL Crear carpeta */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/45" onClick={closeFolderModal} />
          <div className="relative w-full max-w-lg bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_80px_rgba(2,6,23,0.22)]">
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[18px] leading-6 font-semibold text-slate-900">
                {t("folder_modal_title")}
              </h3>
              <button
                onClick={closeFolderModal}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label={t("close") || "Cerrar"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 pb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t("folder_modal_label")}
              </label>
              <input
                autoFocus
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder={t("folder_modal_placeholder")}
                className="w-full rounded-[10px] border border-slate-300 bg-white px-3 py-2 text-[14px] leading-[22px] outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button
                onClick={closeFolderModal}
                className="px-4 py-2 text-[14px] font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                {t("folder_modal_cancel")}
              </button>
              <button
                onClick={saveFolder}
                disabled={!folderName.trim()}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {t("folder_modal_save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;