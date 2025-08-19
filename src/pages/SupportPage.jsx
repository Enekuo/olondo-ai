import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const SupportPage = () => {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honey: "", // honeypot
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.honey) return; // bot
    const to = "support@olondo.ai";
    const subject = encodeURIComponent(`[Olondo.AI] ${form.subject || t("support_form_subject_placeholder")}`);
    const body = encodeURIComponent(
      `${t("support_form_name_label")}: ${form.name}\n${t("support_form_email_label")}: ${form.email}\n\n${t("support_form_message_label")}:\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#F6FAFF] to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">

        {/* HERO: Contáctanos (nuevo bloque) */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-[#F7F8FC] px-6 sm:px-10 py-10 sm:py-14">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.05] text-slate-900">
                {t("contact_hero_title", "Contáctanos")}
              </h1>
              <p className="mt-4 max-w-3xl text-lg sm:text-xl text-slate-600">
                {t("contact_hero_subtitle", "¿Necesitas ayuda? Escríbenos a través del formulario, nuestro equipo está aquí para ayudarte.")}
              </p>
            </div>

            {/* Globo + placeholder de ilustración (oculto en móvil) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                {t("contact_hero_bubble", "Contáctanos")}
              </div>
              <div className="h-14 w-14 rounded-2xl bg-orange-500/10 ring-1 ring-orange-200" />
            </div>
          </div>
        </section>

        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* Left: heading + mascot */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-blue-600 mb-3">
              {t("support_kicker")}
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
              {t("support_title")}
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              {t("support_subtitle")}
            </p>

            {/* Simple mascot block (puedes cambiar por tu imagen) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="h-20 w-20 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                {/* Icono/mascota minimalista */}
                <div className="h-10 w-10 rounded-xl bg-slate-900" />
              </div>
              <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
                <span className="text-sm text-slate-700">{t("support_bubble_text")}</span>
              </div>
            </motion.div>
          </div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
          >
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("support_form_name_label")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder={t("support_form_name_placeholder")}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("support_form_email_label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="email@ejemplo.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("support_form_subject_label")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder={t("support_form_subject_placeholder")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("support_form_message_label")}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder={t("support_form_message_placeholder")}
                  required
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="h-11 rounded-xl px-5">
                  {t("support_form_submit")}
                </Button>
              </div>

              <p className="text-xs text-slate-500">
                {t("support_form_privacy_hint")}{" "}
                <a href="/privacidad" className="underline underline-offset-2">
                  {t("support_form_privacy_link")}
                </a>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;