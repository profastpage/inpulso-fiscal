import type { Metadata } from "next";
import CursosPage from "./CursosPage";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/ipf/JsonLd";

export const metadata: Metadata = {
  title: "Cursos y Formación",
  description:
    "Formación especializada en macroeconomía, política fiscal, presupuestos públicos y sistemas administrativos del sector público en Perú.",
  openGraph: {
    title: "Cursos y Formación | Instituto Pulso Fiscal",
    description:
      "Programas de formación especializada en macroeconomía, política fiscal y gestión pública en Perú.",
    url: "/cursos",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Cursos — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos y Formación | Instituto Pulso Fiscal",
    description:
      "Programas de formación especializada en macroeconomía, política fiscal y gestión pública en Perú.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/cursos" },
};

export default function Cursos() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Nuestros Servicios", url: "/#servicios" },
          { name: "Cursos", url: "/cursos" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "Cursos de Formación Especializada",
          description:
            "Programas de formación del Instituto Pulso Fiscal en macroeconomía, política fiscal, presupuesto público, sistemas administrativos del Estado y gestión pública para profesionales de Perú.",
          url: "/cursos",
          category: "Formación especializada",
        })}
      />
      <CursosPage />
    </>
  );
}