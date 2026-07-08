"use client";

import { useRef, useEffect } from "react";
import {
  FileText,
  BarChart3,
  NotebookText,
  BookOpenCheck,
  Microscope,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tags = [
  "Macroeconomía",
  "Política Fiscal",
  "Presupuesto Público",
  "Sistemas Administrativos",
  "Gestión Pública",
  "Políticas Públicas",
];

const publications = [
  {
    icon: <FileText className="w-5 h-5 text-brand-600" />,
    title: "Artículos",
    desc: "Análisis técnico, claro y breve de la coyuntura del país en macroeconomía, política fiscal, presupuesto público, gestión y políticas públicas.",
    href: "#",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-brand-600" />,
    title: "Reportes",
    desc: "Seguimiento periódico de variables clave como el gasto público, déficit fiscal, PBI, inflación y tipo de cambio.",
    href: "#",
  },
  {
    icon: <NotebookText className="w-5 h-5 text-brand-600" />,
    title: "Informes",
    desc: "Documentos de análisis más desarrollados que abordan los temas más relevantes en macroeconomía, política fiscal y gestión pública.",
    href: "#",
  },
  {
    icon: <BookOpenCheck className="w-5 h-5 text-brand-600" />,
    title: "Guías de Estudio",
    desc: "Material explicativo y metodológico sobre el funcionamiento de la macroeconomía, política fiscal, sistemas administrativos-financieros y políticas públicas.",
    href: "#",
  },
  {
    icon: <Microscope className="w-5 h-5 text-brand-600" />,
    title: "Investigaciones",
    desc: "Estudios estadísticos, econométricos, jurisprudenciales y académicos sobre problemáticas específicas del ámbito público y económico.",
    href: "#",
  },
];

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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // GSAP scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Stagger animate tags
      gsap.utils.toArray<HTMLElement>(".tag-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 10,
          duration: 0.4,
          delay: i * 0.05,
        });
      });

      // Stagger animate publication cards
      gsap.utils.toArray<HTMLElement>(".pub-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          x: 30,
          duration: 0.5,
          delay: i * 0.08,
        });
      });

      // Stagger animate course items
      gsap.utils.toArray<HTMLElement>(".course-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 15,
          duration: 0.4,
          delay: i * 0.06,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="home-services">
      <div className="home-shell">
        {/* Section Head */}
        <motion.div
          className="home-section-head gsap-reveal"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="home-kicker">Nuestros servicios</span>
          <h2>Información rigurosa para comprender el país</h2>
          <p>
            Conozca nuestras publicaciones y programas de formación antes de
            elegir el contenido que necesita.
          </p>
        </motion.div>

        {/* Service 01: Semana Fiscal */}
        <motion.article
          className="service-feature"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="service-feature__intro">
            <span className="service-feature__number">01</span>
            <h3>
              Semana Fiscal <small>Publicaciones</small>
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-item px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p>
              Análisis técnico de los pilares económicos del país:
              macroeconomía, política fiscal, presupuesto público, sistemas
              administrativos del Estado, gestión pública y políticas públicas.
            </p>
            <a href="#" className="service-link">
              Ver Publicaciones <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="publication-types">
            {publications.map((pub) => (
              <a
                key={pub.title}
                href={pub.href}
                className="publication-type group hover:bg-brand-50 transition-all duration-300 pub-card"
              >
                <span className="group-hover:scale-110 transition-transform mt-0.5">
                  {pub.icon}
                </span>
                <div>
                  <h4 className="group-hover:text-brand-700 transition-colors">
                    {pub.title}
                  </h4>
                  <p>{pub.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.article>

        {/* Service 02: Cursos */}
        <motion.article
          className="service-feature"
          style={{ marginTop: 32 }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="service-feature__intro">
            <span className="service-feature__number">02</span>
            <h3>
              Cursos <small>Formación especializada</small>
            </h3>
            <p>
              Programas orientados a fortalecer capacidades técnicas para el
              sector público y privado.
            </p>
            <a href="#" className="service-link">
              Ver todos los cursos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {courses.map((course) => (
              <a
                key={course}
                href="#"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-white hover:bg-brand-50 hover:border-brand-100 transition-all duration-300 course-item group"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span className="text-[13px] font-semibold text-slate-700 group-hover:text-brand-700 transition-colors leading-snug">
                  {course}
                </span>
              </a>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}