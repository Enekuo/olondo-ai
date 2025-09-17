import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";
// Opcionalmente, si usas Lucide en otros sitios: import { Save, Volume2, Bell, Palette, User, Globe } from "lucide-react";

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

  // Estado local (simulado)
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
  });

  const [audio, setAudio] = useState({
    voice: "olondo_standard_female",
    rate: 1.0,      // 0.5 - 1.5
    pitch: 0,       // -6 - +6 (semitonos aprox. visual)
    autoplayNext: true,
    autoNormalize: true,
  });

  const [notifications, setNotifications] = useState({
    product: true,
    tips: true,
    billing: true,
  });

  const saveAll = (e) => {
    e?.preventDefault?.();
    // Aquí integrarías tu persistencia real (API o local)
    alert(t("settings_toast_saved") || "Configuración guardada.");
  };

  return (
    <main className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 py-8 md:py-12">
        {/* Encabezado simple de página */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t("settings_title") || "Ajustes"}
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {t("settings_subtitle") || "Personaliza tu experiencia en Olondo.AI."}
          </p>
        </div>

        <form onSubmit={saveAll} className="space-y-6 md:space-y-8">
          {/* Perfil */}
          <Section
            title={t("settings_profile_title") || "Perfil"}
            description={t("settings_profile_desc") || "Información básica para identificar tu cuenta."}
          >
            <Row>
              <Field label={t("settings_profile_display_name") || "Nombre visible"}>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder={t("settings_profile_display_name_ph") || "Ej. Eneko"}
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

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t("settings_profile_security_hint") || "La edición de contraseña se gestiona desde tu área segura."}
              </div>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {t("settings_cta_manage_plan") || "Gestionar plan"}
              </Link>
            </div>
          </Section>

          {/* Apariencia */}
          <Section
            title={t("settings_appearance_title") || "Apariencia"}
            description={t("settings_appearance_desc") || "Elige cómo se ve la interfaz."}
          >
            <Row>
              <Field label={t("settings_appearance_theme") || "Tema"}>
                <select
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="system">{t("settings_appearance_system") || "Sistema"}</option>
                  <option value="light">{t("settings_appearance_light") || "Claro"}</option>
                  <option value="dark">{t("settings_appearance_dark") || "Oscuro"}</option>
                </select>
              </Field>

              <Field
                label={t("settings_appearance_language") || "Idioma"}
                hint={t("settings_appearance_language_hint") || "Cambia el idioma desde aquí."}
              >
                {/* Reutilizamos tu conmutador de idioma existente para no duplicar lógica */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2">
                  <LanguageSwitcher />
                </div>
              </Field>
            </Row>
          </Section>

          {/* Notificaciones */}
          <Section
            title={t("settings_notifications_title") || "Notificaciones"}
            description={t("settings_notifications_desc") || "Elige qué correos o avisos quieres recibir."}
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings_notifications_product_hint") || "Lanzamientos, mejoras y anuncios importantes."}
                  </p>
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings_notifications_tips_hint") || "Emails breves para aprovechar mejor Olondo.AI."}
                  </p>
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
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings_notifications_billing_hint") || "Recibos, cambios de plan y recordatorios de pago."}
                  </p>
                </div>
              </label>
            </div>
          </Section>

          {/* Acciones */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t("settings_footer_hint") || "Estos cambios afectan solo a tu experiencia de usuario."}
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {t("settings_cta_view_plans") || "Ver planes"}
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {t("settings_cta_save") || "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsPage;