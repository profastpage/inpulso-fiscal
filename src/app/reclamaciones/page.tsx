import type { Metadata } from "next";
import ReclamacionesPage from "./ReclamacionesPage";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description:
    "Libro de Reclamaciones del Instituto Pulso Fiscal. Formulario de reclamos y quejas conforme al Código de Protección y Defensa del Consumidor.",
  openGraph: {
    title: "Libro de Reclamaciones | Instituto Pulso Fiscal",
    description: "Formulario de reclamos y quejas conforme al Código de Protección y Defensa del Consumidor.",
    url: "/reclamaciones",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Libro de Reclamaciones — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Libro de Reclamaciones | Instituto Pulso Fiscal",
    description: "Formulario de reclamos conforme al Código de Protección del Consumidor.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/reclamaciones" },
};

export default function Reclamaciones() {
  return <ReclamacionesPage />;
}