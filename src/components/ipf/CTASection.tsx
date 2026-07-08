"use client";

import { useRef, useEffect } from "react";
import { Shield, Zap, Lock, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guarantees = [
  { icon: <Shield className="w-4 h-4 text-brand-600" />, text: "Sin contratos de permanencia" },
  { icon: <Zap className="w-4 h-4 text-brand-600" />, text: "Acceso inmediato tras el pago" },
  { icon: <Lock className="w-4 h-4 text-brand-600" />, text: "Pago 100% seguro" },
];

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-badge-anim", {
        scrollTrigger: { trigger: ".cta-badge-anim", start: "top 90%" },
        opacity: 0,
        y: 15,
        duration: 0.5,
      });
      gsap.from(".cta-title-anim", {
        scrollTrigger: { trigger: ".cta-title-anim", start: "top 88%" },
        opacity: 0,
        y: 25,
        duration: 0.7,
        delay: 0.1,
      });
      gsap.from(".cta-subtitle-anim", {
        scrollTrigger: { trigger: ".cta-subtitle-anim", start: "top 88%" },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.2,
      });
      gsap.from(".cta-actions-anim", {
        scrollTrigger: { trigger: ".cta-actions-anim", start: "top 88%" },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
      });
      guarantees.forEach((_, i) => {
        gsap.from(`.cta-guarantee-${i}`, {
          scrollTrigger: { trigger: `.cta-guarantee-${i}`, start: "top 90%" },
          opacity: 0,
          y: 10,
          duration: 0.4,
          delay: 0.4 + i * 0.08,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="cta-final-v4">
      <div className="cta-final-v4__badge cta-badge-anim">
        Oportunidad Institucional
      </div>

      <h2 className="cta-final-v4__title cta-title-anim">
        Eleve su toma de decisiones
        <br />
        <span>con el rigor del IPF</span>
      </h2>

      <p className="cta-final-v4__subtitle cta-subtitle-anim">
        Únase hoy a nuestra red de suscriptores y acceda a la inteligencia
        fiscal más profunda del mercado peruano.
      </p>

      <motion.div
        className="cta-final-v4__actions cta-actions-anim"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <a href="#" className="cta-final-v4__btn-primary">
          Empezar Suscripción
          <ArrowRight className="w-5 h-5" />
        </a>
        <a href="#" className="cta-final-v4__btn-secondary">
          Contactar Asesor
        </a>
      </motion.div>

      <div className="cta-final-v4__guarantees">
        {guarantees.map((g, i) => (
          <div
            key={g.text}
            className={`cta-final-v4__guarantee cta-guarantee-${i}`}
          >
            {g.icon}
            {g.text}
          </div>
        ))}
      </div>
    </section>
  );
}