"use client";

import { useRef } from "react";
import { FileText, BarChart3, NotebookText, BookOpenCheck, Microscope } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

const publicationTypes = [
  {
    icon: FileText,
    title: "Artículos",
    description:
      "Análisis breves y oportunos sobre temas clave de la agenda económica y fiscal del país.",
  },
  {
    icon: BarChart3,
    title: "Reportes",
    description:
      "Reportes técnicos con datos actualizados y proyecciones sobre indicadores macroeconómicos y fiscales.",
  },
  {
    icon: NotebookText,
    title: "Informes",
    description:
      "Informes especializados que profundizan en sectores específicos de la economía y gestión pública.",
  },
  {
    icon: BookOpenCheck,
    title: "Guías de Estudio",
    description:
      "Material didáctico y metodológico para el estudio de los sistemas administrativos del Estado.",
  },
  {
    icon: Microscope,
    title: "Investigaciones",
    description:
      "Estudios de largo aliento con rigor académico orientados a la formulación de políticas públicas basadas en evidencia.",
  },
];

export default function ReportesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[76px]">
        {/* Hero */}
        <section className="bg-[#EFF6FF] py-24 lg:py-32">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <span className="home-kicker">Semana Fiscal</span>
            <h1 className="text-[clamp(1.8rem,4vw,2.75rem)] font-display font-extrabold text-navy-950 mt-6 mb-4 leading-[1.15]">
              Reportes Técnicos
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Publicaciones y análisis técnico sobre macroeconomía, política fiscal y gestión pública en el Perú.
            </p>
          </div>
        </section>

        {/* Publication Types Grid */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-navy-950 mb-4">
                Tipos de Publicaciones
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Explora nuestra biblioteca especializada organizada por formato y nivel de profundidad.
              </p>
            </div>

            <div
              ref={gridRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {publicationTypes.map((pub, i) => {
                const Icon = pub.icon;
                return (
                  <motion.article
                    key={pub.title}
                    className={`rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 ${
                      i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-display font-extrabold text-navy-950 mb-3">
                      {pub.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {pub.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}