import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de uso del sitio web y servicios del Instituto Pulso Fiscal E.I.R.L. Normativa que rige la relación comercial con los usuarios.",
  openGraph: {
    title: "Términos y Condiciones | Instituto Pulso Fiscal",
    description:
      "Términos y Condiciones de uso del sitio web y servicios del Instituto Pulso Fiscal E.I.R.L.",
    url: "/terminos",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Términos y Condiciones — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos y Condiciones | Instituto Pulso Fiscal",
    description: "Normativa que rige la relación comercial entre el IPF y los usuarios.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/terminos" },
};

export default function Terminos() {
  return <TerminosPage />;
}

function TerminosPage() {
  const sections = [
    {
      number: "01",
      title: "Aceptación",
      content: `El acceso, registro o uso del sitio web implica la aceptación expresa de los presentes Términos y Condiciones. Si el usuario no está de acuerdo, deberá abstenerse de utilizar los servicios.`,
    },
    {
      number: "02",
      title: "Servicios",
      intro: "El Instituto Pulso Fiscal (IPF) brinda exclusivamente servicios digitales:",
      items: [
        {
          subtitle: "2.1 Suscripción mensual",
          points: [
            "Acceso a contenido digital (artículos, reportes, análisis).",
            "Servicio personal, limitado y no transferible.",
            "Acceso vigente durante el periodo mensual contratado.",
          ],
        },
        {
          subtitle: "2.2 Cursos virtuales",
          points: [
            "Contenido académico.",
            "Acceso restringido a usuarios matriculados según política de la empresa.",
          ],
        },
      ],
    },
    {
      number: "03",
      title: "Registro y Cuenta",
      intro: "El usuario deberá:",
      items: [
        {
          points: [
            "Proporcionar información veraz.",
            "Mantener confidencial su contraseña.",
            "Asumir responsabilidad por el uso de su cuenta.",
          ],
        },
      ],
      note: "El IPF no se responsabiliza por accesos indebidos derivados del uso negligente de credenciales.",
    },
    {
      number: "04",
      title: "Activación del Servicio",
      content: `El acceso a la suscripción o cursos se habilita únicamente luego de la confirmación del pago. El IPF podrá validar la operación antes de activar el servicio.`,
    },
    {
      number: "05",
      title: "Licencia de Uso",
      intro: "El IPF otorga al usuario una licencia limitada, personal y no exclusiva para acceder a los contenidos. El usuario no puede:",
      items: [
        {
          points: [
            "Copiar, distribuir o reproducir contenidos.",
            "Revender o compartir materiales.",
            "Usar los contenidos con fines comerciales.",
          ],
        },
      ],
    },
    {
      number: "06",
      title: "Propiedad Intelectual",
      content: `Todos los contenidos del IPF son de su propiedad o cuentan con licencia. Están protegidos por normativa de propiedad intelectual.`,
    },
    {
      number: "07",
      title: "Uso Prohibido",
      intro: "El usuario se compromete a no:",
      items: [
        {
          points: [
            "Compartir su cuenta.",
            "Permitir accesos simultáneos no autorizados.",
            "Descargar o grabar contenidos sin autorización.",
            "Vulnerar la seguridad del sistema.",
          ],
        },
      ],
    },
    {
      number: "08",
      title: "Uso Indebido de Cuentas (Multiusuario)",
      intro: "El IPF podrá:",
      items: [
        {
          points: [
            "Suspender o cancelar cuentas que evidencien uso compartido.",
            "Restringir accesos simultáneos.",
            "Bloquear usuarios sin derecho a compensación.",
          ],
        },
      ],
    },
    {
      number: "09",
      title: "Responsabilidad",
      intro: "El IPF no garantiza:",
      items: [
        {
          points: [
            "Disponibilidad continua del servicio.",
            "Ausencia de errores técnicos.",
            "Resultados específicos derivados del uso del contenido.",
          ],
        },
      ],
      note: "El uso del servicio es bajo responsabilidad del usuario.",
    },
    {
      number: "10",
      title: "Modificaciones",
      content: `El IPF podrá modificar estos términos en cualquier momento. El uso continuado implica aceptación de las modificaciones.`,
    },
    {
      number: "11",
      title: "Protección de Datos",
      intro: "El IPF trata datos personales conforme a la normativa peruana. Los datos se usan para:",
      items: [
        {
          points: [
            "Gestionar suscripciones.",
            "Brindar acceso a servicios.",
            "Comunicación institucional.",
          ],
        },
      ],
    },
    {
      number: "12",
      title: "Jurisdicción",
      content: `Se rige por las leyes del Perú. Cualquier controversia será resuelta en tribunales de Lima.`,
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
            Documento Legal
          </span>
          <h1 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-display font-extrabold text-white leading-tight mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Normas que regulan la relación comercial entre el INSTITUTO PULSO FISCAL E.I.R.L. y los usuarios de esta página web.
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

            {/* Preamble */}
            <div className="mb-10 pb-8 border-b border-slate-100">
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Los siguientes Términos y Condiciones norman la relación comercial entre el <strong className="text-navy-950 font-semibold">INSTITUTO PULSO FISCAL E.I.R.L.</strong> y los usuarios de esta página web.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((s) => (
                <article key={s.number} id={`seccion-${s.number}`}>
                  <div className="flex items-start gap-4 mb-3">
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-50 text-brand-700 font-display font-extrabold text-sm flex items-center justify-center border border-brand-100">
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
                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
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
                        <strong className="font-semibold">Nota:</strong> {s.note}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-14 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs leading-relaxed">
                Para cualquier consulta sobre estos términos, escríbanos a{" "}
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