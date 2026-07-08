import type { Metadata } from "next";
import ReportesPage from "./ReportesPage";

export const metadata: Metadata = {
  title: "Reportes Técnicos | Instituto Pulso Fiscal",
  description:
    "Accede a publicaciones, análisis técnico, reportes, informes, guías de estudio e investigaciones del Instituto Pulso Fiscal sobre macroeconomía y gestión pública en Perú.",
  openGraph: {
    title: "Reportes Técnicos | Instituto Pulso Fiscal",
    description:
      "Publicaciones, análisis técnico, reportes e investigaciones sobre macroeconomía y gestión pública en Perú.",
    url: "https://inpulso-fiscal.vercel.app/reportes",
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reportes Técnicos | Instituto Pulso Fiscal",
    description:
      "Publicaciones, análisis técnico, reportes e investigaciones sobre macroeconomía y gestión pública en Perú.",
  },
};

export default function Reportes() {
  return <ReportesPage />;
}