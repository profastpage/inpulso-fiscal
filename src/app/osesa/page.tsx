import type { Metadata } from "next";
import OsesaPage from "./OsesaPage";
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from "@/components/ipf/JsonLd";

export const metadata: Metadata = {
  title: "OSESA — Supervisión Sanitaria",
  description:
    "Órgano de Supervisión de Servicios de Salud. Análisis, seguimiento y evaluación de la supervisión sanitaria en Perú por el Instituto Pulso Fiscal.",
  openGraph: {
    title: "OSESA | Instituto Pulso Fiscal",
    description:
      "Análisis y seguimiento del Órgano de Supervisión de Servicios de Salud. Supervisión sanitaria en Perú.",
    url: "/osesa",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OSESA — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSESA | Instituto Pulso Fiscal",
    description:
      "Análisis y seguimiento del Órgano de Supervisión de Servicios de Salud en Perú.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/osesa" },
};

const osesaFaqs = [
  {
    question: "¿Qué es el OSESA?",
    answer:
      "El Órgano de Supervisión de Servicios de Salud (OSESA) es la entidad peruana encargada de supervisar y fiscalizar el cumplimiento de las normas sanitarias por parte de los proveedores de servicios de salud. Su labor garantiza que la atención de salud cumpla con los estándares de calidad y seguridad que la población merece.",
  },
  {
    question: "¿Qué análisis realiza el Instituto Pulso Fiscal sobre el OSESA?",
    answer:
      "El IPF realiza seguimiento continuo de las acciones de supervisión del OSESA, analiza indicadores de desempeño, identifica brechas en la supervisión sanitaria, evalúa el marco normativo vigente y elabora recomendaciones técnicas para fortalecer la supervisión sanitaria nacional.",
  },
];

export default function Osesa() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Nuestros Servicios", url: "/#servicios" },
          { name: "OSESA", url: "/osesa" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "Análisis OSESA — Supervisión Sanitaria",
          description:
            "Seguimiento y análisis del Órgano de Supervisión de Servicios de Salud (OSESA). Informes sobre indicadores de desempeño, cumplimiento normativo y evaluación de la supervisión sanitaria en Perú.",
          url: "/osesa",
          category: "Supervisión sanitaria",
        })}
      />
      <JsonLd data={faqSchema(osesaFaqs)} />
      <OsesaPage />
    </>
  );
}