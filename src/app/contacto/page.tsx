import type { Metadata } from "next";
import ContactoPage from "./ContactoPage";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con el Instituto Pulso Fiscal. Envíanos tus consultas, propuestas o solicitudes de información sobre nuestros servicios.",
  openGraph: {
    title: "Contacto | Instituto Pulso Fiscal",
    description:
      "Envíanos tus consultas, propuestas o solicitudes de información sobre análisis económico y servicios del IPF.",
    url: "/contacto",
    type: "website",
    locale: "es_PE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contacto — Instituto Pulso Fiscal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Instituto Pulso Fiscal",
    description:
      "Envíanos tus consultas, propuestas o solicitudes de información sobre análisis económico y servicios del IPF.",
    images: ["/og-image.png"],
    creator: "@inpulsofiscal",
  },
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return <ContactoPage />;
}