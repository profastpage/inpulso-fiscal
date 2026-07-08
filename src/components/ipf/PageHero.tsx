"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export interface PageHeroProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  /** CSS gradient for the hero background */
  gradient?: string;
  /** CSS radial/pattern overlay */
  pattern?: string;
  children?: React.ReactNode;
  /** Dark variant — uses navy gradient with white text (backward compat) */
  dark?: boolean;
}

const LIGHT_GRADIENT =
  "linear-gradient(160deg, #f0f7ff 0%, #e0effe 30%, #bae2fd 60%, #e0effe 100%)";
const LIGHT_PATTERN =
  "radial-gradient(circle at 80% 20%, rgba(14,140,225,0.12) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(3,88,156,0.08) 0%, transparent 50%)";

const DARK_GRADIENT =
  "linear-gradient(135deg, #0f172a 0%, #072848 40%, #03589c 100%)";
const DARK_PATTERN =
  "radial-gradient(circle at 70% 30%, rgba(14,140,225,0.2) 0%, transparent 60%)";

export default function PageHero({
  badge,
  title,
  subtitle,
  gradient,
  pattern,
  children,
  dark = false,
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const isDark = dark || !!gradient?.includes("#0f172a") || !!gradient?.includes("#020617");

  const resolvedGradient = gradient || (isDark ? DARK_GRADIENT : LIGHT_GRADIENT);
  const resolvedPattern = pattern || (isDark ? DARK_PATTERN : LIGHT_PATTERN);

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

  const colorClass = isDark ? "page-hero--dark" : "page-hero--light";

  return (
    <section className={`page-hero ${colorClass}`}>
      {/* Background */}
      <div className="page-hero__bg">
        <div
          className="page-hero__gradient"
          style={{ background: resolvedGradient }}
        />
        <div
          className="page-hero__pattern"
          style={{ background: resolvedPattern }}
        />
        {/* Subtle grid */}
        <div className="page-hero__grid" />
        {/* Bottom fade to content area */}
        <div className={`page-hero__fade ${isDark ? "" : "page-hero__fade--light"}`} />
      </div>

      {/* Content */}
      <div className="page-hero__content" ref={contentRef}>
        <div className="page-hero__inner">
          {badge && (
            <motion.span className={`page-hero__badge page-hero-badge-anim ${isDark ? "" : "page-hero__badge--light"}`}>
              {badge}
            </motion.span>
          )}
          <h1 className={`page-hero__title page-hero-title-anim ${isDark ? "" : "page-hero__title--light"}`}>{title}</h1>
          {subtitle && (
            <p className={`page-hero__subtitle page-hero-subtitle-anim ${isDark ? "" : "page-hero__subtitle--light"}`}>
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`page-hero-children-anim ${isDark ? "" : "page-hero-children--light"}`}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}