"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  gradient?: string;
  pattern?: string;
  children?: React.ReactNode;
}

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #0f172a 0%, #072848 40%, #03589c 100%)";
const DEFAULT_PATTERN =
  "radial-gradient(circle at 70% 30%, rgba(14,140,225,0.2) 0%, transparent 60%)";

export default function PageHero({
  badge,
  title,
  subtitle,
  gradient = DEFAULT_GRADIENT,
  pattern = DEFAULT_PATTERN,
  children,
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".page-hero-badge-anim", { opacity: 0, y: 20, duration: 0.5, delay: 0.15 })
        .from(".page-hero-title-anim", { opacity: 0, y: 30, duration: 0.7 }, "-=0.25")
        .from(".page-hero-subtitle-anim", { opacity: 0, y: 20, duration: 0.5 }, "-=0.35")
        .from(".page-hero-children-anim", { opacity: 0, y: 20, duration: 0.5 }, "-=0.25");
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="page-hero">
      {/* Background */}
      <div className="page-hero__bg">
        <div
          className="page-hero__gradient"
          style={{ background: gradient }}
        />
        <div
          className="page-hero__pattern"
          style={{ background: pattern }}
        />
        {/* Subtle grid */}
        <div className="page-hero__grid" />
        {/* Bottom fade to content area */}
        <div className="page-hero__fade" />
      </div>

      {/* Content */}
      <div className="page-hero__content" ref={contentRef}>
        <div className="page-hero__inner">
          {badge && (
            <motion.span className="page-hero__badge page-hero-badge-anim">
              {badge}
            </motion.span>
          )}
          <h1 className="page-hero__title page-hero-title-anim">{title}</h1>
          {subtitle && (
            <p className="page-hero__subtitle page-hero-subtitle-anim">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="page-hero-children-anim">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}