import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, PlusCircle, Folder, CreditCard, Settings, User, Sun, Moon, Gem, MessageSquare,
  Plus, Mic
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { useTheme } from "@/components/layout/ThemeProvider";

const AssistantPage = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // UI constants
  const HEADER_COLOR    = theme === "dark" ? "#262F3F" : "#ffffff";
  const SIDEBAR_COLOR   = theme === "dark" ? "#354153" : "#f8f9fb";
  const ACTIVE_BG_COLOR = theme === "dark" ? "#262F3F" : "#e9eef5";
  const BORDER_COLOR    = theme === "dark" ? "#1f2937" : "#e5e7eb";
  const HEADER_HEIGHT_PX = 72;
  const SIDEBAR_WIDTH_PX = 190;

  const USER_PLAN = "premium";
  const planLabel = USER_PLAN === "premium" ? "Plan Premium" : "Plan Básico";
  const isActive = (path) => location.pathname === path;

  // Chat state
  const [messages, setMessages] = useState([]); // { id, role: 'user'|'assistant', content }
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]); // File[]
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const isEmpty = messages.length === 0;

  // Files
  const FILE_INPUT_ID = "assistant-file-input";
  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setAttachments(files);
      if (!input.trim()) setInput(files.map((f) => f.name).join(", "));
      inputRef.current?.focus();
    }
    e.target.value = "";
  };

  // New chat
  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    setAttachments([]);
  };

  // Send
  const handleSend = () => {
    const text = input.trim();
    if (!text && attachments.length === 0) return;
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachments([]);
    inputRef.current?.focus();
    // Conecta tu backend aquí si deseas respuesta del asistente
  };

  // Enter to send / Shift+Enter new line
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // autoscroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  // Bubble
  const Bubble = ({ role, children }) => {
    const isUser = role === "user";
    return (
      <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
        <div
          className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2 text-sm md:text-base whitespace-pre-wrap leading-relaxed ${
            isUser
              ? "bg-sky-600 text-white rounded-br-md"
              : theme === "dark"
              ? "bg-slate-800 text-slate-100 rounded-bl-md"
              : "bg-slate-100 text-slate-800 rounded-bl-md"
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hidden file input */}
      <input
        id={FILE_INPUT_ID}
        type="file"
        multiple
        hidden
        onChange={onFiles}
        accept=".pdf,.txt,.doc,.docx,.md,.rtf,.json,.csv,image/*,audio/*,video/*"
      />

      {/* Header */}
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
                  width: 30, height: 30,
                  backgroundColor: theme === "dark" ? "rgba(255,255,255,0.22)" : "#ffffff",
                  boxShadow: theme === "dark"
                    ? "inset 0 0 0 1px rgba(255,255,255,0.45)"
                    : "inset 0 0 0 1px rgba(15,23,42,0.12), 0 1px 2px rgba(0,0,0,0.04)"
                }}
                aria-hidden="true"
              >
                <Gem className="w-5 h-5" style={{ color: theme === "dark" ? "#ffffff" : "#334155" }} />
              </div>
              <div
                className="rounded-xl px-3 py-1.5 text-sm font-medium"
                style={
                  theme === "dark"
                    ? { backgroundColor: "rgba(255,255,255,0.06)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)", color: "#E5E7EB" }
                    : { backgroundColor: "#f3f4f6", boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.12)", color: "#0f172a" }
                }
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

      {/* GRID LAYOUT */}
      <div className="w-full">
        <div className="grid gap-0 md:grid-cols-[190px_1fr]">
          {/* Sidebar */}
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
                  <Link to="/assistant" className="w-full flex items-center gap-3 h-11 ps-2 pe-2 rounded-xl transition-colors" style={{ backgroundColor: isActive("/assistant") ? ACTIVE_BG_COLOR : "transparent" }}>
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <span className="truncate">{t("dashboard_nav_ai_chat")}</span>
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

          {/* MAIN */}
          <main className="relative h-[calc(100vh-72px)] overflow-hidden">
            {/* Botón Nuevo chat posicionado y sin ocupar flujo */}
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={handleNewChat}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700
                           bg-white dark:bg-slate-900 px-3.5 h-10 text-sm font-medium
                           hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label={t("assistant_new_chat", "Nuevo chat")}
                title={t("assistant_new_chat", "Nuevo chat")}
              >
                <Plus className="w-4 h-4" />
                {t("assistant_new_chat", "Nuevo chat")}
              </button>
            </div>

            {/* Scroll area interno (solo si hay chat) */}
            <div className="h-full flex flex-col">
              <div className={`flex-1 ${isEmpty ? "overflow-hidden" : "overflow-y-auto"}`}>
                {/* Empty state centrado */}
                {isEmpty && (
                  <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-10">
                    <div className="flex flex-col items-center text-center select-none mt-[10vh] md:mt-[14vh]">
                      <img
                        src="/olondo.mascota.png"
                        alt="Olondo asistente"
                        className="w-20 h-20 rounded-xl shadow-sm mb-3"
                        draggable={false}
                      />
                      <h2 className="text-xl md:text-2xl font-semibold">
                        {t("assistant_mascot_greeting", "¿Cómo puedo ayudarte?")}
                      </h2>

                      {/* Input centrado */}
                      <form onSubmit={(e)=>{e.preventDefault();handleSend();}} className="w-full mt-6">
                        <div className="mx-auto max-w-3xl flex items-center gap-2 rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-3 py-2">
                          <label
                            htmlFor={FILE_INPUT_ID}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                            title={t("assistant_add", "Añadir")}
                          >
                            <Plus className="w-5 h-5" />
                          </label>

                          <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e)=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); handleSend(); } }}
                            placeholder={t("assistant_placeholder", "Pregunta lo que quieras")}
                            rows={1}
                            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-slate-400 resize-none"
                          />

                          <button
                            type="button"
                            className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            title={t("assistant_voice", "Dictar por voz")}
                          >
                            <Mic className="w-5 h-5" />
                          </button>

                          <button
                            type="submit"
                            disabled={!input.trim() && attachments.length === 0}
                            className="ml-1 inline-flex items-center justify-center rounded-full bg-sky-600 hover:bg-sky-700 text-white h-10 px-5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            aria-label={t("assistant_send", "Enviar")}
                          >
                            {t("assistant_send", "Enviar")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Mensajes (cuando ya hay chat) */}
                {!isEmpty && (
                  <div className="max-w-3xl mx-auto w-full px-4 md:px-6 pt-6 pb-24">
                    {messages.map((m) => (
                      <Bubble key={m.id} role={m.role}>{m.content}</Bubble>
                    ))}
                    <div ref={endRef} />
                  </div>
                )}
              </div>

              {/* Composer abajo cuando hay chat */}
              {!isEmpty && (
                <div className="sticky bottom-0 w-full z-10">
                  <div className="bg-gradient-to-t from-white/90 dark:from-slate-950/90 to-transparent backdrop-blur">
                    <div className="max-w-3xl mx-auto px-4 md:px-6 py-4">
                      <form onSubmit={(e)=>{e.preventDefault();handleSend();}}>
                        <div className="flex items-center gap-2 rounded-[28px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm px-3 py-2">
                          <label
                            htmlFor={FILE_INPUT_ID}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                            title={t("assistant_add", "Añadir")}
                          >
                            <Plus className="w-5 h-5" />
                          </label>

                          <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e)=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); handleSend(); } }}
                            placeholder={t("assistant_placeholder", "Escribe tu mensaje")}
                            rows={1}
                            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-slate-400 resize-none"
                          />

                          <button
                            type="button"
                            className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            title={t("assistant_voice", "Dictar por voz")}
                          >
                            <Mic className="w-5 h-5" />
                          </button>

                          <button
                            type="submit"
                            disabled={!input.trim() && attachments.length === 0}
                            className="ml-1 inline-flex items-center justify-center rounded-full bg-sky-600 hover:bg-sky-700 text-white h-10 px-5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                            aria-label={t("assistant_send", "Enviar")}
                          >
                            {t("assistant_send", "Enviar")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;