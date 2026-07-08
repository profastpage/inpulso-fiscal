"use client";

import { useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    period: "",
    description: "Ideal para quienes desean explorar nuestros contenidos abiertos.",
    features: [
      "Acceso a artículos de opinión",
      "Reportes fiscales mensuales",
      "Boletín informativo semanal",
      "Acceso a la comunidad IPF",
    ],
    cta: "Comenzar gratis",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "S/ XX",
    period: "/mes",
    description: "Acceso completo a toda nuestra biblioteca de análisis y formación.",
    features: [
      "Todo lo del plan Básico",
      "Reportes técnicos ilimitados",
      "Acceso a todos los cursos",
      "Guías de estudio descargables",
      "Investigaciones exclusivas",
      "Soporte prioritario",
      "Certificados de participación",
    ],
    cta: "Suscribirme ahora",
    highlighted: true,
  },
];

export default function SuscripcionesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-[76px]">
        {/* Hero */}
        <section className="bg-[#EFF6FF] py-24 lg:py-32">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <span className="home-kicker">Planes</span>
            <h1 className="text-[clamp(1.8rem,4vw,2.75rem)] font-display font-extrabold text-navy-950 mt-6 mb-4 leading-[1.15]">
              Planes de Suscripción
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades profesionales y accede a contenido especializado.
            </p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div
              ref={gridRef}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  className={`relative rounded-[24px] border p-8 shadow-sm transition-all duration-300 ${
                    plan.highlighted
                      ? "border-brand-300 bg-gradient-to-b from-brand-50/80 to-white shadow-md"
                      : "border-slate-100 bg-white hover:shadow-md hover:border-brand-200"
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-white bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-1.5 rounded-full shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Recomendado
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-display font-extrabold text-navy-950 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-display font-extrabold text-navy-950">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-slate-400 font-medium">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            plan.highlighted
                              ? "bg-brand-600 text-white"
                              : "bg-brand-50 text-brand-700"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-sm text-slate-600 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-sm hover:shadow-md hover:from-brand-700 hover:to-brand-800"
                        : "border-2 border-brand-600 text-brand-700 hover:bg-brand-50"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
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