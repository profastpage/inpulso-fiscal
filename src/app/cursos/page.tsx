import type { Metadata } from "next";
import CursosPage from "./CursosPage";

export const metadata: Metadata = {
  title: "Cursos | Instituto Pulso Fiscal",
  description:
    "Formación especializada en macroeconomía, política fiscal, presupuestos públicos y sistemas administrativos del sector público en Perú.",
  openGraph: {
    title: "Cursos | Instituto Pulso Fiscal",
    description:
      "Programas de formación especializada en macroeconomía, política fiscal y gestión pública en Perú.",
    url: "https://inpulso-fiscal.vercel.app/cursos",
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursos | Instituto Pulso Fiscal",
    description:
      "Programas de formación especializada en macroeconomía, política fiscal y gestión pública en Perú.",
  },
};

export default function Cursos() {
  return <CursosPage />;
}