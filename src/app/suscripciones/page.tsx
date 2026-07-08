import type { Metadata } from "next";
import SuscripcionesPage from "./SuscripcionesPage";

export const metadata: Metadata = {
  title: "Planes de Suscripción | Instituto Pulso Fiscal",
  description:
    "Portal líder en análisis económico, política fiscal y gestión pública en Perú. Think Tank especializado en macroeconomía y presupuesto público.",
  openGraph: {
    title: "Planes de Suscripción | Instituto Pulso Fiscal",
    description:
      "Accede a planes Básico y Premium con publicaciones exclusivas, descargas y descuentos en cursos.",
    type: "website",
    locale: "es_PE",
    siteName: "Instituto Pulso Fiscal",
  },
};

export default function Suscripciones() {
  return <SuscripcionesPage />;
}