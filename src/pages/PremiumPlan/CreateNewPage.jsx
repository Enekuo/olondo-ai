import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem, FileText, BookOpen
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CreateNewPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const HEADER_COLOR = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR = theme === "dark" ? "#1f2937" : "#e5e7eb";

  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? t("plan_premium_title") : t("plan_basic_title");

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

  // Animaciones
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15 + 0.3, type: "spring", stiffness: 100 },
    }),
  };

  // Opciones (solo claves)
  const options = [
    {
      titleKey: "freeTrialCreateTextButton",
      descriptionKey: "freeTrialCreateTextDescription",
      icon: <FileText className="h-10 w-10 mb-4 text-blue-500" />,
      to: "/create/text",
      gradient: "from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600",
      ctaKey: "freeTrialCreateTextButton", // reutilizamos la misma clave del botón
    },
    {
      titleKey: "freeTrialCreateSummaryButton",
      descriptionKey: "freeTrialCreateSummaryDescription",
      icon: <BookOpen className="h-10 w-10 mb-4 text-purple-500" />,
      to: "/create/summary",
      gradient: "from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600",
      ctaKey: "freeTrialCreateSummaryButton",
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
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">Olondo.ai</Link>

          {/* Controles */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 select-none">
              <div className="inline-flex items-center justify-center rounded-[10px]" style={{ width: 30, height: 30, ...planIconBoxStyle }}>
                <Gem className="w-5 h-5" style={{ color: planIconColor }} />
              </div>
              <div className="rounded-xl px-3 py-1.5 text-sm font-medium" style={planPillStyle}>{planLabel}</div>
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
              className="py-16 md:py-20 px-4 md:px-8 flex flex-col items-center 
                         bg-gradient-to-br from-slate-100 via-sky-50 to-blue-100 
                         dark:from-slate-900 dark:via-slate-800 dark:to-sky-900 
                         rounded-b-2xl max-w-6xl mx-auto mb-10 md:mb-16"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              {/* TÍTULO */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
              >
                <h1 className="flex items-center justify-center text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 gap-3">
                  <Gem className="h-9 w-9 text-blue-500" /> {planLabel}
                </h1>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {t("create_new_intro")}
                </p>
              </motion.div>

              {/* TARJETAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
                {options.map((opt, index) => (
                  <motion.div
                    key={opt.titleKey}
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="in"
                    className="bg-white dark:bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl 
                               border border-slate-100 dark:border-slate-700/60
                               shadow-[0_8px_25px_-10px_rgba(2,6,23,0.15)]
                               hover:shadow-[0_24px_60px_-20px_rgba(2,6,23,0.35)]
                               hover:ring-1 hover:ring-slate-200 dark:hover:ring-slate-700
                               transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.01]
                               flex flex-col justify-between h-full text-center"
                  >
                    <div className="flex flex-col items-center">
                      {opt.icon}
                      <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
                        {t(opt.titleKey)}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm md:text-[15px]">
                        {t(opt.descriptionKey)}
                      </p>
                    </div>

                    <Link to={opt.to} className="w-full mt-auto">
                      <Button
                        size="lg"
                        className={`w-full text-base font-semibold bg-gradient-to-r ${opt.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-lg`}
                      >
                        {t(opt.ctaKey)}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;