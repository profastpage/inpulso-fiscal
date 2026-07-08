"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const heroSlides = [
  {
    bg: "linear-gradient(135deg, #0f172a 0%, #072848 40%, #03589c 100%)",
    pattern: "radial-gradient(circle at 70% 30%, rgba(14,140,225,0.2) 0%, transparent 60%)",
  },
  {
    bg: "linear-gradient(135deg, #020617 0%, #0b3f6b 50%, #064b81 100%)",
    pattern: "radial-gradient(circle at 30% 60%, rgba(124,200,251,0.15) 0%, transparent 60%)",
  },
  {
    bg: "linear-gradient(135deg, #072848 0%, #0e8ce1 60%, #38aaf7 100%)",
    pattern: "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker-anim", { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from(".hero-title-anim", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".hero-desc-anim", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-actions-anim", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-hero relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              background: heroSlides[active].bg,
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: heroSlides[active].pattern }}
            />
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            {/* White overlay for text readability - left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrow */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex">
        <button
          onClick={() => setActive((prev) => (prev + 1) % heroSlides.length)}
          className="w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md text-navy-900 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/30 shadow-xl group"
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} className="home-shell relative z-10">
        <div className="max-w-3xl py-20 px-2 sm:px-0">
          <motion.span
            className="home-kicker hero-kicker-anim inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Instituto Pulso Fiscal
          </motion.span>

          <h1 className="text-navy-950 hero-title-anim">
            Tu fuente confiable de{" "}
            <span>conocimiento y análisis</span> económico y fiscal
          </h1>

          <p className="hero-desc-anim text-lg text-slate-600 mt-6">
            Análisis especializados, publicaciones técnicas y cursos sobre
            macroeconomía, política fiscal, presupuesto público y gestión
            pública.
          </p>

          <div className="home-actions hero-actions-anim mt-10 flex-col sm:flex-row">
            <a href="#" className="btn-primary w-full sm:w-auto justify-center">
              Conoce nuestros planes <Zap className="w-5 h-5" />
            </a>
            <a
              href="#servicios"
              className="text-navy-900 font-bold hover:text-brand-600 transition-colors flex items-center gap-2 sm:ml-8 justify-center"
            >
              Ver servicios
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: active === index ? "1rem" : "0.5rem",
              background: active === index ? "#0e8ce1" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}