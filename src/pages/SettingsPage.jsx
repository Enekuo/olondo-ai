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
    alert(t("settings.toast_saved") || "Configuración guardada.");
  };

  return (
    <main className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 py-8 md:py-12">
        {/* Encabezado simple de página */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t("settings.title") || "Ajustes"}
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {t("settings.subtitle") || "Personaliza tu experiencia en Olondo.AI."}
          </p>
        </div>

        <form onSubmit={saveAll} className="space-y-6 md:space-y-8">
          {/* Perfil */}
          <Section
            title={t("settings.profile.title") || "Perfil"}
            description={t("settings.profile.desc") || "Información básica para identificar tu cuenta."}
          >
            <Row>
              <Field label={t("settings.profile.display_name") || "Nombre visible"}>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  placeholder={t("settings.profile.display_name_ph") || "Ej. Eneko"}
                />
              </Field>
              <Field label={t("settings.profile.email") || "Email"}>
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
                {t("settings.profile.security_hint") || "La edición de contraseña se gestiona desde tu área segura."}
              </div>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {t("settings.cta.manage_plan") || "Gestionar plan"}
              </Link>
            </div>
          </Section>

          {/* Apariencia */}
          <Section
            title={t("settings.appearance.title") || "Apariencia"}
            description={t("settings.appearance.desc") || "Elige cómo se ve la interfaz."}
          >
            <Row>
              <Field label={t("settings.appearance.theme") || "Tema"}>
                <select
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="system">{t("settings.appearance.system") || "Sistema"}</option>
                  <option value="light">{t("settings.appearance.light") || "Claro"}</option>
                  <option value="dark">{t("settings.appearance.dark") || "Oscuro"}</option>
                </select>
              </Field>

              <Field
                label={t("settings.appearance.language") || "Idioma"}
                hint={t("settings.appearance.language_hint") || "Cambia el idioma desde aquí."}
              >
                {/* Reutilizamos tu conmutador de idioma existente para no duplicar lógica */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-2">
                  <LanguageSwitcher />
                </div>
              </Field>
            </Row>
          </Section>

          {/* Audio por defecto (coherente con Olondo.AI, voz tipo podcast) */}
          <Section
            title={t("settings.audio.title") || "Audio por defecto"}
            description={t("settings.audio.desc") || "Configura la reproducción y la voz para tus escuchas."}
          >
            <Row>
              <Field label={t("settings.audio.voice") || "Voz"}>
                <select
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  value={audio.voice}
                  onChange={(e) => setAudio({ ...audio, voice: e.target.value })}
                >
                  <option value="olondo_standard_female">{t("settings.audio.voice_female") || "Olondo Femenina"}</option>
                  <option value="olondo_standard_male">{t("settings.audio.voice_male") || "Olondo Masculina"}</option>
                  <option value="olondo_podcast_pro">{t("settings.audio.voice_podcast") || "Podcast Pro"}</option>
                </select>
              </Field>

              <Field label={t("settings.audio.rate") || "Velocidad (x)"}
                     hint={t("settings.audio.rate_hint") || "0.5–1.5"}>
                <input
                  type="range"
                  min={0.5}
                  max={1.5}
                  step={0.05}
                  value={audio.rate}
                  onChange={(e) => setAudio({ ...audio, rate: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm mt-1">{audio.rate.toFixed(2)}×</div>
              </Field>
            </Row>

            <Row>
              <Field label={t("settings.audio.pitch") || "Tono"}
                     hint={t("settings.audio.pitch_hint") || "-6 a +6"}>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={1}
                  value={audio.pitch}
                  onChange={(e) => setAudio({ ...audio, pitch: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm mt-1">{audio.pitch > 0 ? `+${audio.pitch}` : audio.pitch}</div>
              </Field>

              <div className="flex flex-col justify-end gap-3">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-sky-600"
                    checked={audio.autoplayNext}
                    onChange={(e) => setAudio({ ...audio, autoplayNext: e.target.checked })}
                  />
                  <span className="text-sm">{t("settings.audio.autoplay_next") || "Reproducir el siguiente automáticamente"}</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-sky-600"
                    checked={audio.autoNormalize}
                    onChange={(e) => setAudio({ ...audio, autoNormalize: e.target.checked })}
                  />
                  <span className="text-sm">{t("settings.audio.normalize") || "Normalizar volumen automáticamente"}</span>
                </label>
              </div>
            </Row>
          </Section>

          {/* Notificaciones */}
          <Section
            title={t("settings.notifications.title") || "Notificaciones"}
            description={t("settings.notifications.desc") || "Elige qué correos o avisos quieres recibir."}
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
                  <div className="text-sm font-medium">{t("settings.notifications.product") || "Novedades de producto"}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings.notifications.product_hint") || "Lanzamientos, mejoras y anuncios importantes."}
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
                  <div className="text-sm font-medium">{t("settings.notifications.tips") || "Consejos y buenas prácticas"}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings.notifications.tips_hint") || "Emails breves para aprovechar mejor Olondo.AI."}
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
                  <div className="text-sm font-medium">{t("settings.notifications.billing") || "Facturación"}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings.notifications.billing_hint") || "Recibos, cambios de plan y recordatorios de pago."}
                  </p>
                </div>
              </label>
            </div>
          </Section>

          {/* Acciones */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t("settings.footer_hint") || "Estos cambios afectan solo a tu experiencia de usuario."}
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                {t("settings.cta.view_plans") || "Ver planes"}
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {t("settings.cta.save") || "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsPage;