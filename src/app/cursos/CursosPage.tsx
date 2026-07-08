"use client";

import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

const courses = [
  "Sistema Nacional de Planeamiento Estratégico",
  "Sistema Nacional de Presupuesto Público",
  "Invierte.pe",
  "Asociaciones Público-Privadas (APP)",
  "Obras por Impuestos (OxI)",
  "La Política Fiscal y el Presupuesto Público en Perú",
  "La Descentralización Fiscal en el Perú",
  "Análisis Macroeconómico para No Economistas",
  "Sistemas Administrativos del Sector Público",
];

export default function CursosPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[76px]">
        {/* Hero */}
        <section className="bg-[#EFF6FF] py-24 lg:py-32">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <span className="home-kicker">Formación</span>
            <h1 className="text-[clamp(1.8rem,4vw,2.75rem)] font-display font-extrabold text-navy-950 mt-6 mb-4 leading-[1.15]">
              Cursos
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Formación especializada en economía, finanzas públicas y gestión del sector público.
            </p>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-navy-950 mb-4">
                Nuestros Cursos
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Programa académico diseñado para profesionales del sector público y privado que buscan fortalecer sus competencias técnicas.
              </p>
            </div>

            <div
              ref={gridRef}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course, i) => (
                <motion.article
                  key={course}
                  className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-300 flex items-start gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-display font-extrabold text-navy-950 leading-snug">
                      {course}
                    </h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}