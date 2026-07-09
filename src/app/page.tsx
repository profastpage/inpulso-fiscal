import Header from "@/components/ipf/Header";
import HeroSection from "@/components/ipf/HeroSection";
import ServicesSection from "@/components/ipf/ServicesSection";
import CTASection from "@/components/ipf/CTASection";
import Footer from "@/components/ipf/Footer";
import WhatsAppButton from "@/components/ipf/WhatsAppButton";
import { JsonLd, faqSchema, serviceSchema } from "@/components/ipf/JsonLd";

const homeFaqs = [
  {
    question: "¿Qué es el Instituto Pulso Fiscal?",
    answer:
      "El Instituto Pulso Fiscal (IPF) es un think tank peruano independiente especializado en análisis económico, política fiscal, presupuesto público y gestión pública. Con más de 15 años de experiencia, produce reportes técnicos, análisis macroeconómicos y programas de formación especializada para profesionales del sector público y privado en Perú.",
  },
  {
    question: "¿Qué servicios ofrece el Instituto Pulso Fiscal?",
    answer:
      "IPF ofrece tres servicios principales: 1) Semana Fiscal — publicaciones técnicas y análisis macroeconómico periódico; 2) Cursos — programas de formación especializada en economía, política fiscal y gestión pública; 3) OSESA — análisis y seguimiento del Órgano de Supervisión de Servicios de Salud.",
  },
  {
    question: "¿Quién utiliza los servicios del Instituto Pulso Fiscal?",
    answer:
      "Profesionales del sector público (ministros, viceministros, directores generales), consultores legislativos del Congreso de la República, equipos técnicos de gobiernos regionales y locales, investigadores académicos, y profesionales del sector privado que necesitan análisis económico y fiscal especializado sobre Perú.",
  },
  {
    question: "¿Cómo acceder a las publicaciones del Instituto Pulso Fiscal?",
    answer:
      "Puedes acceder a las publicaciones a través de los planes de suscripción del Instituto Pulso Fiscal. Los planes incluyen acceso a reportes técnicos, la Semana Fiscal, análisis del OSESA y cursos especializados. Visita la sección de suscripciones en inpulsofiscal.com/suscripciones para conocer las opciones disponibles.",
  },
  {
    question: "¿Qué es la Semana Fiscal del Instituto Pulso Fiscal?",
    answer:
      "La Semana Fiscal es una publicación periódica del Instituto Pulso Fiscal que contiene análisis técnico sobre la coyuntura macroeconómica, política fiscal y presupuestaria de Perú. Incluye proyecciones, evaluación de medidas gubernamentales y recomendaciones de política pública basadas en evidencia.",
  },
];

const homeServices = [
  {
    name: "Semana Fiscal — Análisis Macroeconómico",
    description:
      "Publicaciones técnicas periódicas con análisis de coyuntura macroeconómica, política fiscal y presupuestaria en Perú. Incluye proyecciones y recomendaciones de política pública.",
    url: "/reportes",
    category: "Publicaciones y análisis técnico",
  },
  {
    name: "Cursos de Formación Especializada",
    description:
      "Programas de formación en macroeconomía, política fiscal, presupuesto público, sistemas administrativos del Estado y gestión pública orientados a profesionales del sector público y privado.",
    url: "/cursos",
    category: "Formación especializada",
  },
  {
    name: "Análisis OSESA — Supervisión Sanitaria",
    description:
      "Seguimiento y análisis del Órgano de Supervisión de Servicios de Salud (OSESA). Informes sobre indicadores de desempeño, cumplimiento normativo y evaluación de la supervisión sanitaria en Perú.",
    url: "/osesa",
    category: "Supervisión sanitaria",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={faqSchema(homeFaqs)} />
      {homeServices.map((s) => (
        <JsonLd key={s.name} data={serviceSchema(s)} />
      ))}
      <Header transparent variant="light" />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}