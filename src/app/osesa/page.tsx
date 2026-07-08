import type { Metadata } from "next";
import OsesaPage from "./OsesaPage";

export const metadata: Metadata = {
  title: "OSESA",
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

export default function Osesa() {
  return <OsesaPage />;
}