import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon,
  FileText, Send, MessageSquare, SlidersHorizontal,
  Image as ImageIcon, Clipboard, File as FileIcon, Link as LinkIcon
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

  // Helper para evitar claves crudas si falta una traducción
  const tr = (key, fallback) => {
    const val = t(key);
    return !val || val === key ? fallback : val;
  };

  // Estado
  const [sources, setSources] = useState([]); // { id, type: 'file'|'url'|'text'|'image', name, meta }
  const [chatInput, setChatInput] = useState("");
  const [urlDraft, setUrlDraft] = useState("");
  const [sourceMode, setSourceMode] = useState("text"); // 'text' | 'document' | 'image'
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Estilos base
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

  const labelSources = tr("sources_title", "Fuentes");
  const labelChat    = tr("chat_panel_title", "Chat");

  const onFiles = (e, forcedType = null) => {
    const files = Array.from(e.target?.files || []);
    if (!files.length) return;
    const mapped = files.map((f, idx) => ({
      id: `${Date.now()}_${idx}`,
      type: forcedType || "file",
      name: f.name,
      meta: { size: f.size }
    }));
    setSources((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  const addUrl = () => {
    if (!urlDraft.trim()) return;
    setSources((prev) => [
      ...prev,
      { id: `${Date.now()}_url`, type: "url", name: urlDraft.trim(), meta: {} },
    ]);
    setUrlDraft("");
  };

  const sendChat = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    setChatInput("");
  };

  /* ===== Pestañas iguales (3 columnas) ===== */
  const BLUE = "#2563eb";
  const GRAY_TEXT = "#6b7280";
  const GRAY_ICON = "#9ca3af";
  const DIVIDER = "#e5e7eb";

  const TabBtn = ({ active, icon: Icon, label, onClick, showDivider }) => (
    <div className="relative flex-1 min-w-0 flex items-stretch">
      <button
        type="button"
        onClick={onClick}
        className="relative inline-flex w-full items-center gap-2 h-[44px] px-3 text-[14px] font-medium justify-start"
        style={{ color: active ? BLUE : GRAY_TEXT }}
      >
        <Icon className="w-[18px] h-[18px] shrink-0" style={{ color: active ? BLUE : GRAY_ICON }} />
        <span className="truncate">{label}</span>
        {active && (
          <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: BLUE }} />
        )}
      </button>
      {showDivider && (
        <span aria-hidden className="self-center" style={{ width: 1, height: 22, backgroundColor: DIVIDER }} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX, borderColor: BORDER_COLOR }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between relative">
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">Olondo.ai</Link>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <div className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              <FileText className="w-5 h-5 relative -top-px" style={{ color: BLUE }} />
              <span>{tr("create_text_title", "Crear Texto")}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:opacity-90 transition-colors"
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={tr("theme_toggle", "Cambiar tema")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={tr("user_menu", "Usuario")}
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
                    <span className="truncate">{tr("dashboard_nav_home", "Home")}</span>
                  </Link>
                  <Link to="/create" className={navClasses()} style={isCurrentOrChild("/create") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined} aria-current={isCurrentOrChild("/create") ? "page" : undefined}>
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_create", "Crear nuevo")}</span>
                  </Link>
                  <Link to="/library" className={navClasses()} style={isCurrentOrChild("/library") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_library", "Biblioteca")}</span>
                  </Link>
                  <Link to="/assistant" className={navClasses()} style={isCurrentOrChild("/assistant") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_ai_chat", "Chat con IA")}</span>
                  </Link>
                  <Link to="/pricing" className={navClasses()} style={isCurrentOrChild("/pricing") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_plans", "Planes")}</span>
                  </Link>
                </nav>

                <div className="pb-0">
                  <Link to="/settings" className={navClasses()} style={isCurrentOrChild("/settings") ? { backgroundColor: ACTIVE_BG_COLOR } : undefined}>
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{tr("dashboard_nav_settings", "Configuración")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="min-h-[calc(100vh-72px)]">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-4">
              <motion.section
                className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6"
                initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.35 }}
                style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT_PX + 32}px)` }}
              >
                {/* Panel Fuentes */}
                <aside className="h-full rounded-2xl bg-white dark:bg-slate-900/50 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm overflow-hidden flex flex-col">
                  {/* Título */}
                  <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{labelSources}</div>
                  </div>

                  {/* Pestañas */}
                  <div className="flex items-center px-2 border-b" style={{ borderColor: DIVIDER }}>
                    <TabBtn active={sourceMode === "text"} icon={FileText} label={tr("sources_tab_text", "Pegar texto")} onClick={() => setSourceMode("text")} showDivider />
                    <TabBtn active={sourceMode === "document"} icon={FileIcon} label={tr("sources_tab_document", "Documento")} onClick={() => setSourceMode("document")} showDivider />
                    <TabBtn active={sourceMode === "image"} icon={ImageIcon} label={tr("sources_tab_image", "Subir imagen")} onClick={() => setSourceMode("image")} showDivider={false} />
                  </div>

                  {/* Ayuda central EXACTA (2 items, icono arriba + texto debajo) */}
                  <div className="flex-1 overflow-y-auto px-4 pb-6">
                    {sources.length === 0 && (
                      <div className="h-full w-full flex items-center justify-center select-none">
                        <div className="flex items-start justify-center gap-16">
                          {/* Añadir URL */}
                          <div className="flex flex-col items-center text-center">
                            <span className="relative w-8 h-8 flex items-center justify-center" style={{ color: GRAY_ICON }}>
                              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs leading-none" style={{ color: GRAY_ICON }}>+</span>
                              <LinkIcon className="w-6 h-6" />
                            </span>
                            <span className="mt-2 text-[15px] font-medium" style={{ color: GRAY_TEXT }}>
                              {tr("sources_center_url", "Añadir URL")}
                            </span>
                          </div>

                          {/* divisor */}
                          <span aria-hidden className="h-10 w-px self-center" style={{ backgroundColor: DIVIDER }} />

                          {/* Pegar texto */}
                          <div className="flex flex-col items-center text-center">
                            <span className="w-8 h-8 flex items-center justify-center" style={{ color: GRAY_ICON }}>
                              <Clipboard className="w-6 h-6" />
                            </span>
                            <span className="mt-2 text-[15px] font-medium" style={{ color: GRAY_TEXT }}>
                              {tr("sources_center_text", "Pegar texto")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buscador inferior */}
                  <div className="border-t border-slate-200 dark:border-slate-800 p-3 bg-slate-50/60 dark:bg-slate-900/40">
                    <div className="flex">
                      <input
                        value={urlDraft}
                        onChange={(e) => setUrlDraft(e.target.value)}
                        className="h-10 flex-1 rounded-l-xl border border-slate-200 dark:border-slate-700
                                   bg-white/90 dark:bg-slate-900/60 px-3 text-sm outline-none
                                   focus:ring-2 focus:ring-sky-400"
                        placeholder={tr("enter_text_here", "Introduce tu texto aquí...")}
                      />
                      <Button onClick={addUrl} className="h-10 px-4 rounded-r-xl bg-sky-600 hover:bg-sky-700 text-white shadow-sm">
                        +
                      </Button>
                    </div>
                  </div>
                </aside>

                {/* Panel Chat */}
                <section className="h-full relative rounded-2xl bg-white dark:bg-slate-900/50 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm overflow-hidden -ml-px">
                  <div className="h-11 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{labelChat}</div>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition" title={tr("settings", "Ajustes")}>
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={sendChat} className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mx-auto max-w-4xl flex items-center gap-2 rounded-full border
                                    border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900
                                    px-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-sky-400/40">
                      <input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={tr("bottom_input_ph", "Escribe un mensaje o sube una fuente para empezar")}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-slate-400"
                        disabled={sources.length === 0}
                      />
                      <div className="text-xs text-slate-500 mr-2">
                        {sources.length} {tr("sources_count", "fuentes")}
                      </div>
                      <Button type="submit" disabled={!chatInput.trim() || sources.length === 0} className="h-10 px-3 rounded-full" title={tr("send", "Enviar")}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
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