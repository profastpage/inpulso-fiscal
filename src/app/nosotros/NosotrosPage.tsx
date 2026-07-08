"use client";

import { useRef } from "react";
import { Check, Target, Eye } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import PageHero from "@/components/ipf/PageHero";

const metrics = [
  { value: "15+", label: "Años de experiencia" },
  { value: "200+", label: "Reportes publicados" },
  { value: "5K+", label: "Suscriptores activos" },
  { value: "100%", label: "Independiente" },
];

const integrations = [
  "Integración en la macroeconomía",
  "Integración en la política fiscal y el presupuesto público",
  "Integración en los sistemas administrativos del Estado",
  "Integración en las políticas públicas",
];

const team = [
  { name: "Adrián Rodas", role: "Director General", initials: "AR" },
  { name: "Diana Milla", role: "Investigadora Senior", initials: "DM" },
  { name: "Diana Vela", role: "Investigadora", initials: "DV" },
];

export default function NosotrosPage() {
  const historyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const isInViewHistory = useInView(historyRef, { once: true, margin: "-100px" });
  const isInViewMission = useInView(missionRef, { once: true, margin: "-100px" });
  const isInViewTeam = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />

      <main className="flex-1">
        <PageHero
          badge="Institución"
          title={<>Referente Independiente en <span>Investigación Económica</span></>}
          subtitle="Centro de investigación dedicado al estudio de la macroeconomía, las finanzas públicas y la gestión pública."
          gradient="linear-gradient(135deg, #020617 0%, #072848 50%, #064b81 100%)"
          pattern="radial-gradient(circle at 70% 30%, rgba(14,140,225,0.2) 0%, transparent 60%)"
        >
          {/* Metrics row */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 mt-10">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold text-white">{m.value}</span>
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.5px] mt-1">{m.label}</span>
              </div>
            ))}
          </div>
        </PageHero>

        {/* Historia */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div ref={historyRef} className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInViewHistory ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="home-kicker">Nuestra Historia</span>
                <div className="mt-6">
                  <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-slate-400">Propósito</p>
                  <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-navy-950 mt-5 mb-6 leading-[1.08]">
                    Tu fuente confiable de conocimiento y análisis especializado
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-10">
                    El Instituto Pulso Fiscal es un centro de investigación y análisis dedicado al estudio de la macroeconomía, las finanzas públicas y la gestión pública. Nuestro propósito es impulsar la transparencia en el uso de los recursos del Estado y promover la formulación de políticas públicas basadas en evidencia. A través de la elaboración de estudios, la difusión de información y la creación de espacios de diálogo técnico, buscamos fortalecer la comprensión del entorno económico y fiscal, contribuir a una mejor toma de decisiones en la gestión pública y promover un desarrollo sostenible e institucionalmente sólido para el país.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#f8fafc] border border-slate-100 rounded-[28px] p-10"
                initial={{ opacity: 0, y: 30 }}
                animate={isInViewHistory ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h2 className="text-2xl font-display font-extrabold text-navy-950 mb-6">
                  Analizamos el sector público de forma integrada
                </h2>
                <ul className="space-y-4 text-slate-600 text-base">
                  {integrations.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-6 h-6 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="bg-[#f8fafc] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div ref={missionRef} className="grid lg:grid-cols-2 gap-10">
              <motion.article
                className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInViewMission ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-8">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-display font-extrabold text-navy-950 mb-6">Misión</h2>
                <p className="text-slate-600 leading-relaxed">
                  Contribuir al fortalecimiento de la transparencia fiscal y la gestión eficiente de los recursos públicos mediante el análisis técnico, la investigación aplicada y la promoción de políticas públicas basadas en evidencia. El Instituto Pulso Fiscal busca generar conocimiento, información y espacios de debate que impulsen una administración pública más responsable y orientada al desarrollo sostenible del país.
                </p>
              </motion.article>

              <motion.article
                className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={isInViewMission ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-8">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-display font-extrabold text-navy-950 mb-6">Visión</h2>
                <p className="text-slate-600 leading-relaxed">
                  Ser una institución de referencia nacional e internacional en el análisis económico y fiscal, reconocida por su independencia técnica, rigurosidad académica y compromiso con la transparencia y la sostenibilidad de las finanzas públicas.
                </p>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="bg-white py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="home-kicker">Nuestro Equipo</span>
              <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-navy-950 mt-4 mb-6 leading-tight">
                Profesionales comprometidos con el análisis fiscal
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Conoce a los especialistas que impulsan la investigación y el análisis del Instituto Pulso Fiscal.
              </p>
            </div>

            <div ref={teamRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInViewTeam ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-brand-200 transition-colors shadow-lg bg-gradient-to-br from-brand-100 to-brand-300 flex items-center justify-center">
                    <span className="text-brand-700 font-display font-black text-3xl">{member.initials}</span>
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-navy-950">{member.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{member.role}</p>
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