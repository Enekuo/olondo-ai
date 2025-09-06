import React from "react";
import { Link } from "react-router-dom";
import { Home, PlusCircle, Folder, CreditCard, HelpCircle, Settings, User, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher"; // ya existente en tu proyecto
import { useTheme } from "@/components/layout/ThemeProvider";       // mismo provider que usas en la Navbar

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* HEADER INTERNO (oscuro) */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-[1300px] h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo/Nombre */}
          <Link to="/" className="font-extrabold text-xl tracking-tight text-white">
            Olondo.ai
          </Link>

          {/* Centro vacío (reserva para buscador/mini-player) */}
          <div className="flex-1" />

          {/* Derecha: Idioma -> Tema -> Avatar */}
          <div className="flex items-center gap-3">
            {/* 1) Selector de idioma */}
            <LanguageSwitcher />

            {/* 2) Toggle claro/oscuro */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-white"
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* 3) Avatar/usuario */}
            <button
              className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white"
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* SIDEBAR (oscuro) */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2">
            <nav className="mt-6 rounded-2xl bg-slate-900 text-slate-100 p-2">
              <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <Home className="w-5 h-5" />
                <span>{t("dashboard_nav_home")}</span>
              </Link>

              {/* Crear nuevo ARRIBA */}
              <Link to="/create" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>{t("dashboard_nav_create")}</span>
              </Link>

              {/* Biblioteca DEBAJO */}
              <Link to="/library" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <Folder className="w-5 h-5" />
                <span>{t("dashboard_nav_library")}</span>
              </Link>

              <Link to="/pricing" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <CreditCard className="w-5 h-5" />
                <span>{t("dashboard_nav_plans")}</span>
              </Link>

              <Link to="/support" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>{t("dashboard_nav_support")}</span>
              </Link>

              <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors">
                <Settings className="w-5 h-5" />
                <span>{t("dashboard_nav_settings")}</span>
              </Link>
            </nav>
          </aside>

          {/* CONTENIDO PRINCIPAL (vacío como pediste) */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            <section className="py-8 md:py-10">
              {/* Dejado intencionalmente vacío */}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;