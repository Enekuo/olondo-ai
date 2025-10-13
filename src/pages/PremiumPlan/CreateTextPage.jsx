import React, { useRef, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon,
  FileText,
  File as FileIcon, Link2 as UrlIcon, Plus, Trash2, X, MessageSquare
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CreateTextPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const tr = (key) => t(key);

  // ===== Estado =====
  // IMPORTANTE: arranca sin pestaña seleccionada
  const [sourceMode, setSourceMode] = useState(null); // null | 'text' | 'document' | 'url'
  const [textValue, setTextValue] = useState("");
  const [chatInput, setChatInput] = useState("");

  // Documentos
  const [documents, setDocuments] = useState([]); // [{id,file}]
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // URLs
  const [urlInputOpen, setUrlInputOpen] = useState(false);
  const [urlsTextarea, setUrlsTextarea] = useState("");
  const [urlItems, setUrlItems] = useState([]); // [{id,url,host}]

  // ===== Estilos base =====
  const HEADER_COLOR    = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR   = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR    = theme === "dark" ? "#1f2937" : "#e5e7eb";
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const isCurrentOrChild = (base) =>
    location.pathname === base || location.pathname.startsWith(base + "/");
  const navHoverBg = theme === "dark" ? "hover:bg-[#2B384A]" : "hover:bg-[#eef3f9]";
  const navClasses = () =>
    `w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors cursor-pointer ${navHoverBg}`;

  const pageVariants = { initial: { opacity: 0, y: 20 }, in: { opacity: 1, y: 0 }, out: { opacity: 0, y: -20 } };

  // i18n
  const labelCreateTitle = tr("create_text_title");
  const labelSources     = tr("sources_title");

  // ===== Pestañas =====
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#9ca3af";
  const GRAY_ICON = "#9ca3af";
  const DIVIDER = "#e5e7eb";

  const TabBtn = ({ active, icon: Icon, label, onClick, showDivider }) => (
    <div className="relative flex-1 min-w-0 flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex w-full items-center gap-2 h-[44px] px-3 text-[14px] font-medium justify-start"
        style={{ color: active ? BLUE : GRAY_TEXT }}
        aria-pressed={active}
        aria-label={label}
      >
        <Icon className="w-[18px] h-[18px] shrink-0" style={{ color: active ? BLUE : GRAY_ICON }} />
        <span className="truncate">{label}</span>
        {active && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />}
      </button>
      {showDivider && <span aria-hidden className="self-center" style={{ width: 1, height: 22, backgroundColor: DIVIDER }} />}
    </div>
  );

  // ===== Utils =====
  const formatBytes = (n) => {
    if (!n && n !== 0) return "";
    const k = 1024, sizes = ["B","KB","MB","GB","TB"];
    const i = Math.floor(Math.log(n) / Math.log(k));
    return `${(n / Math.pow(k, i)).toFixed(i ? 1 : 0)} ${sizes[i]}`;
  };

  const parseUrlsFromText = (text) => {
    const raw = text.split(/[\s\n]+/).map(s => s.trim()).filter(Boolean);
    const valid = [];
    for (const u of raw) {
      try { const url = new URL(u); valid.push({ href: url.href, host: url.host }); } catch {}
    }
    const seen = new Set();
    return valid.filter(v => (seen.has(v.href) ? false : (seen.add(v.href), true)));
  };

  // Documentos
  const triggerPick = () => fileInputRef.current?.click();
  const addFiles = (list) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    const newDocs = arr.map((file) => ({ id: crypto.randomUUID(), file }));
    setDocuments((prev) => [...prev, ...newDocs]);
  };
  const onFiles = (e) => { addFiles(e.target.files); e.target.value = ""; };

  const onDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const onDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); };
  const onDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const onDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    const dt = e.dataTransfer; if (dt?.files?.length) addFiles(dt.files);
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // URLs
  const addUrlsFromTextarea = () => {
    const parsed = parseUrlsFromText(urlsTextarea);
    if (!parsed.length) return;
    const newItems = parsed.map(p => ({ id: crypto.randomUUID(), url: p.href, host: p.host }));
    setUrlItems(prev => [...prev, ...newItems]);
    setUrlsTextarea(""); setUrlInputOpen(false);
  };
  const removeUrl = (id) => {
    setUrlItems((prev) => prev.filter((u) => u.id !== id));
  };
  const clearUrls = () => setUrlItems([]);

  // Mensaje de ayuda (misma clave, dividido en título/cuerpo)
  const leftRaw = tr("create_help_left");
  const [leftTitle, leftBody] = useMemo(() => {
    const parts = (leftRaw || "").split(".");
    const first = (parts.shift() || leftRaw || "").trim();
    const rest = parts.join(".").trim();
    return [first.endsWith(".") ? first : `${first}.`, rest];
  }, [leftRaw]);

  return (
    <div
      className="min-h-screen w-full text-slate-900 dark:text-slate-100"
      style={{ backgroundColor: theme === "dark" ? "#0B1220" : "#F4F8FF" }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX, borderColor: BORDER_COLOR }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between relative">
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">Olondo.ai</Link>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              <FileText className="w-5 h-5 relative -top-px" style={{ color: BLUE }} aria-hidden />
              <span>{tr("create_text_title")}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:opacity-90 transition-colors"
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={tr("theme_toggle")}
              title={tr("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={tr("user_menu")}
              title={tr("user_menu")}
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
              style={{
                backgroundColor: SIDEBAR_COLOR,
                top: HEADER_HEIGHT_PX,
                height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
                width: SIDEBAR_WIDTH_PX
              }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link to="/app/dashboard" className={navClasses()} style={location.pathname === "/app/dashboard" ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_home")}</span>
                  </Link>
                  <Link to="/create" className={navClasses()} style={isCurrentOrChild("/create") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined} aria-current={isCurrentOrChild("/create") ? "page" : undefined}>
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_create")}</span>
                  </Link>
                  <Link to="/library" className={navClasses()} style={isCurrentOrChild("/library") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_library")}</span>
                  </Link>
                  <Link to="/assistant" className={navClasses()} style={isCurrentOrChild("/assistant") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_ai_chat")}</span>
                  </Link>
                  <Link to="/pricing" className={navClasses()} style={isCurrentOrChild("/pricing") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                <div className="pb-0">
                  <Link to="/settings" className={navClasses()} style={isCurrentOrChild("/settings") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="min-h-[calc(100vh-72px)]">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-4">
              <motion.section
                className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-6"
                initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.35 }}
                style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT_PX + 32}px)` }}
              >
                {/* Panel Fuentes (izquierda) */}
                <aside className="h-full rounded-2xl bg-white dark:bg-slate-900/50 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm overflow-hidden flex flex-col">
                  {/* Título */}
                  <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{labelSources}</div>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center px-2 border-b" style={{ borderColor: DIVIDER }}>
                    <TabBtn
                      active={sourceMode === "text"}
                      icon={FileText}
                      label={tr("sources_tab_text")}
                      onClick={() => setSourceMode("text")}
                      showDivider
                    />
                    <TabBtn
                      active={sourceMode === "document"}
                      icon={FileIcon}
                      label={tr("sources_tab_document")}
                      onClick={() => setSourceMode("document")}
                      showDivider
                    />
                    <TabBtn
                      active={sourceMode === "url"}
                      icon={UrlIcon}
                      label={tr("sources_tab_url")}
                      onClick={() => setSourceMode("url")}
                      showDivider={false}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 overflow-hidden p-4">
                    {/* ======= ESTADO INICIAL: NINGUNA PESTAÑA ======= */}
                    {!sourceMode && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="text-center px-2">
                          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-slate-500" />
                          </div>
                          <p className="text-[15px] font-semibold text-slate-600 dark:text-slate-200">
                            {leftTitle}
                          </p>
                          {leftBody && (
                            <p className="mt-1 text-[13px] leading-6 text-slate-500 dark:text-slate-400">
                              {leftBody}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ======= TEXTO ======= */}
                    {sourceMode === "text" && (
                      <textarea
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        placeholder={tr("enter_text_here_full")}
                        className="w-full h-[220px] resize-none outline-none text-[15px] leading-6
                                   bg-transparent placeholder:text-slate-400 text-slate-800
                                   dark:text-slate-100 dark:placeholder:text-slate-500"
                        aria-label={tr("sources_tab_text")}
                      />
                    )}

                    {/* ======= DOCUMENTO ======= */}
                    {sourceMode === "document" && (
                      <div
                        className={`h-full w-full flex flex-col relative ${dragActive ? "ring-2 ring-sky-400 rounded-2xl" : ""}`}
                        onDragEnter={onDragEnter}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          multiple
                          // @ts-ignore
                          webkitdirectory=""
                          directory=""
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.csv,.json,.xml,.epub,.txt,.vtt,.srt,.md,.rtf,.html,.htm,.jpg,.jpeg,.png"
                          onChange={onFiles}
                        />
                        <button
                          type="button"
                          onClick={triggerPick}
                          className="w-full rounded-2xl border border-dashed
                                     border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/30
                                     hover:bg-slate-50 dark:hover:bg-slate-900/50 transition
                                     px-6 py-10 text-center shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]"
                          aria-label={tr("choose_file_title")}
                          title={tr("choose_file_title")}
                        >
                          <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center">
                            <Plus className="w-10 h-10 text-sky-600" />
                          </div>
                          <div className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                            {tr("choose_file_title")}
                          </div>
                          <div className="mt-4 text-sm text-slate-500">
                            {tr("accepted_formats")}
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            {tr("folder_hint")}
                          </div>
                        </button>
                      </div>
                    )}

                    {/* ======= URL ======= */}
                    {sourceMode === "url" && (
                      <div className="h-full w-full flex flex-col">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <UrlIcon className="w-4 h-4" />
                            {tr("paste_urls_label")}
                          </div>
                          <button
                            type="button"
                            onClick={() => setUrlInputOpen(true)}
                            className="inline-flex items-center gap-2
                                       px-4 py-2 text-sm font-medium
                                       rounded-full border border-sky-300
                                       bg-sky-50 text-sky-700
                                       hover:bg-sky-100 hover:border-sky-400
                                       focus:outline-none focus:ring-2 focus:ring-sky-400/40
                                       shadow-sm transition-colors
                                       dark:border-sky-500/40 dark:bg-sky-900/20 dark:text-sky-300
                                       dark:hover:bg-sky-900/30"
                            aria-label={tr("add_url")}
                            title={tr("add_url")}
                          >
                            <Plus className="w-4 h-4 text-sky-500 dark:text-sky-300" />
                            {tr("add_url")}
                          </button>
                        </div>

                        {urlInputOpen && (
                          <div className="mb-4 rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-white/90 dark:bg-slate-900/50">
                            <textarea
                              value={urlsTextarea}
                              onChange={(e) => setUrlsTextarea(e.target.value)}
                              placeholder={tr("paste_urls_placeholder")}
                              className="w-full min-h-[140px] rounded-md border border-slate-200 dark:border-slate-700 bg-transparent p-2 outline-none text-[15px] leading-6 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                              aria-label={tr("paste_urls_placeholder")}
                            />
                            <div className="mt-2 flex items-center gap-2">
                              <Button type="button" onClick={addUrlsFromTextarea} className="h-9">
                                {tr("save_urls")}
                              </Button>
                              <button
                                type="button"
                                onClick={() => { setUrlsTextarea(""); setUrlInputOpen(false); }}
                                className="h-9 px-3 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm"
                              >
                                {tr("cancel")}
                              </button>
                            </div>
                            <div className="mt-6 text-xs text-slate-500">
                              • {tr("urls_note_visible")}<br/>
                              • {tr("urls_note_paywalled")}
                            </div>
                          </div>
                        )}

                        {urlItems.length > 0 && (
                          <ul className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
                            {urlItems.map(({ id, url, host }) => (
                              <li key={id} className="flex items-center justify-between gap-3 px-3 py-2">
                                <div className="min-w-0 flex items-center gap-3 flex-1">
                                  <div className="shrink-0 w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <UrlIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-sm font-medium block truncate text-sky-600 hover:underline"
                                      title={url}
                                    >
                                      {host} — {url}
                                    </a>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeUrl(id)}
                                  className="shrink-0 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                                  title={tr("remove")}
                                  aria-label={tr("remove")}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </aside>

                {/* ========= Panel Derecho ========= */}
                <section className="h-full relative rounded-2xl bg-white dark:bg-slate-900/50 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm overflow-hidden -ml-px">
                  {/* Botón superior centrado */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: "38%" }}>
                    <Button
                      type="button"
                      className="h-10 md:h-11 w-[220px] md:w-[240px] rounded-full text-[14px] md:text-[15px] font-medium shadow-sm flex items-center justify-center"
                    >
                      {tr("generate_from_sources")}
                    </Button>
                  </div>

                  {/* Mensaje derecha (sin tarjeta) */}
                  <div className="absolute left-1/2 -translate-x-1/2 text-center px-6" style={{ top: "49%" }}>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 max-w-xl">
                      {tr("create_help_right")}
                    </p>
                  </div>

                  {/* espacio libre para resultados */}
                  <div className="w-full h-full"></div>

                  {/* Buscador inferior */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mx-auto max-w-4xl rounded-full border
                                    border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900
                                    shadow-sm focus-within:ring-2 focus-within:ring-sky-400/40">
                      <div className="flex items-center gap-2 px-4 py-2">
                        <input
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder={tr("bottom_input_ph")}
                          className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-slate-400"
                          aria-label={tr("bottom_input_ph")}
                        />
                        <Button type="button" className="h-10 rounded-full px-4 shrink-0">
                          {tr("generate_with_prompt")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateTextPage;
