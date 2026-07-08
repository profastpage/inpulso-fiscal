"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Info,
  X,
  Check,
  Download,
  Lock,
  GraduationCap,
} from "lucide-react";
import Header from "@/components/ipf/Header";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================ */
/* TYPES                                                            */
/* ================================================================ */

interface Course {
  id: number;
  title: string;
  category: string;
  teacher: string;
  startDate: string;
  duration: string;
  modality: string;
  priceOriginal: string;
  priceCurrent: string;
  status: string;
  cover: string;
  description: string;
  syllabusUrl: string;
  syllabusTitle: string;
  syllabusDescription: string;
  objective: string;
  audience: string;
  includes: string[];
}

/* ================================================================ */
/* DATA                                                             */
/* ================================================================ */

const FILTERS = [
  "Todos",
  "Presupuesto Público",
  "Inversión Pública",
  "Planeamiento Estratégico",
  "Gestión Pública",
  "APP",
] as const;

type FilterValue = (typeof FILTERS)[number];

const COURSES: Course[] = [
  {
    id: 2,
    title: "Análisis Macroeconómico para No Economistas",
    category: "Virtual",
    teacher: "Por definir",
    startDate: "16/06/2026",
    duration: "30 horas",
    modality: "Virtual",
    priceOriginal: "S/ 220.00",
    priceCurrent: "S/ 220.00",
    status: "Activo",
    cover: "assets/img/cursos/macroeconomia.jpg",
    description:
      "Comprende los indicadores económicos clave que impactan en las decisiones de política fiscal y empresarial. PBI, inflación, tipo de cambio, balanza comercial y política monetaria explicados de forma práctica y aplicada al contexto peruano.",
    syllabusUrl: "",
    syllabusTitle: "Análisis Macroeconómico para No Economistas",
    syllabusDescription:
      "Comprende los indicadores económicos clave que impactan en las decisiones de política fiscal y empresarial. PBI, inflación, tipo de cambio, balanza comercial y política monetaria explicados de forma práctica y aplicada al contexto peruano.",
    objective:
      "Fortalecer las capacidades técnicas de los participantes en Análisis Macroeconómico para No Economistas.",
    audience: "Dirigido a profesionales y gestores públicos.",
    includes: [
      "Acceso al curso completo",
      "Materiales digitales",
      "Certificación institucional",
    ],
  },
  {
    id: 8,
    title: "Finanzas Municipales y Transferencias",
    category: "Virtual en vivo",
    teacher: "Por definir",
    startDate: "07/10/2024",
    duration: "28 horas",
    modality: "Virtual en vivo",
    priceOriginal: "S/ 550.00",
    priceCurrent: "S/ 550.00",
    status: "Proximamente",
    cover: "assets/img/imgsld1.jpg",
    description: "Canon, regalías, FONCOMUN y gestión.",
    syllabusUrl: "",
    syllabusTitle: "Finanzas Municipales y Transferencias",
    syllabusDescription: "Canon, regalías, FONCOMUN y gestión.",
    objective:
      "Fortalecer las capacidades técnicas de los participantes en Finanzas Municipales y Transferencias.",
    audience: "Dirigido a profesionales y gestores públicos.",
    includes: [
      "Acceso al curso completo",
      "Materiales digitales",
      "Certificación institucional",
    ],
  },
  {
    id: 7,
    title: "Análisis Macroeconómico Sector Público",
    category: "Virtual en vivo",
    teacher: "Por definir",
    startDate: "02/09/2024",
    duration: "36 horas",
    modality: "Virtual en vivo",
    priceOriginal: "S/ 750.00",
    priceCurrent: "S/ 750.00",
    status: "Proximamente",
    cover: "assets/img/imgsld1.jpg",
    description: "Herramientas cuantitativas para indicadores.",
    syllabusUrl: "",
    syllabusTitle: "Análisis Macroeconómico Sector Público",
    syllabusDescription: "Herramientas cuantitativas para indicadores.",
    objective:
      "Fortalecer las capacidades técnicas de los participantes en Análisis Macroeconómico Sector Público.",
    audience: "Dirigido a profesionales y gestores públicos.",
    includes: [
      "Acceso al curso completo",
      "Materiales digitales",
      "Certificación institucional",
    ],
  },
  {
    id: 6,
    title: "Presupuesto Público y Gestión por Resultados",
    category: "Virtual en vivo",
    teacher: "Por definir",
    startDate: "01/08/2024",
    duration: "32 horas",
    modality: "Virtual en vivo",
    priceOriginal: "S/ 650.00",
    priceCurrent: "S/ 650.00",
    status: "Proximamente",
    cover: "assets/img/imgsld1.jpg",
    description: "Comprende el ciclo presupuestario peruano.",
    syllabusUrl: "",
    syllabusTitle: "Presupuesto Público y Gestión por Resultados",
    syllabusDescription: "Comprende el ciclo presupuestario peruano.",
    objective:
      "Fortalecer las capacidades técnicas de los participantes en Presupuesto Público y Gestión por Resultados.",
    audience: "Dirigido a profesionales y gestores públicos.",
    includes: [
      "Acceso al curso completo",
      "Materiales digitales",
      "Certificación institucional",
    ],
  },
  {
    id: 5,
    title: "Tributación Empresarial Avanzada",
    category: "Virtual en vivo",
    teacher: "Por definir",
    startDate: "15/07/2024",
    duration: "40 horas",
    modality: "Virtual en vivo",
    priceOriginal: "S/ 890.00",
    priceCurrent: "S/ 890.00",
    status: "Activo",
    cover: "assets/img/imgsld1.jpg",
    description: "Domina el Impuesto a la Renta de tercera categoría.",
    syllabusUrl: "",
    syllabusTitle: "Tributación Empresarial Avanzada",
    syllabusDescription: "Domina el Impuesto a la Renta de tercera categoría.",
    objective:
      "Fortalecer las capacidades técnicas de los participantes en Tributación Empresarial Avanzada.",
    audience: "Dirigido a profesionales y gestores públicos.",
    includes: [
      "Acceso al curso completo",
      "Materiales digitales",
      "Certificación institucional",
    ],
  },
];

/* Gradient variants for placeholder covers */
const COVER_GRADIENTS = [
  "from-brand-700 to-navy-950",
  "from-brand-800 to-navy-900",
  "from-navy-800 to-brand-900",
  "from-brand-600 to-navy-950",
  "from-brand-900 to-navy-800",
] as const;

/* ================================================================ */
/* HELPERS                                                          */
/* ================================================================ */

function getBadgeClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("abiert")) return "badge-abierto";
  if (s.includes("dispon")) return "badge-disponible";
  if (s.includes("próxim") || s.includes("proxim")) return "badge-proximo";
  if (s.includes("lanz")) return "badge-lanzamiento";
  if (s.includes("grab")) return "badge-grabado";
  return "badge-proximo";
}

function getFilteredCourses(
  courses: Course[],
  filter: FilterValue
): Course[] {
  if (filter === "Todos") return courses;
  return courses.filter(
    (c) =>
      c.category.toLowerCase().includes(filter.toLowerCase()) ||
      c.title.toLowerCase().includes(filter.toLowerCase())
  );
}

function getFilterLabel(filter: string): string {
  if (filter === "Todos") return "Todos los Programas";
  if (filter === "Planeamiento Estratégico") return "Planeamiento";
  return filter;
}

/* ================================================================ */
/* SYLLABUS MODAL                                                   */
/* ================================================================ */

function SyllabusModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 sm:p-4 lg:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white w-full max-w-6xl rounded-t-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-start sm:items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-700">
                Curso Especializado
              </div>
              <div className="text-lg sm:text-2xl font-extrabold text-navy-950 mt-2 leading-snug">
                {course.syllabusTitle}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-500 hover:text-navy-950 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
            {/* Left Column */}
            <div className="p-6 sm:p-10">
              <p className="text-slate-600 leading-relaxed text-base">
                {course.syllabusDescription}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    Inicio
                  </div>
                  <div className="text-sm font-extrabold text-navy-950 mt-2">
                    {course.startDate}
                  </div>
                </div>
                <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    Categoría
                  </div>
                  <div className="text-sm font-extrabold text-navy-950 mt-2">
                    {course.category}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="text-sm font-extrabold text-navy-950 mb-3">
                  Objetivo del Curso
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {course.objective}
                </p>
              </div>

              <div className="mt-8">
                <div className="text-sm font-extrabold text-navy-950 mb-3">
                  ¿A quién está dirigido?
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {course.audience}
                </p>
              </div>

              <div className="mt-10">
                <div className="text-sm font-extrabold text-navy-950 mb-3">
                  El pago incluye:
                </div>
                <ul className="space-y-2 text-slate-600">
                  {course.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column / Sidebar */}
            <aside className="bg-[#f8fafc] border-t lg:border-t-0 lg:border-l border-slate-100 p-6 sm:p-10">
              <div className="bg-white rounded-[28px] border border-slate-100 overflow-hidden shadow-sm">
                {/* Cover */}
                <div
                  className={`w-full h-[220px] bg-gradient-to-br ${
                    COVER_GRADIENTS[course.id % COVER_GRADIENTS.length]
                  } flex items-center justify-center`}
                >
                  <GraduationCap className="w-12 h-12 text-white/20" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-extrabold text-navy-950">
                      Inversión
                    </div>
                    <span className="bg-brand-50 text-brand-700 text-[10px] font-black px-3 py-1 rounded-full border border-brand-100 uppercase tracking-wider">
                      60% dto. Premium
                    </span>
                  </div>

                  <div className="mt-3">
                    {course.priceOriginal && (
                      <div className="text-slate-400 font-bold line-through">
                        {course.priceOriginal}
                      </div>
                    )}
                    <div className="text-3xl font-black text-navy-950">
                      {course.priceCurrent}
                    </div>
                  </div>

                  {course.syllabusUrl ? (
                    <a
                      href={course.syllabusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand-600 to-brand-700 text-white font-extrabold py-3 rounded-2xl shadow-lg shadow-brand-700/15 transition-opacity hover:opacity-90"
                    >
                      Descargar Syllabus
                      <Download className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-slate-200 text-slate-500 font-extrabold py-3 rounded-2xl cursor-not-allowed"
                      title="Syllabus próximamente disponible"
                      type="button"
                    >
                      Syllabus no disponible
                      <Lock className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================ */
/* COURSE CARD                                                      */
/* ================================================================ */

function CourseCard({
  course,
}: {
  course: Course;
  index: number;
}) {
  const gradientClass =
    COVER_GRADIENTS[course.id % COVER_GRADIENTS.length];

  return (
    <a
      href={`/curso?id=${course.id}`}
      className="course-card-premium group block h-full flex flex-col"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Media */}
      <div className="course-card-premium__media aspect-[16/10] rounded-t-[28px] cursor-pointer">
        {/* Placeholder gradient cover with centered icon */}
        <div
          className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
        >
          <GraduationCap className="w-10 h-10 text-white/20" />
        </div>

        {/* Status Badge */}
        <div className="course-card-premium__status">
          <span className={`badge ${getBadgeClass(course.status)}`}>
            {course.status}
          </span>
        </div>

        {/* Premium Discount Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-navy-950/90 text-[#7cc8fb] text-[10px] font-black px-3 py-1.5 rounded-full border border-[#7cc8fb]/30 backdrop-blur-md shadow-xl uppercase tracking-wider">
            60% descuento Premium
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="course-card-premium__overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="course-card-premium__kicker">
            {course.category}
          </div>
          <div className="course-card-premium__title">
            {course.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="course-card-premium__body flex-1 flex flex-col">
        <p className="course-card-premium__desc">{course.description}</p>

        <div className="course-card-premium__meta">
          <div>
            <span className="course-card-premium__label">Docente</span>
            <span className="course-card-premium__value">
              {course.teacher}
            </span>
          </div>
          <div>
            <span className="course-card-premium__label">Inicio</span>
            <span className="course-card-premium__value">
              {course.startDate}
            </span>
          </div>
          <div>
            <span className="course-card-premium__label">Duración</span>
            <span className="course-card-premium__value">
              {course.duration}
            </span>
          </div>
          <div>
            <span className="course-card-premium__label">Modalidad</span>
            <span className="course-card-premium__value">
              {course.modality}
            </span>
          </div>
        </div>

        <div className="course-card-premium__footer mt-auto">
          <div>
            <span className="course-card-premium__price-label">
              Inversión
            </span>
            <div className="course-card-premium__price">
              {course.priceCurrent}
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`/curso?id=${course.id}`}
              className="text-[10px] font-bold text-brand-700 hover:text-brand-800 underline transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Ver detalle
            </a>
            {course.syllabusUrl ? (
              <a
                href={course.syllabusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="course-card-premium__cta flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                Syllabus
                <Download className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                className="course-card-premium__cta opacity-40 cursor-not-allowed flex items-center gap-2"
                title="Syllabus próximamente disponible"
                onClick={(e) => e.stopPropagation()}
              >
                Syllabus
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

/* ================================================================ */
/* MAIN COMPONENT                                                   */
/* ================================================================ */

export default function CursosPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("Todos");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredCourses = getFilteredCourses(COURSES, activeFilter);

  /* GSAP ScrollTrigger for card entrance on initial page load */
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards =
        gridRef.current?.querySelectorAll(".course-card-premium");
      if (!cards || cards.length === 0) return;

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const closeSyllabus = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 sm:pt-32 pb-20 sm:pb-24">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-4xl mb-14 sm:mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-600 mb-4 block">
              Excelencia Académica
            </span>
            <h1 className="text-4xl lg:text-6xl font-display font-extrabold text-navy-950 mb-8 leading-tight">
              Programas de{" "}
              <span className="text-brand-700">
                Alta Especialización
              </span>{" "}
              en Gestión Pública
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Capacitación técnica de nivel avanzado para profesionales
              que lideran el sector público peruano. Formación basada en
              la experiencia real y el rigor institucional.
            </p>
          </div>

          {/* Filtering System */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
            <div className="flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-pill ${
                    activeFilter === filter
                      ? "filter-pill-active"
                      : "filter-pill-inactive"
                  }`}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {getFilterLabel(filter)}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Certificación Institucional Incluida
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div id="cursos-grid" className="courses-grid" ref={gridRef}>
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="h-full"
                  >
                    <CourseCard course={course} index={i} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-20"
                >
                  <p className="text-slate-400 text-lg">
                    No se encontraron programas para esta categoría.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Syllabus Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <SyllabusModal
            course={selectedCourse}
            onClose={closeSyllabus}
          />
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}