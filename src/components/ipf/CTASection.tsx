"use client";

import { useRef, useEffect } from "react";
import { Shield, Zap, Lock, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guarantees = [
  { icon: <Shield className="w-4 h-4" />, text: "Sin contratos de permanencia" },
  { icon: <Zap className="w-4 h-4" />, text: "Acceso inmediato tras el pago" },
  { icon: <Lock className="w-4 h-4" />, text: "Pago 100% seguro" },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-badge-anim", {
        scrollTrigger: { trigger: ".cta-badge-anim", start: "top 90%" },
        opacity: 0, y: 15, duration: 0.5,
      });
      gsap.from(".cta-title-anim", {
        scrollTrigger: { trigger: ".cta-title-anim", start: "top 88%" },
        opacity: 0, y: 25, duration: 0.7, delay: 0.1,
      });
      gsap.from(".cta-subtitle-anim", {
        scrollTrigger: { trigger: ".cta-subtitle-anim", start: "top 88%" },
        opacity: 0, y: 20, duration: 0.5, delay: 0.2,
      });
      gsap.from(".cta-actions-anim", {
        scrollTrigger: { trigger: ".cta-actions-anim", start: "top 88%" },
        opacity: 0, y: 20, duration: 0.5, delay: 0.3,
      });
      guarantees.forEach((_, i) => {
        gsap.from(`.cta-guarantee-${i}`, {
          scrollTrigger: { trigger: `.cta-guarantee-${i}`, start: "top 90%" },
          opacity: 0, y: 10, duration: 0.4, delay: 0.4 + i * 0.08,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 text-center" style={{ background: "#020617" }}>
      <div className="cta-badge-anim inline-block text-[10px] font-black tracking-[0.25em] uppercase text-brand-300 border border-brand-800 rounded-full px-4 py-1.5 mb-6">
        Oportunidad Institucional
      </div>

      <h2 className="cta-title-anim font-display font-black text-[clamp(1.8rem,4vw,3rem)] text-white leading-[1.12] max-w-[700px] mx-auto mb-5" style={{ letterSpacing: "-0.025em" }}>
        Eleve su toma de decisiones
        <br />
        <span className="text-brand-400">con el rigor del IPF</span>
      </h2>

      <p className="cta-subtitle-anim text-base text-slate-400 max-w-[500px] mx-auto mb-9 leading-relaxed">
        Únase hoy a nuestra red de suscriptores y acceda a la inteligencia
        fiscal más profunda del mercado peruano.
      </p>

      <motion.div
        className="cta-actions-anim flex items-center justify-center gap-3 flex-wrap mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <a href="/suscripciones" className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-bold text-white rounded-2xl transition-all hover:-translate-y-0.5" style={{ background: "#ea580c", boxShadow: "0 8px 30px rgba(234,88,12,0.3)" }}>
          Empezar Suscripción
          <ArrowRight className="w-5 h-5" />
        </a>
        <a href="/contacto" className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-bold text-white rounded-2xl border border-white/20 transition-all hover:bg-white/5">
          Contactar Asesor
        </a>
      </motion.div>

      <div className="flex items-center justify-center gap-8 flex-wrap">
        {guarantees.map((g, i) => (
          <div key={g.text} className={`flex items-center gap-2 text-xs font-semibold text-slate-500 cta-guarantee-${i}`}>
            {g.icon}
            {g.text}
          </div>
        ))}
      </div>
    </section>
  );
}