"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/ipf/Header";
import PageHero from "@/components/ipf/PageHero";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

/* ================================ */
/* TYPES                              */
/* ================================ */

interface CategoryConfig {
  name: string;
  icon: string;
  color: string;
  bg: string;
}

interface PublicationTypeConfig {
  name: string;
  icon: string;
  color: string;
}

interface Report {
  id: number;
  title: string;
  publicationType: string;
  category: string;
  date: string;
  year: string;
  description: string;
  isPremium: boolean;
  cover: string;
  url: string;
  config: {
    icon: string;
    color: string;
    bg_light: string;
    text_color: string;
  };
}

/* ================================ */
/* DATA                               */
/* ================================ */

const categoryConfig: CategoryConfig[] = [
  { name: "Macroeconomía", icon: "trending-up", color: "#1D4ED8", bg: "blue" },
  { name: "Política Fiscal", icon: "landmark", color: "#B45309", bg: "amber" },
  { name: "Sectores Económicos", icon: "factory", color: "#047857", bg: "emerald" },
  { name: "Mercados", icon: "bar-chart-2", color: "#0E7490", bg: "cyan" },
  { name: "Presupuesto Público", icon: "layout-grid", color: "#C2410C", bg: "orange" },
  { name: "Sistemas Administrativos", icon: "settings-2", color: "#6D28D9", bg: "violet" },
  { name: "Inversión Pública", icon: "building-2", color: "#0F766E", bg: "teal" },
  { name: "Gestión Pública", icon: "clipboard-check", color: "#1E40AF", bg: "blue" },
  { name: "Políticas Públicas", icon: "scale", color: "#7C3AED", bg: "violet" },
  { name: "Desafíos Sociales", icon: "users", color: "#BE185D", bg: "pink" },
];

const publicationTypeConfig: PublicationTypeConfig[] = [
  { name: "Artículos", icon: "file-text", color: "#1D4ED8" },
  { name: "Reportes periódicos", icon: "bar-chart-2", color: "#B45309" },
  { name: "Informes", icon: "clipboard-list", color: "#047857" },
  { name: "Guías de Estudio", icon: "book-open", color: "#6D28D9" },
  { name: "Investigaciones", icon: "microscope", color: "#0E7490" },
];

const reports: Report[] = [
  {
    id: 22,
    title: "Publicacion de Prueba (Gratuita)",
    publicationType: "Artículos",
    category: "Macroeconomía",
    date: "02 Jul 2026",
    year: "2026",
    description: "Descripción Corta (Resumen) de Publicacion de Prueba (Gratuita)",
    isPremium: false,
    cover: "/assets/img/1783014957_c74c4821.jpeg",
    url: "/assets/pdf/1783014957_1f74c0b7.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 23,
    title: "Publicacion de Prueba (Exclusiva - Estandar)",
    publicationType: "Artículos",
    category: "Macroeconomía",
    date: "02 Jul 2026",
    year: "2026",
    description: "Descripción Corta (Resumen) de Publicacion de Prueba (Exclusiva - Estandar)",
    isPremium: true,
    cover: "/assets/img/1783014978_fac66600.jpeg",
    url: "/assets/pdf/1783014978_b877bdba.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 24,
    title: "Publicacion de Prueba (Exclusiva - Premium)",
    publicationType: "Artículos",
    category: "Macroeconomía",
    date: "02 Jul 2026",
    year: "2026",
    description: "Descripción Corta (Resumen)\nPublicacion de Prueba (Exclusiva - Premium)",
    isPremium: true,
    cover: "/assets/img/1783015006_b821c56b.jpeg",
    url: "/assets/pdf/1783015006_77c2e242.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 21,
    title: "REPORTE MENSUAL DE PRODUCCIÓN NACIONAL",
    publicationType: "Reportes periódicos",
    category: "Macroeconomía",
    date: "01 Jul 2026",
    year: "2026",
    description: "El presente reporte analiza la producción nacional en el Perú a marzo de 2026.",
    isPremium: true,
    cover: "/assets/img/1782947717_61364768.png",
    url: "/assets/pdf/1782947717_3fe99d5d.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 4,
    title: "Semana Fiscal — Edición 22, Junio 2026",
    publicationType: "Informes",
    category: "Política Fiscal",
    date: "02 Jun 2026",
    year: "2026",
    description: "Boletín semanal con las principales novedades tributarias, resoluciones SUNAT y modificaciones normativas.",
    isPremium: true,
    cover: "/assets/img/publicaciones/semana-fiscal-22.jpg",
    url: "/assets/pdf/semana-fiscal-22-junio-2026.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 8,
    title: "Reforma del Sistema Pensionario Peruano: Implicancias Fiscales",
    publicationType: "Reportes periódicos",
    category: "Política Fiscal",
    date: "28 Abr 2026",
    year: "2026",
    description: "Análisis del impacto fiscal de las propuestas de reforma al sistema de pensiones en debate en el Congreso.",
    isPremium: true,
    cover: "/assets/img/publicaciones/reforma-pensionaria.jpg",
    url: "/assets/pdf/reforma-pensionaria-implicancias-fiscales.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 1,
    title: "Panorama Económico del Perú: Primer Trimestre 2026",
    publicationType: "Reportes periódicos",
    category: "Macroeconomía",
    date: "15 Abr 2026",
    year: "2026",
    description: "Análisis del comportamiento del PBI, inflación y tipo de cambio durante el primer trimestre del año.",
    isPremium: false,
    cover: "/assets/img/publicaciones/panorama-economico-q1-2026.jpg",
    url: "#",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 9,
    title: "Investigación Especial: Evasión Tributaria en el Perú 2025",
    publicationType: "Reportes periódicos",
    category: "Política Fiscal",
    date: "05 Abr 2026",
    year: "2026",
    description: "Estudio profundo sobre los mecanismos de evasión fiscal más frecuentes y su impacto en la recaudación.",
    isPremium: true,
    cover: "/assets/img/publicaciones/evasion-tributaria-2025.jpg",
    url: "/assets/pdf/evasion-tributaria-peru-2025.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 10,
    title: "Competitividad Regional: Índice de Gestión Fiscal Subnacional 2025",
    publicationType: "Reportes periódicos",
    category: "Política Fiscal",
    date: "20 Mar 2026",
    year: "2026",
    description: "Ranking de los 25 gobiernos regionales según su eficiencia en ejecución presupuestal y gestión de recursos.",
    isPremium: true,
    cover: "/assets/img/publicaciones/competitividad-regional-2025.jpg",
    url: "/assets/pdf/competitividad-regional-2025.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 17,
    title: "Perspectivas Económicas Peru 2024-2025",
    publicationType: "Reportes periódicos",
    category: "Macroeconomía",
    date: "02 May 2024",
    year: "2024",
    description: "Proyecciones macroeconómicas para el bienio 2024-2025.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/perspectivas-2024-2025.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 20,
    title: "Análisis Comparativo: Sistemas Fiscales Andinos",
    publicationType: "Investigaciones",
    category: "Política Fiscal",
    date: "25 Abr 2024",
    year: "2024",
    description: "Estudio comparado de los sistemas tributarios de Chile, Colombia y Perú.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/comparativo-fiscal-andino.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 16,
    title: "Impacto de la Reforma Tributaria en las MYPE Peruanas",
    publicationType: "Investigaciones",
    category: "Política Fiscal",
    date: "18 Abr 2024",
    year: "2024",
    description: "Investigación sobre los efectos de los cambios en el Régimen MYPE Tributario.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/reforma-tributaria-mype.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 14,
    title: "Reporte Fiscal Peru Q1 2024: Recaudación y Perspectivas",
    publicationType: "Reportes periódicos",
    category: "Macroeconomía",
    date: "05 Abr 2024",
    year: "2024",
    description: "Análisis detallado de la recaudación tributaria del primer trimestre 2024, comparativa interanual y proyecciones para el resto del año.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/reporte-fiscal-q1-2024.pdf",
    config: { icon: "trending-up", color: "#1D4ED8", bg_light: "bg-blue-50", text_color: "text-blue-700" },
  },
  {
    id: 15,
    title: "Análisis del Presupuesto General de la República 2024",
    publicationType: "Informes",
    category: "Presupuesto Público",
    date: "28 Mar 2024",
    year: "2024",
    description: "Examen exhaustivo de la estructura del presupuesto nacional 2024.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/presupuesto-2024.pdf",
    config: { icon: "layout-grid", color: "#C2410C", bg_light: "bg-orange-50", text_color: "text-orange-700" },
  },
  {
    id: 11,
    title: "El Sistema Tributario Peruano: Visión General 2024",
    publicationType: "Artículos",
    category: "Política Fiscal",
    date: "15 Mar 2024",
    year: "2024",
    description: "Un panorama completo del sistema tributario del Perú, sus pilares fundamentales y los cambios recientes que afectan a empresas y personas naturales.",
    isPremium: false,
    cover: "",
    url: "#",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 19,
    title: "Informe de Deuda Pública Peruana: Sostenibilidad",
    publicationType: "Informes",
    category: "Política Fiscal",
    date: "10 Mar 2024",
    year: "2024",
    description: "Evaluación de la sostenibilidad de la deuda pública peruana.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/deuda-publica-2024.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 12,
    title: "¿Qué es la Política Fiscal y por qué importa?",
    publicationType: "Artículos",
    category: "Política Fiscal",
    date: "20 Feb 2024",
    year: "2024",
    description: "Introducción accesible a los conceptos de política fiscal, gasto público e impuestos, y su impacto en la economía peruana cotidiana.",
    isPremium: false,
    cover: "/assets/img/1781906318_dce7761e.png",
    url: "/assets/pdf/1781906318_0acb6b04.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 18,
    title: "Guía Práctica: Declaración Anual de Renta 2024",
    publicationType: "Guías de Estudio",
    category: "Política Fiscal",
    date: "12 Feb 2024",
    year: "2024",
    description: "Manual paso a paso para la declaración anual del Impuesto a la Renta.",
    isPremium: true,
    cover: "",
    url: "/uploads/pdfs/guia-renta-pn-2024.pdf",
    config: { icon: "landmark", color: "#B45309", bg_light: "bg-amber-50", text_color: "text-amber-700" },
  },
  {
    id: 13,
    title: "Glosario Esencial de Términos Económicos y Fiscales",
    publicationType: "Guías de Estudio",
    category: "Políticas Públicas",
    date: "10 Ene 2024",
    year: "2024",
    description: "Referencia rápida con los términos más utilizados en análisis fiscal, presupuesto público y política económica peruana.",
    isPremium: false,
    cover: "",
    url: "#",
    config: { icon: "scale", color: "#7C3AED", bg_light: "bg-purple-50", text_color: "text-purple-700" },
  },
];

const publicationTabTypes = [
  "Todos",
  "Artículos",
  "Reportes periódicos",
  "Informes",
  "Guías de Estudio",
  "Investigaciones",
];

const categoryOptions = [
  "Todas",
  "Macroeconomía",
  "Política Fiscal",
  "Sectores Económicos",
  "Mercados",
  "Presupuesto Público",
  "Sistemas Administrativos",
  "Inversión Pública",
  "Gestión Pública",
  "Políticas Públicas",
  "Desafíos Sociales",
];

const yearOptions = ["Todos", "2026", "2025", "2024"];

/* ================================ */
/* INLINE SVG ICONS                   */
/* ================================ */

function IconSvg({ name, size = 14, className = "" }: { name: string; size?: number; className?: string }) {
  const icons: Record<string, string> = {
    "trending-up":
      '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    landmark:
      '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    factory:
      '<path d="M2 20V8l5 4V8l5 4V4h8a2 2 0 0 1 2 2v14H2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
    "bar-chart-2":
      '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    "layout-grid":
      '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    "settings-2":
      '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
    "building-2":
      '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    "clipboard-check":
      '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    scale:
      '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "file-text":
      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    "clipboard-list":
      '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><line x1="8" y1="11" x2="8" y2="11.01"/><line x1="8" y1="16" x2="8" y2="16.01"/>',
    "book-open":
      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    microscope:
      '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    crown:
      '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
    search:
      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "search-x":
      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m8 8 6 6"/><path d="m14 8-6 6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    lock:
      '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    download:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    eye:
      '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    filter:
      '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  };

  const pathData = icons[name];
  if (!pathData) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <g dangerouslySetInnerHTML={{ __html: pathData }} />
    </svg>
  );
}

/* ================================ */
/* PUBLICATION CARD COMPONENT        */
/* ================================ */

function PublicationCard({ report, index }: { report: Report; index: number }) {
  const catConf = categoryConfig.find((c) => c.name === report.category);
  const hasCover = !!report.cover;

  return (
    <motion.article
      className="report-card group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-sm group-hover:shadow-lg transition-all duration-500">
        {hasCover ? (
          <>
            <img
              src={report.cover}
              alt={report.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
          </>
        ) : (
          <div
            className="w-full h-full flex flex-col p-8"
            style={{ background: report.config.color }}
          >
            <span className="pub-card-code">
              {report.publicationType} #{report.id}
            </span>
            <h3 className="pub-card-title text-white mt-auto mb-4">
              {report.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="pub-card-footer-logo text-white/70">
                Instituto Pulso Fiscal
              </span>
              <IconSvg
                name={report.config.icon}
                size={32}
                className="text-white opacity-20"
              />
            </div>
          </div>
        )}

        {/* Icon strip */}
        <div className="pub-card-icons-strip">
          {categoryConfig.map((cat) => (
            <div
              key={cat.name}
              className={`pub-card-icon-mini ${cat.name === report.category ? "is-active" : ""}`}
              style={{ "--pub-color": cat.color } as React.CSSProperties}
              title={cat.name}
            >
              <IconSvg name={cat.icon} size={14} />
            </div>
          ))}
        </div>

        {/* Premium badge */}
        <div className="absolute top-4 left-4">
          {report.isPremium && (
            <span className="badge-premium">
              <IconSvg name="crown" size={12} />
              {" "}Premium
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 pt-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="px-2.5 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-wider"
            style={{ background: report.config.color }}
          >
            {report.category}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[9px] font-bold text-slate-600 bg-slate-100 border border-slate-200 uppercase tracking-wider">
            {report.publicationType}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-auto">
            {report.year}
          </span>
        </div>

        <h3 className="text-base font-bold text-navy-950 mb-4 group-hover:text-brand-700 transition-colors leading-tight line-clamp-2">
          {report.title}
        </h3>

        <div className="flex items-center justify-between">
          <a
            href={`/publicacion/${report.id}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] hover:underline flex items-center gap-1.5"
            style={{ color: report.config.color }}
          >
            VER DOCUMENTO »
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ================================ */
/* MAIN COMPONENT                     */
/* ================================ */

export default function ReportesPage() {
  const [filterPublicationType, setFilterPublicationType] = useState("Todos");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [filterYear, setFilterYear] = useState("Todos");
  const gridRef = useRef<HTMLDivElement>(null);

  const isFiltered =
    filterPublicationType !== "Todos" ||
    filterCategory !== "Todas" ||
    filterYear !== "Todos";

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchCategory =
        filterCategory === "Todas" || r.category === filterCategory;
      const matchType =
        filterPublicationType === "Todos" ||
        r.publicationType === filterPublicationType;
      const matchYear =
        filterYear === "Todos" || r.year === filterYear;
      return matchCategory && matchType && matchYear;
    });
  }, [filterPublicationType, filterCategory, filterYear]);

  /* Tab counts from the filtered data (before type filter) */
  const categoryYearFiltered = useMemo(() => {
    return reports.filter((r) => {
      const matchCategory =
        filterCategory === "Todas" || r.category === filterCategory;
      const matchYear =
        filterYear === "Todos" || r.year === filterYear;
      return matchCategory && matchYear;
    });
  }, [filterCategory, filterYear]);

  const tabCounts = useMemo(() => {
    return publicationTabTypes.map((type) => {
      if (type === "Todos") return categoryYearFiltered.length;
      return categoryYearFiltered.filter((r) => r.publicationType === type).length;
    });
  }, [categoryYearFiltered]);

  const resetFilters = useCallback(() => {
    setFilterPublicationType("Todos");
    setFilterCategory("Todas");
    setFilterYear("Todos");
  }, []);

  /* Reports grouped by publication type (for default view) */
  const groupedReports = useMemo(() => {
    const groups: { type: string; reports: Report[] }[] = [];
    for (const pt of publicationTypeConfig) {
      const typeReports = filteredReports.filter(
        (r) => r.publicationType === pt.name
      );
      if (typeReports.length > 0) {
        groups.push({ type: pt.name, reports: typeReports });
      }
    }
    return groups;
  }, [filteredReports]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageHero
          badge="Semana Fiscal"
          title={<>Publicaciones y <span>Análisis Técnico</span></>}
          subtitle="Accede a reportes especializados sobre macroeconomía, política fiscal, presupuesto público y gestión pública en el Perú."
          gradient="linear-gradient(135deg, #020617 0%, #0b3f6b 50%, #064b81 100%)"
          pattern="radial-gradient(circle at 30% 60%, rgba(124,200,251,0.15) 0%, transparent 60%)"
        />
        <div className="container mx-auto px-6">

          {/* 3. ADVANCED FILTER BAR */}
          <div className="py-3 mb-8 z-[60]">
            <div className="bg-white p-5 rounded-[28px] shadow-xl shadow-slate-200/40 border border-slate-100">
              <div className="grid lg:grid-cols-3 gap-8 items-end">
                {/* Publication Type */}
                <div>
                  <label className="filter-label">Tipo de Publicación</label>
                  <select
                    value={filterPublicationType}
                    onChange={(e) => setFilterPublicationType(e.target.value)}
                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-600 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="Todos">Todas</option>
                    <option value="Artículos">Artículos</option>
                    <option value="Reportes periódicos">
                      Reportes Periódicos
                    </option>
                    <option value="Informes">Informes</option>
                    <option value="Guías de Estudio">Guías de Estudio</option>
                    <option value="Investigaciones">Investigaciones</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="filter-label">Categoría</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-600 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      backgroundSize: "16px",
                    }}
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="filter-label">Año</label>
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none text-sm font-bold text-slate-600 cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      backgroundSize: "16px",
                    }}
                  >
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>
                        {y === "Todos" ? "Todos" : y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* PUBLICATION TYPE TABS */}
          <div className="publication-filter-tabs">
            {publicationTabTypes.map((type, i) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterPublicationType(type)}
                className={filterPublicationType === type ? "is-active" : ""}
              >
                <span>{type}</span>
                <small>{tabCounts[i]}</small>
              </button>
            ))}
          </div>

          {/* ============================== */}
          {/* DEFAULT VIEW (no type filter)   */}
          {/* ============================== */}
          {!isFiltered && (
            <div>
              {groupedReports.map((group) => {
                const typeConf = publicationTypeConfig.find(
                  (pt) => pt.name === group.type
                );
                return (
                  <section key={group.type} className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `${typeConf?.color}14`,
                            color: typeConf?.color,
                          }}
                        >
                          <IconSvg
                            name={typeConf?.icon || "file-text"}
                            size={24}
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-navy-950">
                            {group.type}
                          </h2>
                          <p className="text-sm text-slate-400">
                            Últimas publicaciones de tipo {group.type.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFilterPublicationType(group.type);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-brand-700 font-bold text-sm hover:underline flex items-center gap-2"
                      >
                        Ver todas <IconSvg name="arrow-right" size={16} />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <AnimatePresence mode="popLayout">
                        {group.reports.map((report, i) => (
                          <PublicationCard
                            key={report.id}
                            report={report}
                            index={i}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* ============================== */}
          {/* FILTERED VIEW (single grid)     */}
          {/* ============================== */}
          {isFiltered && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Mostrando{" "}
                  <span className="text-brand-700">
                    {filteredReports.length}
                  </span>{" "}
                  publicaciones
                  {filterPublicationType !== "Todos" && (
                    <span>
                      {" "}
                      de tipo{" "}
                      <span className="text-brand-700">
                        {filterPublicationType}
                      </span>
                    </span>
                  )}
                </p>
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-brand-700 hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>

              {filteredReports.length > 0 ? (
                <div
                  ref={gridRef}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredReports.map((report, i) => (
                      <PublicationCard
                        key={report.id}
                        report={report}
                        index={i}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="py-32 text-center bg-white rounded-[48px] border border-dashed border-slate-200">
                  <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-8">
                    <IconSvg name="search-x" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-950 mb-3">
                    No se encontraron reportes
                  </h3>
                  <p className="text-slate-500">
                    Ajuste los términos de búsqueda o los filtros aplicados.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-8 text-brand-700 font-bold underline"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}