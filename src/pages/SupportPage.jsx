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
    const subject = encodeURIComponent(
      `[Olondo.AI] ${form.subject || t("support_form_subject_placeholder")}`
    );
    const body = encodeURIComponent(
      `${t("support_form_name_label")}: ${form.name}\n${t(
        "support_form_email_label"
      )}: ${form.email}\n\n${t("support_form_message_label")}:\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#F6FAFF] to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          {/* IZQUIERDA: título + burbuja + mascota */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-blue-600 mb-3">
              {t("support_kicker")}
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
              {t("support_title", "Estamos aquí para ayudarte")}
            </h1>

            <p className="mt-4 text-slate-600 text-lg">
              {t(
                "support_subtitle",
                "Cuéntanos tu duda o problema y te responderemos lo antes posible."
              )}
            </p>

            {/* Mascota + burbuja “Ciao!” como en tu referencia */}
            <div className="relative mt-10 inline-block">
              {/* Burbuja */}
              <div className="absolute -top-6 right-6 rounded-xl bg-indigo-600 px-4 py-2 text-white text-lg font-semibold shadow-sm">
                Ciao!
              </div>

              {/* Mascota (asegúrate de tener /public/olondo.mascota.png) */}
              <img
                src="/olondo.mascota.png"
                alt="Soporte Olondo.AI"
                className="h-[280px] sm:h-[320px] w-auto select-none pointer-events-none"
                draggable={false}
              />

              {/* Sombra elíptica bajo la mascota */}
              <div className="mx-auto mt-3 h-2 w-40 rounded-full bg-slate-300/40" />
            </div>
          </div>

          {/* DERECHA: tarjeta con formulario (sin cambios) */}
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