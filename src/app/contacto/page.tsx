import type { Metadata } from "next";
import ContactoPage from "./ContactoPage";
import { JsonLd, breadcrumbSchema } from "@/components/ipf/JsonLd";

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
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ])}
      />
      <ContactoPage />
    </>
  );
}