import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem,
  BookOpen, Upload, Clipboard, Link2, Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const CreateSummaryPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const [inputText, setInputText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [files, setFiles] = useState([]); // <-- JS puro

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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in:      { opacity: 1, y: 0 },
    out:     { opacity: 0, y: -20 },
  };

  const handleFiles = (e) => setFiles(Array.from(e.target?.files || []));
  const clearAll = () => { setInputText(""); setSourceUrl(""); setFiles([]); };

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

      {/* LAYOUT */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          {/* SIDEBAR */}
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

          {/* CONTENIDO */}
          <main>
            <motion.section
              className="py-20 md:py-24 px-4 md:px-8 flex flex-col items-center 
                         bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 
                         dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 
                         rounded-b-2xl max-w-6xl mx-auto mb-10 md:mb-16"
              initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.5 }}
            >
              {/* Title */}
              <div className="text-center mb-10">
                <h1 className="flex items-center justify-center text-3xl md:text-5xl font-extrabold gap-3 text-slate-900 dark:text-white mb-3">
                  <BookOpen className="h-8 w-8 text-purple-500" /> {t("create_summary_title", "Crear Resumen (Premium)")}
                </h1>
                <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 max-w-xl mx-auto">
                  {t("create_summary_sub", "Sube archivos o pega texto para obtener resúmenes concisos y claros.")}
                </p>
              </div>

              {/* Card */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-6 shadow-[0_8px_25px_-10px_rgba(2,6,23,0.15)]">
                  {/* Pegar texto */}
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    <Clipboard className="inline w-4 h-4 mr-2" />
                    {t("paste_text", "Pegar texto")}
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400"
                    placeholder={t("paste_text_ph", "Pega aquí el contenido a resumir...")}
                  />

                  {/* URL */}
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mt-6 mb-2">
                    <Link2 className="inline w-4 h-4 mr-2" />
                    {t("source_url", "URL de referencia (opcional)")}
                  </label>
                  <input
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400"
                    placeholder="https://..."
                  />

                  {/* Archivos */}
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mt-6 mb-2">
                    <Upload className="inline w-4 h-4 mr-2" />
                    {t("attach_files", "Adjuntar archivos")}
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 dark:file:bg-slate-700 dark:file:text-slate-200"
                    multiple
                    onChange={handleFiles}
                  />
                  {files.length > 0 && (
                    <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      {files.length} {t("files_selected", "archivo(s) seleccionado(s)")}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-6 shadow-[0_8px_25px_-10px_rgba(2,6,23,0.15)] flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">{t("summary_prefs", "Preferencias rápidas de resumen")}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {t("summary_prefs_sub", "Longitud, enfoque y tono puedes afinarlos cuando integres la API.")}
                    </p>
                  </div>

                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button className="h-11 font-semibold bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600">
                      ✨ {t("generate_summary", "Generar resumen")}
                    </Button>
                    <Button variant="secondary" className="h-11 font-semibold" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-2" /> {t("clear", "Limpiar")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateSummaryPage;