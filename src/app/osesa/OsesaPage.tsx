"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Eye,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import PageHero from "@/components/ipf/PageHero";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Seguimiento continuo",
    desc: "Monitoreo permanente de las acciones de supervisión del OSESA y su impacto en la calidad de los servicios de salud a nivel nacional.",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    title: "Análisis normativo",
    desc: "Revisión especializada de la normativa vigente y propuestas de mejora para fortalecer el marco regulatorio de supervisión sanitaria.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Alertas tempranas",
    desc: "Identificación anticipada de riesgos y brechas en la supervisión de servicios de salud para informar la toma de decisiones.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Indicadores de desempeño",
    desc: "Construcción y seguimiento de indicadores clave que miden la efectividad de la supervisión sanitaria en el Perú.",
  },
];

const stats = [
  { value: "50+", label: "Informes publicados" },
  { value: "180+", label: "Establecimientos analizados" },
  { value: "25", label: "Regiones cubiertas" },
  { value: "12", label: "Ejes temáticos" },
];

const contentBlocks = [
  {
    title: "¿Qué es el OSESA?",
    text: "El Órgano de Supervisión de Servicios de Salud (OSESA) es la entidad encargada de supervisar y fiscalizar el cumplimiento de las normas sanitarias por parte de los proveedores de servicios de salud en el Perú. Su labor es fundamental para garantizar que la atención de salud cumpla con los estándares de calidad y seguridad que la población merece. Desde el Instituto Pulso Fiscal, realizamos un seguimiento riguroso de sus acciones, evaluamos su impacto y proponemos mejoras basadas en evidencia para fortalecer la supervisión sanitaria nacional.",
  },
  {
    title: "Nuestro enfoque de análisis",
    text: "Abordamos la supervisión sanitaria desde una perspectiva integral que combina el análisis macroeconómico con la evaluación de políticas públicas. Nuestro equipo de investigadores examina los datos de supervisión, identifica patrones y tendencias, y elabora recomendaciones técnicas orientadas a mejorar la calidad de los servicios de salud. Trabajamos con fuentes oficiales, datos primarios y metodologías rigurosas para entregar análisis que aporten valor real a la discusión pública sobre salud en el Perú.",
  },
  {
    title: "Informes y publicaciones recientes",
    text: "Publicamos informes trimestrales sobre el estado de la supervisión sanitaria, análisis de casos emblemáticos, y evaluaciones de impacto de las políticas de supervisión implementadas por el OSESA. Nuestras publicaciones son referencia para investigadores, tomadores de decisiones y profesionales del sector salud que buscan información técnica y actualizada sobre el estado de la supervisión sanitaria en el país.",
  },
];

export default function OsesaPage() {
  const revealRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />
      <main className="flex-1">
        <PageHero
          badge="Supervisión Sanitaria"
          title={
            <>
              OSESA: <span>Análisis y Seguimiento</span> de la Supervisión Sanitaria
            </>
          }
          subtitle="Monitoreo especializado del Órgano de Supervisión de Servicios de Salud y su impacto en la calidad de atención en el Perú."
        />

        {/* Stats Bar */}
        <section className="relative z-10 -mt-1 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-900 text-brand-700 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mt-1 tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Blocks */}
        <section className="bg-slate-50/60 py-20 px-6" ref={revealRef}>
          <div className="max-w-3xl mx-auto space-y-16">
            {contentBlocks.map((block, i) => (
              <div key={block.title}>
                <h2 className="font-display text-xl md:text-2xl font-800 text-slate-900 tracking-tight mb-4">
                  {block.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-[15px]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-900 text-slate-900 tracking-tight text-center mb-12">
              Nuestro abordaje
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg hover:shadow-brand-100/40 transition-shadow duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-display text-base font-700 text-slate-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-950 py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <ShieldCheck className="w-12 h-12 text-brand-400 mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-900 text-white tracking-tight mb-4">
              Accede a nuestros informes OSESA
            </h2>
            <p className="text-slate-400 mb-8 text-[15px] leading-relaxed">
              Suscríbete y recibe análisis exclusivos sobre supervisión sanitaria,
              indicadores de desempeño y recomendaciones de política pública.
            </p>
            <a
              href="/suscripciones"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Ver planes de suscripción
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}