import { useState } from "react";

export default function HeroRightMockup() {
  const [playing, setPlaying] = useState(false);

  const styles = `
    .wave { display:flex; align-items:flex-end; gap:4px; height:20px }
    .wave span{
      width:3px; background:#2563eb; border-radius:2px;
      opacity:.95; transform-origin:bottom; height:var(--h,10px);
      animation:pulse 1.2s ease-in-out infinite; animation-delay:var(--d,0s);
    }
    .paused .wave span{ animation-play-state:paused }
    @keyframes pulse{ 0%,100%{ transform:scaleY(.45) } 50%{ transform:scaleY(.95) } }
  `;
  const bars = new Array(24).fill(0);

  return (
    <div className="w-full md:max-w-[520px]">
      <style>{styles}</style>

      {/* Desktop / Tablet: portátil */}
      <div className="hidden md:block">
        <div className="bg-slate-900 p-1.5 rounded-[20px] shadow-[0_10px_28px_rgba(2,6,23,.16)]">
          <div className="rounded-[14px] bg-white h-[260px] relative overflow-hidden">
            <div className="absolute -inset-8 bg-gradient-to-tr from-blue-50 to-indigo-50" />
            <div className="absolute inset-0 px-1 py-4 flex">
              <div className="w-[95%] mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 text-xs text-slate-700 bg-white/80 border border-slate-200 rounded-full px-3 py-1 backdrop-blur">
                  <span>🎧 Escucha cómo suena un resumen</span>
                  <span className="text-[10px] bg-slate-900 text-white rounded-full px-2 py-[2px]">Demo 20s</span>
                </div>

                <div className="bg-white/95 backdrop-blur rounded-xl border border-slate-200 shadow-sm px-5 py-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Resumen (ejemplo)</h3>
                  <ul className="list-disc pl-5 text-slate-700 leading-[1.45] space-y-1 mb-3">
                    <li>Primero creamos tu resumen en 3 ideas.</li>
                    <li>Puedes leerlo en pantalla.</li>
                    <li>Y escucharlo con voz natural.</li>
                  </ul>

                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => setPlaying(p => !p)}
                      className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                    >
                      {playing ? "⏸ Pausar demo" : "▶ Escuchar demo"}
                    </button>

                    <div className={(playing ? "" : "paused ") + "wave"}>
                      {bars.map((_, i) => (
                        <span key={i} style={{ "--d": `${i * 0.05}s`, "--h": `${9 + ((i % 6) + 1) * 3}px` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">Texto</span>
                  <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">PDF</span>
                  <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">Enlace</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bisagra */}
        <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-slate-300" />
      </div>

      {/* Móvil: solo la tarjeta */}
      <div className="md:hidden">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-2">Resumen (ejemplo)</h3>
          <ul className="list-disc pl-5 text-slate-700 leading-[1.45] space-y-1 mb-3">
            <li>Primero creamos tu resumen en 3 ideas.</li>
            <li>Puedes leerlo en pantalla.</li>
            <li>Y escucharlo con voz natural.</li>
          </ul>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying(p => !p)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
            >
              {playing ? "⏸ Pausar demo" : "▶ Escuchar demo"}
            </button>
            <div className={(playing ? "" : "paused ") + "wave"}>
              {[...Array(24)].map((_, i) => (
                <span key={i} style={{ "--d": `${i * 0.05}s`, "--h": `${9 + ((i % 6) + 1) * 3}px` }} />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-3">
            <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">Texto</span>
            <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">PDF</span>
            <span className="text-[13px] border border-slate-200 rounded-full px-3 py-1 bg-white text-slate-700">Enlace</span>
          </div>
        </div>
      </div>
    </div>
  );
}