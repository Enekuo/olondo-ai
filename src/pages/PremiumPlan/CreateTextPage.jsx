import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem,
  Upload, Plus, Compass, FileText, Send, Paperclip
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const CreateTextPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [sources, setSources] = useState([]); // {id, name, type}
  const [prompt, setPrompt] = useState("");

  const HEADER_COLOR    = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR   = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR    = theme === "dark" ? "#1f2937" : "#e5e7eb";

  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? t("plan_premium_title") : t("plan_basic_title");
  const isActive  = (path) => location.pathname === path;

  const planPillStyle =
    theme === "dark"
      ? { backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)", color: "#E5E7EB" }
      : { backgroundColor: "#f3f4f6", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12)", color: "#0f172a" };

  const planIconBoxStyle =
    theme === "dark"
      ? { backgroundColor: "rgba(255,255,255,0.22)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)" }
      : { backgroundColor: "#ffffff", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)" };

  const planIconColor = theme === "dark" ? "#ffffff" : "#334155";

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in:      { opacity: 1, y: 0 },
    out:     { opacity: 0, y: -20 },
  };

  // Mock handlers
  const onAddSource = (files) => {
    const arr = Array.from(files || []).map((f, idx) => ({
      id: `${Date.now()}-${idx}`, name: f.name, type: f.type || "file",
    }));
    if (arr.length) setSources((s) => [...s, ...arr]);
  };
  const onAddDemo = () => {
    setSources((s) => [...s, { id: `${Date.now()}`, name: "demo.pdf", type: "application/pdf" }]);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800"
        style={{ backgroundColor: HEADER_COLOR, height: HEADER_HEIGHT_PX, borderColor: BORDER_COLOR }}
      >
        <div className="w-full h-full px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">Olondo.ai</Link>

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
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 transition-colors"
              style={{ backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff", border: theme === "dark" ? "none" : "1px solid #e5e7eb", color: theme === "dark" ? "#ffffff" : "#1f2937" }}
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* APP LAYOUT (Sidebar izquierda + Main) */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          {/* SIDEBAR APP */}
          <aside className="border-r border-slate-200 dark:border-slate-800" style={{ borderColor: BORDER_COLOR }}>
            <div
              className="sticky ps-2 pe-3 pt-6 pb-0 text-slate-800 dark:text-slate-100"
              style={{ backgroundColor: SIDEBAR_COLOR, top: HEADER_HEIGHT_PX, height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`, width: SIDEBAR_WIDTH_PX }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link to="/app/dashboard" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>
                  <Link to="/create" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/create") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>
                  <Link to="/library" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/library") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>
                  <Link to="/pricing" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/pricing") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>
                <div className="pb-0">
                  <Link to="/settings" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/settings") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="px-0">
            {/* Barra superior del documento */}
            <div className="px-6 pt-6 pb-4">
              <h1 className="flex items-center gap-3 text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                <FileText className="h-8 w-8 text-blue-500" />
                {t("create_text_title", "Crear Texto (Premium)")}
              </h1>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                {t("create_text_sub", "Escribe, pega contenido o añade fuentes para generar texto de alta calidad.")}
              </p>
            </div>

            {/* Doble panel: Fuentes + Chat */}
            <motion.section
              className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-0 h-[calc(100vh-210px)] max-h-[calc(100vh-210px)]"
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.45 }}
            >
              {/* Panel Fuentes (izquierda) */}
              <aside className="border-t border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col">
                {/* Botones arriba */}
                <div className="p-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
                  <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 cursor-pointer hover:opacity-90">
                    <Plus className="w-4 h-4" />
                    {t("sources_add", "Añadir")}
                    <input type="file" className="hidden" multiple onChange={(e) => onAddSource(e.target.files)} />
                  </label>
                  <button
                    onClick={onAddDemo}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:opacity-90"
                  >
                    <Compass className="w-4 h-4" />
                    {t("sources_discover", "Descubrir")}
                  </button>
                </div>

                {/* Lista fuentes */}
                <div className="flex-1 overflow-auto p-4">
                  {sources.length === 0 ? (
                    <div className="h-full w-full flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
                      <Paperclip className="w-10 h-10 mb-3" />
                      <p className="font-medium">{t("sources_empty_title", "Aquí aparecerán tus fuentes guardadas")}</p>
                      <p className="text-sm mt-1 max-w-[260px]">
                        {t("sources_empty_help", "Pulsa “Añadir” para subir PDFs, webs, textos, vídeos o audios.")}
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {sources.map((s) => (
                        <li key={s.id} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4" />
                            <span className="text-sm">{s.name}</span>
                          </div>
                          <span className="text-xs text-slate-500">{s.type?.split("/")[1] || "file"}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>

              {/* Panel Chat (derecha) */}
              <section className="relative border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30">
                {/* CTA central cuando no hay fuentes */}
                {sources.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <Upload className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                        {t("chat_add_source", "Añade una fuente para comenzar")}
                      </h3>
                      <label className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        {t("upload_source_btn", "Subir una fuente")}
                        <input type="file" className="hidden" multiple onChange={(e) => onAddSource(e.target.files)} />
                      </label>
                    </div>
                  </div>
                )}

                {/* Barra inferior (input) */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="mx-auto max-w-3xl flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2">
                    <input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={t("bottom_input_ph", "Escribe un mensaje o sube una fuente para empezar")}
                      className="flex-1 bg-transparent outline-none text-sm md:text-base"
                    />
                    <div className="text-xs text-slate-500 mr-2">
                      {sources.length} {t("sources_count", "fuentes")}
                    </div>
                    <Button className="h-9 px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </section>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateTextPage;