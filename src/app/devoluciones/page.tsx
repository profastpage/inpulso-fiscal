import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Devoluciones y Reembolsos",
  description:
    "Política de devoluciones y reembolsos del Instituto Pulso Fiscal. Conoce las condiciones aplicables a servicios digitales y cursos virtuales.",
  openGraph: {
    title: "Política de Devoluciones y Reembolsos | Instituto Pulso Fiscal",
    description:
      "Conoce las condiciones de devolución y reembolso aplicables a los servicios digitales del IPF.",
    url: "/devoluciones",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Devoluciones y Reembolsos — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Devoluciones y Reembolsos | Instituto Pulso Fiscal",
    description: "Condiciones de devolución y reembolso aplicables a servicios digitales del IPF.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/devoluciones" },
};

export default function Devoluciones() {
  return <DevolucionesPage />;
}

function DevolucionesPage() {
  const sections = [
    {
      number: "01",
      title: "Naturaleza del Servicio",
      content:
        "Los servicios ofrecidos por el Instituto Pulso Fiscal (IPF) son digitales e intangibles, consistentes en acceso a contenido online y cursos virtuales.",
    },
    {
      number: "02",
      title: "No Devoluciones",
      intro: "El IPF establece expresamente que:",
      items: [
        {
          points: [
            "No se realizan devoluciones ni reembolsos por suscripciones mensuales ni anuales.",
            "No se realizan devoluciones por cursos una vez otorgado el acceso.",
            "El usuario acepta esta condición al momento de realizar el pago.",
          ],
        },
      ],
      highlight: true,
    },
    {
      number: "03",
      title: "Justificación",
      intro: "Dado que:",
      items: [
        {
          points: [
            "El acceso al contenido es inmediato.",
            "El servicio es digital y no reversible.",
            "No es posible realizar devoluciones una vez activado el servicio, siguiendo estándares de servicios digitales.",
          ],
        },
      ],
    },
    {
      number: "04",
      title: "Excepción",
      intro: "Solo se evaluarán casos excepcionales cuando:",
      items: [
        {
          points: [
            "El pago haya sido realizado pero el acceso no haya sido habilitado.",
          ],
        },
      ],
      note: "En dicho caso, el IPF podrá activar el servicio o evaluar una devolución.",
      subItems: [
        "Activar el servicio, o",
        "Evaluar una devolución.",
      ],
    },
    {
      number: "05",
      title: "Aceptación",
      content:
        "El usuario declara conocer y aceptar esta política antes de realizar cualquier pago.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <nav className="bg-navy-950 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo IPF" className="w-9 h-9 rounded-[8px] object-cover" />
          <a href="/" className="text-white/70 hover:text-white text-sm font-semibold transition-colors">
            Volver al inicio
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-navy-950 pt-12 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-20%,rgba(14,140,225,0.12),transparent)]" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-[10px] font-black tracking-[0.25em] uppercase text-brand-400/60 bg-brand-400/5 border border-brand-400/10 rounded-full px-5 py-1.5 mb-6">
            Política Institucional
          </span>
          <h1 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-display font-extrabold text-white leading-tight mb-4">
            Política de Devoluciones y Reembolsos
          </h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Condiciones aplicables a devoluciones y reembolsos de los servicios digitales del Instituto Pulso Fiscal.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-white/25 font-medium">
            <span>Última actualización: Julio 2025</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Vigencia: Indefinida</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 -mt-8 relative z-10">
        <div className="max-w-[820px] mx-auto px-6 pb-24">
          <div className="bg-white rounded-2xl shadow-lg shadow-navy-950/5 border border-slate-100 p-8 md:p-12">

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((s) => (
                <article key={s.number} id={`seccion-${s.number}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <span
                      className={`flex-shrink-0 w-9 h-9 rounded-lg font-display font-extrabold text-sm flex items-center justify-center border ${
                        s.highlight
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-brand-50 text-brand-700 border-brand-100"
                      }`}
                    >
                      {s.number}
                    </span>
                    <h2 className="text-lg font-display font-extrabold text-navy-950 pt-1">
                      {s.title}
                    </h2>
                  </div>

                  {s.content && (
                    <p className="text-slate-600 text-[15px] leading-relaxed ml-[52px]">
                      {s.content}
                    </p>
                  )}

                  {s.intro && (
                    <p className="text-slate-600 text-[15px] leading-relaxed ml-[52px] mb-3">
                      {s.intro}
                    </p>
                  )}

                  {s.items?.map((item, idx) => (
                    <div key={idx} className="ml-[52px] mb-3">
                      {item.subtitle && (
                        <h3 className="text-sm font-bold text-navy-950 mb-2">
                          {item.subtitle}
                        </h3>
                      )}
                      <ul className="space-y-2">
                        {item.points.map((point, pi) => (
                          <li key={pi} className="flex items-start gap-3">
                            <span
                              className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                s.highlight ? "bg-red-400" : "bg-brand-400"
                              }`}
                            />
                            <span className="text-slate-600 text-[15px] leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {s.note && (
                    <div className="ml-[52px] mt-4 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                      <p className="text-amber-800/80 text-[13px] leading-relaxed">
                        {s.note}
                      </p>
                    </div>
                  )}

                  {s.highlight && (
                    <div className="ml-[52px] mt-5 p-4 rounded-xl bg-red-50/50 border border-red-100/80">
                      <p className="text-red-700/70 text-[13px] leading-relaxed font-medium">
                        Esta condición es aplicable a todos los servicios digitales ofrecidos por el IPF y se acepta de manera irrevocable al momento del pago.
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-14 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs leading-relaxed">
                Para consultas sobre esta política, escríbanos a{" "}
                <a href="mailto:consultas@inpulsofiscal.com" className="text-brand-600 font-semibold hover:underline">
                  consultas@inpulsofiscal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mini footer */}
      <footer className="bg-navy-950 py-6 text-center">
        <p className="text-white/25 text-xs font-medium">
          © 2026 Instituto Pulso Fiscal. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}