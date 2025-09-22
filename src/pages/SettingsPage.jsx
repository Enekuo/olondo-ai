import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings as SettingsIcon, User, Sun, Moon, Gem
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const Field = ({ label, children, hint }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>}
    {children}
    {hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
  </div>
);

const Section = ({ title, description, children }) => (
  <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6">
    <div className="mb-4">
      <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

const Row = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {children}
  </div>
);

const SettingsPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const HEADER_COLOR     = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR    = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR  = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR     = theme === "dark" ? "#1f2937" : "#e5e7eb";
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? "Plan Premium" : "Plan Básico";

  const isActive = (path) => location.pathname === path;

  const [profile, setProfile] = useState({ displayName: "", email: "" });
  const [notifications, setNotifications] = useState({ product: true, tips: true, billing: true });

  const saveAll = (e) => {
    e?.preventDefault?.();
    alert(t("settings_toast_saved") || "Configuración guardada.");
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
                  width: 30,
                  height: 30,
                  backgroundColor: "rgba(255,255,255,0.22)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)"
                }}
              >
                <Gem className="w-5 h-5 text-white/90" />
              </div>
              <div
                className="rounded-xl px-3 py-1.5 text-sm font-medium text-slate-100/90"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)"
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
                color: theme === "dark" ? "#ffffff" : "#1f2937"
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
                width: SIDEBAR_WIDTH_PX
              }}
            >
              <div className="h-full flex flex-col justify-between">
                <nav className="space-y-1">
                  <Link to="/app/dashboard"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/app/dashboard") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Home className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_home")}</span>
                  </Link>
                  <Link to="/create"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/create") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <PlusCircle className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_create")}</span>
                  </Link>
                  <Link to="/library"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/library") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <Folder className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_library")}</span>
                  </Link>
                  <Link to="/pricing"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/pricing") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <CreditCard className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_plans")}</span>
                  </Link>
                </nav>

                {/* CONFIGURACIÓN MÁS ABAJO */}
                <div className="pb-0">
                  <Link to="/settings"
                    className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive("/settings") ? ACTIVE_BG_COLOR : "transparent" }}
                  >
                    <SettingsIcon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_settings")}</span>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO AJUSTES */}
          <main>
            <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
              <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 py-8 md:py-12">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {t("settings_title") || "Ajustes"}
                  </h1>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    {t("settings_subtitle") || "Personaliza tu experiencia en Olondo.AI."}
                  </p>
                </div>

                <form onSubmit={saveAll} className="space-y-6 md:space-y-8">
                  <Section
                    title={t("settings_profile_title") || "Perfil"}
                    description={t("settings_profile_desc") || "Información básica de tu cuenta."}
                  >
                    <Row>
                      <Field label={t("settings_profile_display_name") || "Nombre visible"}>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                          value={profile.displayName}
                          onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                          placeholder="Ej. Eneko"
                        />
                      </Field>
                      <Field label={t("settings_profile_email") || "Email"}>
                        <input
                          type="email"
                          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          placeholder="nombre@ejemplo.com"
                        />
                      </Field>
                    </Row>
                  </Section>

                  <Section
                    title={t("settings_notifications_title") || "Notificaciones"}
                    description={t("settings_notifications_desc") || "Elige qué correos recibir."}
                  >
                    <div className="space-y-3">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-sky-600"
                          checked={notifications.product}
                          onChange={(e) => setNotifications({ ...notifications, product: e.target.checked })}
                        />
                        <div>
                          <div className="text-sm font-medium">{t("settings_notifications_product") || "Novedades de producto"}</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-sky-600"
                          checked={notifications.tips}
                          onChange={(e) => setNotifications({ ...notifications, tips: e.target.checked })}
                        />
                        <div>
                          <div className="text-sm font-medium">{t("settings_notifications_tips") || "Consejos y buenas prácticas"}</div>
                        </div>
                      </label>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 accent-sky-600"
                          checked={notifications.billing}
                          onChange={(e) => setNotifications({ ...notifications, billing: e.target.checked })}
                        />
                        <div>
                          <div className="text-sm font-medium">{t("settings_notifications_billing") || "Facturación"}</div>
                        </div>
                      </label>
                    </div>
                  </Section>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium"
                    >
                      {t("settings_cta_save") || "Guardar cambios"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;