import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem, FileText, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const CreateNewPage = () => {
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

  // Animaciones zona central
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    in: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15 + 0.3, type: "spring", stiffness: 100 },
    }),
  };

  const options = [
    {
      titleKey: "freeTrialCreateTextButton",
      defaultTitle: "Crear Texto",
      descriptionKey: "freeTrialCreateTextDescription",
      defaultDescription: "Genera contenido original a partir de tus ideas o documentos.",
      icon: <FileText className="h-10 w-10 mb-4 text-blue-500" />,
      to: "/create-text",
      gradient: "from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600",
    },
    {
      titleKey: "freeTrialCreateSummaryButton",
      defaultTitle: "Crear Resumen",
      descriptionKey: "freeTrialCreateSummaryDescription",
      defaultDescription: "Obtén resúmenes concisos de textos largos o archivos.",
      icon: <BookOpen className="h-10 w-10 mb-4 text-purple-500" />,
      to: "/create-summary",
      gradient: "from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600",
    },
  ];

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
                color: theme === "dark" ? "#ffffff" : "#1f2937",
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
                color: theme === "dark" ? "#ffffff" : "#1f2937",
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
          {/* SIDEBAR */}
          <aside className="border-r border-slate-200 dark:border-slate-800" style={{ borderColor: BORDER_COLOR }}>
            <div
              className="sticky ps-2 pe-3 pt-6 pb-0 text-slate-800 dark:text-slate-100"
              style={{
                backgroundColor: SIDEBAR_COLOR,
                top: HEADER_HEIGHT_PX,
                height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
                width: SIDEBAR_WIDTH_PX,
              }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link
                    to="/app/dashboard"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>

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
                </nav>

                <div className="pb-0">
                  <Link
                    to="/settings"
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

          {/* CONTENIDO CENTRAL */}
          <main>
            <section className="py-8 md:py-10 px-4 md:px-8">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.5 }}
                className="rounded-2xl p-6 md:p-10 bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-sky-900"
              >
                {/* Título y subtítulo */}
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
                >
                  <Gem className="h-14 w-14 text-blue-500 mx-auto mb-3" />
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                    {t("plan_premium", "Plan Premium")}
                  </h1>
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    {t("freeTrialPageSubtitle", "Explora el poder de Olondo AI. Elige una opción para empezar:")}
                  </p>
                </motion.div>

                {/* Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {options.map((opt, index) => (
                    <motion.div
                      key={opt.defaultTitle}
                      custom={index}
                      variants={cardVariants}
                      initial="initial"
                      animate="in"
                      className="bg-white dark:bg-slate-800/70 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-transparent hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
                    >
                      {opt.icon}
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
                        {t(opt.titleKey, opt.defaultTitle)}
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                        {t(opt.descriptionKey, opt.defaultDescription)}
                      </p>
                      <Link to={opt.to} className="w-full">
                        <Button
                          size="lg"
                          className={`w-full text-base font-semibold bg-gradient-to-r ${opt.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg`}
                        >
                          {t("freeTrialSelectOption", "Seleccionar Opción")}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;