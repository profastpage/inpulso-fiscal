import type { Metadata } from "next";
import SuscripcionesPage from "./SuscripcionesPage";

export const metadata: Metadata = {
  title: "Planes de Suscripción",
  description:
    "Accede a planes Básico y Premium con publicaciones exclusivas, descargas ilimitadas y 60% de descuento en cursos del Instituto Pulso Fiscal.",
  openGraph: {
    title: "Planes de Suscripción | Instituto Pulso Fiscal",
    description:
      "Planes Básico y Premium con publicaciones exclusivas, descargas y 60% de descuento en cursos. Precios de lanzamiento.",
    url: "/suscripciones",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Planes de Suscripción — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planes de Suscripción | Instituto Pulso Fiscal",
    description:
      "Planes Básico y Premium: publicaciones exclusivas, descargas y 60% de descuento en cursos.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/suscripciones" },
};

export default function Suscripciones() {
  return <SuscripcionesPage />;
}