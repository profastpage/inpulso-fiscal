import type { Metadata } from "next";
import ContactoPage from "./ContactoPage";

export const metadata: Metadata = {
  title: "Contacto | Instituto Pulso Fiscal",
  description:
    "Ponte en contacto con el Instituto Pulso Fiscal. Envíanos tus consultas, propuestas o solicitudes de información sobre nuestros servicios.",
  openGraph: {
    title: "Contacto | Instituto Pulso Fiscal",
    description:
      "Envíanos tus consultas, propuestas o solicitudes de información sobre análisis económico y servicios del IPF.",
    url: "https://inpulso-fiscal.vercel.app/contacto",
    siteName: "Instituto Pulso Fiscal",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Instituto Pulso Fiscal",
    description:
      "Envíanos tus consultas, propuestas o solicitudes de información sobre análisis económico y servicios del IPF.",
  },
};

export default function Contacto() {
  return <ContactoPage />;
}