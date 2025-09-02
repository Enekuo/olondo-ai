<section className="w-full bg-white">
  <div className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Mascota a la IZQUIERDA (se mantiene) */}
      <div className="flex justify-center lg:justify-start">
        <img
          src="/olondo-mascota2.png"  /* ← cambia la extensión si no es PNG */
          alt={t('ct_mascot_alt')}
          className="w-[420px] max-w-full h-auto select-none"
          draggable="false"
        />
      </div>

      {/* Texto a la DERECHA (nuevo) */}
      <div className="space-y-8">
        {/* Introducción */}
        <div className="space-y-4">
          <p className="text-slate-700 text-lg leading-relaxed">{t('ct_long_intro_1')}</p>
          <p className="text-slate-700 text-lg leading-relaxed">{t('ct_long_intro_2')}</p>
        </div>

        {/* 🎯 Objetivo central */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <h2 className="text-slate-900 font-bold text-2xl md:text-3xl mb-4">🎯 {t('ct_obj_title')}</h2>
          <ul className="space-y-3 text-slate-700 text-base md:text-lg leading-relaxed">
            <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" /><span>{t('ct_obj_1')}</span></li>
            <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" /><span>{t('ct_obj_2')}</span></li>
            <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" /><span>{t('ct_obj_3')}</span></li>
            <li className="flex gap-3"><span className="mt-1.5 h-2 w-2 rounded-full bg-sky-500 shrink-0" /><span>{t('ct_obj_4')}</span></li>
          </ul>
        </div>

        {/* ⚡ Flujo de uso paso a paso */}
        <div className="space-y-6">
          <h2 className="text-slate-900 font-bold text-2xl md:text-3xl">⚡ {t('ct_flow_title')}</h2>

          {/* 1. Acceso */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">1. {t('ct_flow_1_title')}</h3>
            <p className="text-slate-700">{t('ct_flow_1_p')}</p>
          </div>

          {/* 2. Entrada de información */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">2. {t('ct_flow_2_title')}</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>{t('ct_flow_2_b1')}</li>
              <li>{t('ct_flow_2_b2')}</li>
              <li>{t('ct_flow_2_b3')}</li>
              <li>{t('ct_flow_2_b4')}</li>
            </ul>
          </div>

          {/* 3. Prompt opcional */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">3. {t('ct_flow_3_title')}</h3>
            <p className="text-slate-700 mb-3">{t('ct_flow_3_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>{t('ct_flow_3_s1')}</li>
              <li>{t('ct_flow_3_s2')}</li>
            </ul>
            <p className="text-slate-700 mt-3">{t('ct_flow_3_examples_label')}</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>{t('ct_flow_3_ex1')}</li>
              <li>{t('ct_flow_3_ex2')}</li>
            </ul>
          </div>

          {/* 4. Personalización */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">4. {t('ct_flow_4_title')}</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              <li>{t('ct_flow_4_b1')}</li>
              <li>{t('ct_flow_4_b2')}</li>
              <li>{t('ct_flow_4_b3')}</li>
              <li>{t('ct_flow_4_b4')}</li>
            </ul>
          </div>

          {/* 5. Generación con IA */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">5. {t('ct_flow_5_title')}</h3>
            <p className="text-slate-700">{t('ct_flow_5_p1')}</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1 mt-2">
              <li>{t('ct_flow_5_b1')}</li>
              <li>{t('ct_flow_5_b2')}</li>
            </ul>
            <p className="text-slate-700 mt-2">{t('ct_flow_5_p2')}</p>
          </div>

          {/* 6. Visualización y edición */}
          <div>
            <h3 className="text-slate-900 font-semibold text-xl mb-2">6. {t('ct_flow_6_title')}</h3>
            <p className="text-slate-700">{t('ct_flow_6_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1 mt-2">
              <li>{t('ct_flow_6_b1')}</li>
              <li>{t('ct_flow_6_b2')}</li>
              <li>{t('ct_flow_6_b3')}</li>
              <li>{t('ct_flow_6_b4')}</li>
            </ul>
          </div>

          {/* 7. Conversión a voz */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-slate-900 font-semibold text-xl mb-2">7. {t('ct_flow_7_title')}</h3>
            <p className="text-slate-700">{t('ct_flow_7_p')}</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1 mt-2">
              <li>{t('ct_flow_7_b1')}</li>
              <li>{t('ct_flow_7_b2')}</li>
              <li>{t('ct_flow_7_b3')}</li>
            </ul>
          </div>
        </div>

        {/* 🗂️ Gestión y guardado */}
        <div>
          <h2 className="text-slate-900 font-bold text-2xl md:text-3xl mb-3">🗂️ {t('ct_mgmt_title')}</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>{t('ct_mgmt_b1')}</li>
            <li>{t('ct_mgmt_b2')}</li>
            <li>{t('ct_mgmt_b3')}</li>
          </ul>
        </div>

        {/* 🌍 Casos de uso reales */}
        <div>
          <h2 className="text-slate-900 font-bold text-2xl md:text-3xl mb-3">🌍 {t('ct_cases_title')}</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-1">
            <li>{t('ct_cases_b1')}</li>
            <li>{t('ct_cases_b2')}</li>
            <li>{t('ct_cases_b3')}</li>
            <li>{t('ct_cases_b4')}</li>
          </ul>
        </div>

        {/* 🚀 Valor diferencial */}
        <div className="space-y-3">
          <h2 className="text-slate-900 font-bold text-2xl md:text-3xl">🚀 {t('ct_value_title')}</h2>
          <p className="text-slate-700">{t('ct_value_p1')}</p>
          <p className="text-slate-700">{t('ct_value_p2')}</p>
        </div>
      </div>
    </div>
  </div>
</section>