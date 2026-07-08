import type { Metadata } from "next";
import ReportesPage from "./ReportesPage";

export const metadata: Metadata = {
  title: "Reportes Técnicos",
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
  return <ReportesPage />;
}