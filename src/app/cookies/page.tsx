import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de Cookies del Instituto Pulso Fiscal. Información sobre el uso de cookies técnicas, analíticas y de terceros.",
  openGraph: {
    title: "Política de Cookies | Instituto Pulso Fiscal",
    description: "Información sobre el uso de cookies en el sitio web del Instituto Pulso Fiscal.",
    url: "/cookies",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Política de Cookies — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Cookies | Instituto Pulso Fiscal",
    description: "Información sobre el uso de cookies en el sitio web del IPF.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return <CookiesPage />;
}

function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Nav */}
      <nav className="bg-navy-950 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Logo IPF" className="w-9 h-9 rounded-[8px] object-cover" />
          <a href="/" className="text-white/70 hover:text-white text-sm font-semibold transition-colors">
            Volver al inicio
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-navy-950 pt-16 sm:pt-20 pb-28 sm:pb-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-20%,rgba(14,140,225,0.12),transparent)]" />
        <div className="relative max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-[10px] font-black tracking-[0.25em] uppercase text-brand-400/60 bg-brand-400/5 border border-brand-400/10 rounded-full px-5 py-1.5 mb-6">
            Información Legal
          </span>
          <h1 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-display font-extrabold text-white leading-tight mb-4">
            Política de Cookies
          </h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Uso de cookies técnicas, analíticas y de terceros dentro del sitio web del Instituto Pulso Fiscal.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 -mt-8 relative z-10">
        <div className="max-w-[860px] mx-auto px-6 pb-24">
          <div className="bg-white rounded-2xl shadow-lg shadow-navy-950/5 border border-slate-100 p-8 md:p-12">
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
              Esta sección está preparada para describir el uso de cookies técnicas, analíticas y de terceros dentro del sitio web del Instituto Pulso Fiscal.
            </p>

            {/* Pending notice */}
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200/60 p-6 flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-1">Contenido pendiente de publicación</h3>
                <p className="text-amber-800/70 text-[13px] leading-relaxed">
                  Contenido legal pendiente de validación y entrega por parte del Instituto Pulso Fiscal.
                </p>
              </div>
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