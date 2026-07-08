import type { Metadata } from "next";
import CursosPage from "./CursosPage";

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
  return <CursosPage />;
}