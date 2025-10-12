import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Home, PlusCircle, Plus, Folder, CreditCard, Settings, User, Sun, Moon, Gem, MessageSquare,
  MoreVertical, Pencil, Trash2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

/** Icono guardado en /public */
const DOC_ICON_SRC = "/doc-blue.png";

const LibraryPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const HEADER_COLOR     = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR    = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR  = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR     = theme === "dark" ? "#1f2937" : "#e5e7eb";
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? "Plan Premium" : "Plan Básico";

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const navHoverBg = theme === "dark" ? "hover:bg-[#2B384A]" : "hover:bg-[#eef3f9]";
  const headerHoverBg  = theme === "dark" ? "hover:bg-[#262F3F]" : "hover:bg-[#e9eef5]";
  const headerBtnBase =
    theme === "dark" ? "bg-slate-800 text-white border-0" : "bg-white text-slate-800 border border-slate-200";

  // Filtro (?type=all|text|summary|folders)
  const type = useMemo(() => searchParams.get("type") || "all", [searchParams]);
  const setType = (next) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("type", next);
    setSearchParams(sp, { replace: true });
  };

  const createAction = useMemo(() => {
    switch (type) {
      case "text":    return { label: t("library_create_text") || "Crear texto",    href: "/create?mode=text" };
      case "summary": return { label: t("library_create_summary") || "Crear resumen", href: "/create?mode=summary" };
      case "folders": return { label: t("library_create_folder") || "Crear carpeta",  href: "/library/folders/new" };
      case "all":
      default:        return { label: t("library_create_new") || "Crear nuevo",     href: "/create" };
    }
  }, [type, t]);

  // ====== Estado documentos (demo) ======
  const formatDate = (d) =>
    d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }).replace(".", "");

  const [docs, setDocs] = useState([
    { id: "doc-olondo", title: "Olondo.ai", date: formatDate(new Date()) }
  ]);

  // Menú contextual (por doc)
  const [menuOpenFor, setMenuOpenFor] = useState(null); // guarda id del doc con menú abierto
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!menuOpenFor) return;
      if (menuRef.current?.contains(e.target)) return;
      if (menuBtnRef.current?.contains(e.target)) return;
      setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpenFor]);

  // ====== Modal editar título ======
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editingDocId, setEditingDocId] = useState(null);

  const openEditModal = (doc) => {
    setEditingDocId(doc.id);
    setEditTitle(doc.title);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingDocId(null);
    setEditTitle("");
  };
  const saveEditTitle = () => {
    const title = editTitle.trim();
    if (!title) return;
    setDocs(prev => prev.map(d => d.id === editingDocId ? { ...d, title } : d));
    closeEditModal();
  };

  const deleteDoc = (docId) => {
    setDocs(prev => prev.filter(d => d.id !== docId));
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

            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors cursor-pointer ${headerHoverBg}`}>
              <LanguageSwitcher />
            </div>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors cursor-pointer ${headerBtnBase} ${headerHoverBg}`}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors cursor-pointer ${headerBtnBase} ${headerHoverBg}`}
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
          {/* SIDEBAR */}
          <aside className="border-r border-slate-200 dark:border-slate-800" style={{ borderColor: BORDER_COLOR }}>
            <div
              className="sticky ps-2 pe-3 pt-6 pb-0 text-slate-800 dark:text-slate-100"
              style={{ backgroundColor: SIDEBAR_COLOR, top: HEADER_HEIGHT_PX, height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`, width: 190 }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link to="/dashboard" className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/dashboard") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>

                  <Link to="/create" className={`w/full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/create") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>

                  <Link to="/library" className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/library") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>

                  <Link to="/assistant" className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/assistant") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_ai_chat")}</span>
                  </Link>

                  <Link to="/pricing" className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/pricing") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                <div className="pb-0">
                  <Link to="/settings" className={`w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`} style={isActive("/settings") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
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
              {/* Filtros */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  {[
                    { id: "all",     label: t("library_filter_all") || "Todos" },
                    { id: "text",    label: t("library_filter_texts") || "Textos" },
                    { id: "summary", label: t("library_filter_summaries") || "Resúmenes" },
                    { id: "folders", label: t("library_filter_folders") || "Mis carpetas" },
                  ].map(({ id, label }) => {
                    const active = type === id;

                    // Inactivo: gris; Activo: azul como antes.
                    // Efecto sin blur: fondo interno (span) que escala en hover.
                    const btnBase =
                      "group relative overflow-hidden rounded-full text-sm px-4 py-2 transition-colors duration-150 hover:shadow-sm";
                    const textCls = active
                      ? "relative z-10 text-[#1A73E8] dark:text-[#93C5FD]"
                      : "relative z-10 text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100";
                    const bgBase =
                      "absolute inset-0 rounded-full scale-100 transition-transform duration-150 will-change-transform";
                    const bgCls = active
                      ? `${bgBase} bg-[#E8F0FE] dark:bg-[rgba(59,130,246,0.18)] group-hover:scale-[1.08] group-hover:bg-[#E3EEFF]`
                      : `${bgBase} bg-transparent group-hover:bg-[#F5F7FA] dark:group-hover:bg[rgba(148,163,184,0.12)] group-hover:scale-[1.08]`;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setType(id)}
                        className={btnBase}
                        aria-pressed={active}
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <span className={bgCls} aria-hidden="true" />
                        <span className={textCls}>{label}</span>
                      </button>
                    );
                  })}
                </div>

                {type === "folders" && (
                  <button
                    onClick={() => {
                      // abrir modal crear carpeta
                      setFolderModalOpen(true);
                      setFolderName("");
                    }}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                               bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    {t("library_create_folder") || "Crear carpeta"}
                  </button>
                )}
              </div>

              {/* Contenedor de tarjetas */}
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

                {/* Tarjetas documento demo (mapeadas para poder eliminar/editar) */}
                {(type === "all" || type === "text") && docs.map((doc) => (
                  <div
                    key={doc.id}
                    className="relative rounded-2xl shadow-sm border hover:shadow-md transition cursor-default"
                    style={{
                      width: 280,
                      height: 196,
                      borderRadius: 16,
                      backgroundColor: "#EDF5FF",
                      borderColor: "#D9E7FF",
                    }}
                  >
                    {/* Menú (3 puntos) */}
                    <button
                      ref={menuBtnRef}
                      aria-label="Opciones"
                      className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-white/60"
                      onClick={() => setMenuOpenFor(prev => prev === doc.id ? null : doc.id)}
                      type="button"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </button>

                    {menuOpenFor === doc.id && (
                      <div
                        ref={menuRef}
                        className="absolute z-10 top-1/2 -translate-y-1/2 left-[calc(100%-100px)] w-[200px] rounded-xl border border-slate-200 bg-white shadow-lg py-2"
                      >
                        <button
                          className="w-full flex items-center gap-3 px-3 py-2 text-slate-800 hover:bg-slate-50"
                          onClick={() => { setMenuOpenFor(null); openEditModal(doc); }}
                        >
                          <Pencil className="w-5 h-5 text-slate-600" />
                          <span>{t("library_doc_edit_title") || "Editar título"}</span>
                        </button>
                        <button
                          className="w-full flex items-center gap-3 px-3 py-2 text-slate-800 hover:bg-slate-50"
                          onClick={() => { setMenuOpenFor(null); deleteDoc(doc.id); }}
                        >
                          <Trash2 className="w-5 h-5 text-slate-600" />
                          <span>{t("library_doc_delete") || "Eliminar"}</span>
                        </button>
                      </div>
                    )}

                    {/* Contenido tarjeta */}
                    <div className="h-full w-full px-5 pt-12 pb-6">
                      <img
                        src={DOC_ICON_SRC}
                        alt=""
                        width={60}
                        height={60}
                        className="block select-none -mt-6"
                      />
                      <h3
                        className="mt-8 text-[22px] leading-[30px] font-semibold text-slate-900 pr-8"
                        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                      >
                        {doc.title}
                      </h3>
                      <p className="mt-4 text-[14px] leading-[20px] text-slate-700">{doc.date}</p>
                    </div>
                  </div>
                ))}

                {/* Carpetas */}
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
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
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

      {/* MODAL Editar título del documento */}
      {editModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/45" onClick={closeEditModal} />
          <div className="relative w-full max-w-md bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_80px_rgba(2,6,23,0.22)]">
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[18px] leading-6 font-semibold text-slate-900">
                {t("library_doc_edit_title") || "Editar título"}
              </h3>
              <button
                onClick={closeEditModal}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label={t("close") || "Cerrar"}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="px-6 pb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t("library_doc_title_label") || "Título"}
              </label>
              <input
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder={t("library_doc_title_placeholder") || "Escribe un título"}
                className="w-full rounded-[10px] border border-slate-300 bg-white px-3 py-2 text-[14px] leading-[22px] outline-none focus:ring-2 focus:ring-sky-500"
                onKeyDown={(e) => { if (e.key === "Enter") saveEditTitle(); }}
              />
            </div>
            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-[14px] font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                {t("cancel") || "Cancelar"}
              </button>
              <button
                onClick={saveEditTitle}
                disabled={!editTitle.trim()}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {t("save") || "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
