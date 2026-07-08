import type { Metadata } from "next";
import ReportesPage from "./ReportesPage";
import { JsonLd, breadcrumbSchema, serviceSchema, articleSchema } from "@/components/ipf/JsonLd";

export const metadata: Metadata = {
  title: "Reportes Técnicos — Semana Fiscal",
  description:
    "Accede a publicaciones, análisis técnico, reportes, informes, guías de estudio e investigaciones del Instituto Pulso Fiscal sobre macroeconomía y gestión pública en Perú.",
  openGraph: {
    title: "Reportes Técnicos | Instituto Pulso Fiscal",
    description:
      "Publicaciones, análisis técnico, reportes e investigaciones sobre macroeconomía y gestión pública en Perú.",
    url: "/reportes",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Reportes Técnicos — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reportes Técnicos | Instituto Pulso Fiscal",
    description:
      "Publicaciones, análisis técnico, reportes e investigaciones sobre macroeconomía y gestión pública en Perú.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/reportes" },
};

export default function Reportes() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Nuestros Servicios", url: "/#servicios" },
          { name: "Semana Fiscal", url: "/reportes" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "Semana Fiscal — Publicaciones y Análisis Técnico",
          description:
            "Publicaciones técnicas periódicas del Instituto Pulso Fiscal con análisis macroeconómico, evaluación de política fiscal, proyecciones presupuestarias y recomendaciones de política pública para Perú.",
          url: "/reportes",
          category: "Publicaciones y análisis técnico",
        })}
      />
      <JsonLd
        data={articleSchema({
          title: "Reportes Técnicos — Instituto Pulso Fiscal",
          description:
            "Colección completa de reportes técnicos, análisis macroeconómico, informes de política fiscal y publicaciones especializadas del Instituto Pulso Fiscal sobre la economía peruana.",
          url: "/reportes",
        })}
      />
      <ReportesPage />
    </>
  );
}