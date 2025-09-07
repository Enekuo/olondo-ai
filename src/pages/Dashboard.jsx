import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Dashboard = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Colores EXACTOS que vamos a usar
  const NAVY_HEADER = "#111a2b"; // header (ya te funciona bien)
  const NAVY_SIDEBAR = "#3f495b"; // tono más claro del sidebar (como en el mock)
  const ACTIVE_BG = NAVY_HEADER;  // al pulsar/activo, misma oscuridad que el header
  const ITEM_HOVER = "rgba(17, 26, 43, 0.55)"; // hover suave (mismo tono que header con opacidad)

  // Utilidad para marcar activo según ruta
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <header
        className="sticky top-0 z-40 w-full border-b border-slate-800"
        style={{ backgroundColor: NAVY_HEADER }}
      >
        <div className="w-full h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo en azul en el header */}
          <Link to="/" className="font-extrabold text-lg tracking-tight text-sky-400">
            Olondo.ai
          </Link>

          {/* Controles a la derecha */}
          <div className="flex items-center gap-3">
            {/* LanguageSwitcher sin zona blanca */}
            <div className="rounded-xl p-1 ring-1 ring-slate-600/20" style={{ backgroundColor: NAVY_HEADER }}>
              <LanguageSwitcher className="!bg-transparent !text-white !border-0 !shadow-none !ring-0 !p-0 !m-0" />
            </div>

            {/* Toggle claro/oscuro */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:opacity-90 text-white transition-colors"
              style={{ backgroundColor: "#1f2937" }}
              aria-label={t("theme_toggle")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:opacity-90 text-white transition-colors"
              style={{ backgroundColor: "#1f2937" }}
              aria-label={t("user_menu")}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* LAYOUT */}
      <div className="w-full px-0">
        <div className="grid grid-cols-12 gap-0">
          {/* SIDEBAR (mismo contraste/dimensiones que el mock) */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-slate-800">
            <div
              className="sticky top-16 h-[calc(100vh-64px)] text-slate-100 px-5 py-6"
              style={{ backgroundColor: NAVY_SIDEBAR }}
            >
              <nav className="space-y-1">
                <Link
                  to="/app/dashboard"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/app/dashboard")) e.currentTarget.style.backgroundColor = ITEM_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/app/dashboard")) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Home className="w-5 h-5" />
                  <span>{t("dashboard_nav_home")}</span>
                </Link>

                <Link
                  to="/create"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: isActive("/create") ? ACTIVE_BG : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/create")) e.currentTarget.style.backgroundColor = ITEM_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/create")) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>{t("dashboard_nav_create")}</span>
                </Link>

                <Link
                  to="/library"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: isActive("/library") ? ACTIVE_BG : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/library")) e.currentTarget.style.backgroundColor = ITEM_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/library")) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Folder className="w-5 h-5" />
                  <span>{t("dashboard_nav_library")}</span>
                </Link>

                <Link
                  to="/pricing"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: isActive("/pricing") ? ACTIVE_BG : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/pricing")) e.currentTarget.style.backgroundColor = ITEM_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/pricing")) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{t("dashboard_nav_plans")}</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 h-11 px-3 rounded-xl transition-colors"
                  style={{
                    backgroundColor: isActive("/settings") ? ACTIVE_BG : "transparent"
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/settings")) e.currentTarget.style.backgroundColor = ITEM_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/settings")) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <Settings className="w-5 h-5" />
                  <span>{t("dashboard_nav_settings")}</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            <section className="py-8 md:py-10">{/* vacío */}</section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;